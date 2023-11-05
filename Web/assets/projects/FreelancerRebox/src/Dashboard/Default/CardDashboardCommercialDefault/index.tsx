import { useCallback, useEffect, useState } from 'react';

import {
  LoadingSuspense,
  Paragraph,
  SubtitleSecondary,
} from '@components/index';
import labels from '@config/labels';
import values from '@config/values';
import { apiRebox } from '@services/index';

import {
  IAdresses,
  IContract,
  IPropsDashboards,
  IStatusContract,
  selectDashboardDateTypes,
} from '../../TypesOfDashboards/typings';
import HeaderMobileOrDesktopDashboard from '../HeaderMobileOrDesktopDashboard';

import {
  Card,
  Container,
  Info,
  InformationHorizontally,
  InformationVertically,
} from './styles';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  period_start: string;
  period_end: string;
  IpropsDashboards: IPropsDashboards;
  dataOverview: {
    tpa: number;
    tpat: number;
    tpag: number;
    loadingOverview: boolean;
  };
}

interface IUser {
  status: keyof typeof values.rebox.user.status;
}

// Type para objetos com chave string e valor number
type typeObject = { [key: string]: number };

const CardDashboardCommercialDefault: React.FC<IProps> = ({
  period_start,
  period_end,
  dataOverview,
  IpropsDashboards: {
    dashboardDateTypesMobile,
    dashboardDateTypesDesktop,
    setLoadingDashboard,
    setFirstLoadingDashboard,
    firstLoadingDashboard,
  },
  ...rest
}) => {
  // Estado para formatação de dados
  const [
    dataDashboardCommercialDayFormatted,
    setDataDashboardCommercialDayFormatted,
  ] = useState({
    pv: 0,
    tkm: 0,
    lead: 0,
    rAuto: [
      {
        planName: '',
        total: 0,
        percent: 0,
      },
    ],
    scheduled: 0,
    madeEffective: 0,
    canceled: 0,
    channels: [
      {
        channelName: '',
        percent: 0,
      },
    ],
    city: [
      {
        cityName: '',
        stateName: '',
        total: 0,
        percent: 0,
      },
    ],
  });

  // Estado para contracts e users
  const [dataDashboardCommercial, setDataDashboardCommercial] = useState({
    contract: {
      header: {
        total: 0,
      },
      data: [],
    },
    users: {
      header: {
        total: 0,
      },
      data: [],
    },
  });

  // Funções de formatação de dados:
  const tkmFinal = useCallback(() => {
    const initialValue = 0;
    if (dataDashboardCommercial.contract.header.total === 0) {
      const tkm = 0;
      return tkm;
    }
    const salesAmount = dataDashboardCommercial.contract.data.reduce(
      (accumulator: number, contracts: IContract) =>
        accumulator + contracts.amount,
      initialValue,
    );
    const tkm = salesAmount / dataDashboardCommercial.contract.header.total;
    const tkmToFixed = Number(tkm.toFixed(2));
    return tkmToFixed;
  }, [dataDashboardCommercial]);

  // Percorrer os objetos dentro do data, em cada objeto de contrato entrar no objeto de product, pegar o name do produto, comparar quantas vezes ele aparecer e ir somando, pra ver a quantidade de cada produto vendido e pegar a porcentagem de cada um. aparecer no maximo 4 produtos
  const calculatePlanPercentage = useCallback(() => {
    const initialValue = 0;
    const incrementValue = 1;
    const maxProducts = 4;

    // Objeto contendo como chave o nome do produto e valor é a quantidade dele
    const products = dataDashboardCommercial.contract.data.reduce(function (
      accumulator: typeObject,
      contracts: IContract,
    ) {
      // Aqui a gente acumula os produtos e a quantidade de vezes que ele aparece. Se não achar o produto, ele cria um novo produto e inicia a contagem dele com 1
      const product = contracts.product.name;
      accumulator[product] =
        (accumulator[product] || initialValue) + incrementValue;
      return accumulator;
    },
    {});

    // Aqui o  Object.values me retorna um array com os atributos(nesse caso somente a quantidade) do objeto passado para ele. Ele me retorna a quantidade de produtos vendido no total, pois ele soma o atributo quantidade de cada um dos objetos usando o reduce
    // O acc serve pra acumular as somas ja feitas e o amount é a quantidade de cada produto vendido que vai sempre acumular na no acc
    const totalProducts = Object.values(products).reduce(function (
      acc,
      amount,
    ) {
      return acc + amount;
    },
    initialValue);

    // E finalmente pegamos os produtos e a quantidade de vezes que ele aparece e transformamos em porcentagem
    // Aqui nos tranformamos os objetos em arrays, para poder usar o sort e o slice. O quera chave[0] e valor[1] vira um item no array
    const topSellingProducts = Object.entries(products)
      // Essa função de comparação compara os valores das quantidades (a[1] e b[1]) dos subarrays para determinar a ordem de classificação. A ordem de classificação será em ordem decrescente com base nas quantidades. A função de comparação retorna um valor negativo se b[1] for maior que a[1], um valor positivo se a[1] for maior que b[1], ou zero se os valores forem iguais me retornando um array com os produtos mais vendidos
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, maxProducts)
      .map(mostContractedProducts => {
        const productName = mostContractedProducts[0];
        const amountProduct = mostContractedProducts[1];
        const percentage = (amountProduct / totalProducts) * 100;
        const percentageToFixed = Number(percentage.toFixed(2));
        return {
          productName,
          amountProduct,
          percentageToFixed,
        };
      });
    return topSellingProducts;
  }, [dataDashboardCommercial]);

  const plansAwaitingCanceledAndEffective = useCallback(() => {
    const initialValue: IStatusContract = {
      canceled: 0,
      released: 0,
      pending: 0,
    };
    const status = dataDashboardCommercial.contract.data.reduce(
      (acc: IStatusContract, contracts: IContract) => {
        const statu = contracts.status.toUpperCase();
        if (statu === 'CANCELED') {
          acc.canceled += 1;
        } else if (statu === 'RELEASED') {
          acc.released += 1;
        } else if (statu === 'PENDING') {
          acc.pending += 1;
        }
        return acc;
      },
      initialValue,
    );
    return status;
  }, [dataDashboardCommercial]);

  const leadCustomerStatus = useCallback(() => {
    const initialValue = 0;
    const status = dataDashboardCommercial.users.data.reduce(
      (acc: number, users: IUser) => {
        const statusClient = users.status.toUpperCase();
        statusClient === 'LEAD' && (acc += 1);
        return acc;
      },
      initialValue,
    );
    return status;
  }, [dataDashboardCommercial]);

  const formatterChannels = useCallback((channel: IContract) => {
    // const [
    //   LANDING_PAGE,
    //   ATTENDANCE_WHATSAPP,
    //   MARKETING,
    //   INDICATION,
    //   MKT_PLACE,
    //   DISCOUNT_CUPOM,
    //   THIRTY_DAYS_CUPOM,
    //   OPERATIONAL,
    //   APP_CUSTOMER,
    //   BLOCKER,
    // ] = labels.rebox.filter.contract.environment;

    // switch (channel.user.environment) {
    //   case LANDING_PAGE.value:
    //     return LANDING_PAGE.label;
    //   case ATTENDANCE_WHATSAPP.value:
    //     return ATTENDANCE_WHATSAPP.label;
    //   case MARKETING.value:
    //     return MARKETING.label;
    //   case INDICATION.label:
    //     return INDICATION.value;
    //   case MKT_PLACE.value:
    //     return MKT_PLACE.label;
    //   case DISCOUNT_CUPOM.value:
    //     return DISCOUNT_CUPOM.label;
    //   case THIRTY_DAYS_CUPOM.value:
    //     return THIRTY_DAYS_CUPOM.label;
    //   case OPERATIONAL.value:
    //     return OPERATIONAL.label;
    //   case APP_CUSTOMER.value:
    //     return APP_CUSTOMER.label;
    //   case BLOCKER.value:
    //     return BLOCKER.label;
    //   default:
    //     return LANDING_PAGE.label;
    // }

    for (const element of labels.rebox.filter.contract.environment) {
      if (channel.user.environment === element.value) {
        return element.label;
      }
    }
    return labels.rebox.filter.contract.environment[0].label;
  }, []);
  const calculateChannelsPercentage = useCallback(() => {
    const initialValue = 0;
    const incrementValue = 1;
    const maxChannels = 4;

    const channels = dataDashboardCommercial.contract.data.reduce(function (
      accumulator: typeObject,
      contracts: IContract,
    ) {
      const channelFormatter = formatterChannels(contracts);

      accumulator[channelFormatter] =
        (accumulator[channelFormatter] || initialValue) + incrementValue;
      return accumulator;
    },
    {});

    // Aqui a gente pega todos os valores do objeto e soma eles, para saber o total de canais
    const totalChannels = Object.values(channels).reduce(function (
      acc,
      amount,
    ) {
      return acc + amount;
    },
    initialValue);

    // Tranformamos o objeto em array para poder usar o sort e o slice. O que era chave[0] e valor[1] vira um item no array
    const topSellingChannels = Object.entries(channels)
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, maxChannels)
      .map(channel => {
        const channelName = channel[0];
        const amountChannel = channel[1];
        const percentage = (amountChannel / totalChannels) * 100;
        const percentageToFixed = Number(percentage.toFixed(2));
        return {
          channelName,
          percentageToFixed,
        };
      });
    return topSellingChannels;
  }, [dataDashboardCommercial]);

  const cityThatHiredTheMostPlans = useCallback(() => {
    const initialValue = 0;
    const incrementValue = 1;
    const maxCity = 5;

    // Fazemos um objeto com as cidades, a quantidade de vezes que ela aparece, porcentagem e estado
    const citys = dataDashboardCommercial.contract.data.reduce(function (
      accumulator: { [key: string]: IAdresses },
      addressContract: IContract,
    ) {
      // Dentro de cada user possui um array de endereço e nele possui como chave cidade e o estado. E cada estado e cidade encontrado vira uma chave de um objeto
      addressContract.user.adresses.forEach((address: IAdresses) => {
        const { city, state } = address;
        const key = `${city}-${state}`;
        // Se ja existe esse objeto com essa chave (cidade-estado) nos incrementamos a quantidade de vezes que ela aparece
        if (accumulator[key]) {
          accumulator[key].amount += 1;
        } else {
          accumulator[key] = {
            city,
            state,
            amount: incrementValue,
            percentage: initialValue,
          };
        }
      });
      return accumulator;
    },
    {});

    // Pegamos os valores do objeto e transformamos em um array, para poder setar a porcentagem de cada cidade
    const citysArray = Object.values(citys);
    const totalContractsAndAdresses = dataDashboardCommercial.contract.data.reduce(
      function (acc: number, cliente: IContract) {
        acc += cliente.user.adresses.length;
        return acc;
      },
      0,
    );

    // Com o total de contratos e a quantidade de vezes que cada cidade aparece, calculamos a porcentagem de cada cidade usando o forEach e setamos no objeto
    citysArray.forEach((city: IAdresses) => {
      city.percentage = Number(
        ((city.amount / totalContractsAndAdresses) * 100).toFixed(2),
      );
    });

    // Ordenamos o array de cidades pela quantidade de vezes que ela aparece
    citysArray.sort(function (a, b) {
      return b.amount - a.amount;
    });

    return citysArray.slice(0, maxCity);
  }, [dataDashboardCommercial]);

  const dataFormatted = useCallback(() => {
    setDataDashboardCommercialDayFormatted({
      ...dataDashboardCommercialDayFormatted,
      pv: dataDashboardCommercial.contract.header.total,
      tkm: tkmFinal(),
      lead: leadCustomerStatus(),
      rAuto: calculatePlanPercentage().map(product => {
        return {
          planName: product.productName,
          total: product.amountProduct,
          percent: product.percentageToFixed,
        };
      }),
      canceled: plansAwaitingCanceledAndEffective().canceled,
      madeEffective: plansAwaitingCanceledAndEffective().released,
      scheduled: plansAwaitingCanceledAndEffective().pending,
      channels: calculateChannelsPercentage().map(channel => {
        return {
          channelName: channel.channelName,
          percent: channel.percentageToFixed,
        };
      }),
      city: cityThatHiredTheMostPlans().map(city => {
        return {
          cityName: city.city,
          stateName: city.state,
          percent: city.percentage,
          total: city.amount,
        };
      }),
    });
  }, [dataDashboardCommercial]);

  const getDataDashboardCommercialDay = useCallback(async () => {
    try {
      setLoadingDashboard(true);

      const promiseAll = await Promise.all([
        {
          contract: await apiRebox.get(`/contracts`, {
            params: {
              period_start,
              period_end,
              per_page: 99999,
            },
          }),
        },
        {
          users: await apiRebox.get(`/users`, {
            params: {
              period_start,
              period_end,
              per_page: 99999,
            },
          }),
        },
      ]);

      const [responseContracts, responseUsers] = promiseAll;

      setDataDashboardCommercial({
        contract: {
          header: responseContracts.contract.data.header,
          data: responseContracts.contract.data.data,
        },
        users: {
          header: responseUsers.users.data.header,
          data: responseUsers.users.data.data,
        },
      });
    } catch (error) {
      console.error(
        `Error ao tentar buscar dados para o dashboard comercial: Na data e hora ${period_start} - ${period_end}: `,
        error,
      );
    } finally {
      setLoadingDashboard(false);
      setFirstLoadingDashboard(false);
    }
  }, [dashboardDateTypesMobile]);

  useEffect(() => {
    getDataDashboardCommercialDay();
    const interval = setInterval(getDataDashboardCommercialDay, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [dashboardDateTypesMobile]);

  useEffect(() => {
    setFirstLoadingDashboard(true);
  }, []);

  useEffect(() => {
    dataFormatted();
  }, [dataDashboardCommercial]);

  return (
    <>
      {firstLoadingDashboard ? (
        <LoadingSuspense />
      ) : (
        <Container {...rest}>
          {dashboardDateTypesDesktop ? (
            <HeaderMobileOrDesktopDashboard
              dashboardDateTypes={
                dashboardDateTypesDesktop as selectDashboardDateTypes
              }
              period_end={period_end}
              period_start={period_start}
            />
          ) : (
            <HeaderMobileOrDesktopDashboard
              dashboardDateTypes={
                dashboardDateTypesMobile as selectDashboardDateTypes
              }
              period_end={period_end}
              period_start={period_start}
            />
          )}
          <Card>
            <InformationHorizontally>
              <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                P.V:
                <Info>
                  {dataDashboardCommercialDayFormatted.pv === 0
                    ? 'Não teve vendas'
                    : dataDashboardCommercialDayFormatted.pv}
                </Info>
              </Paragraph>
              <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                TKM:
                <Info>
                  {dataDashboardCommercialDayFormatted.pv === 0
                    ? 'Não teve vendas'
                    : `R$ ${dataDashboardCommercialDayFormatted.tkm}`}
                </Info>
              </Paragraph>
              <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                Lead:{' '}
                <Info>
                  {' '}
                  {dataDashboardCommercialDayFormatted.pv === 0
                    ? 'Não teve vendas'
                    : `${dataDashboardCommercialDayFormatted.lead}`}
                </Info>
              </Paragraph>
            </InformationHorizontally>
            <InformationVertically>
              <SubtitleSecondary textAlign="start" className="plans-contracts">
                Planos mais contratados
              </SubtitleSecondary>

              {dataDashboardCommercialDayFormatted.pv === 0 ? (
                <>
                  <Paragraph
                    nameColor="black"
                    fontSize={16}
                    fontWeight={500}
                    textAlign="start"
                  >
                    <Info>Não teve vendas</Info>
                  </Paragraph>
                </>
              ) : (
                <>
                  {dataDashboardCommercialDayFormatted.rAuto.map(
                    (plan, key) => (
                      <Paragraph
                        nameColor="black"
                        fontSize={16}
                        fontWeight={500}
                        textAlign="start"
                        key={`${plan.planName}-${key}`}
                      >
                        {plan.planName}: <Info>{plan.total}</Info>
                        {'|'}
                        <Info>{plan.percent}%</Info>
                      </Paragraph>
                    ),
                  )}
                </>
              )}
            </InformationVertically>
            <InformationHorizontally>
              <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                Ag:{' '}
                <Info>
                  {dataDashboardCommercialDayFormatted.pv === 0
                    ? 'Não teve vendas'
                    : dataDashboardCommercialDayFormatted.scheduled}
                </Info>
              </Paragraph>
              <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                Efet:{' '}
                <Info>
                  {' '}
                  {dataDashboardCommercialDayFormatted.pv === 0
                    ? 'Não teve vendas'
                    : dataDashboardCommercialDayFormatted.madeEffective}
                </Info>
              </Paragraph>
              <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                Can:{' '}
                <Info>
                  {' '}
                  {dataDashboardCommercialDayFormatted.pv === 0
                    ? 'Não teve vendas'
                    : dataDashboardCommercialDayFormatted.canceled}
                </Info>
              </Paragraph>
            </InformationHorizontally>
            <InformationVertically>
              <SubtitleSecondary textAlign="start">Canais</SubtitleSecondary>

              <InformationVertically>
                {dataDashboardCommercialDayFormatted.pv === 0 ? (
                  <>
                    <Paragraph
                      nameColor="black"
                      fontSize={16}
                      fontWeight={500}
                      textAlign="start"
                    >
                      <Info>Não teve vendas</Info>
                    </Paragraph>
                  </>
                ) : (
                  <>
                    {dataDashboardCommercialDayFormatted.channels.map(
                      (channel, key) => (
                        <Paragraph
                          nameColor="black"
                          fontSize={16}
                          fontWeight={500}
                          textAlign="start"
                          key={`${channel.channelName}-${key}`}
                        >
                          {channel.channelName}: <Info>{channel.percent}%</Info>
                        </Paragraph>
                      ),
                    )}
                  </>
                )}
              </InformationVertically>
            </InformationVertically>
            <InformationVertically>
              <SubtitleSecondary textAlign="start">Cidades</SubtitleSecondary>
              <InformationVertically>
                {dataDashboardCommercialDayFormatted.pv === 0 ? (
                  <>
                    <Paragraph
                      nameColor="black"
                      fontSize={16}
                      fontWeight={500}
                      textAlign="start"
                    >
                      <Info>Não teve vendas</Info>
                    </Paragraph>
                  </>
                ) : (
                  <>
                    {dataDashboardCommercialDayFormatted.city.map(
                      (city, key) => (
                        <Paragraph
                          nameColor="black"
                          fontSize={16}
                          fontWeight={500}
                          textAlign="start"
                          key={`${city.cityName}-${key}`}
                        >
                          {`${city.cityName}(${city.stateName})`}:
                          <Info>{city.total}</Info> {'|'}
                          <Info>{city.percent}%</Info>
                        </Paragraph>
                      ),
                    )}
                  </>
                )}
              </InformationVertically>
            </InformationVertically>
            <InformationVertically>
              <SubtitleSecondary>Resumo Geral</SubtitleSecondary>
              <InformationHorizontally>
                {dataOverview.loadingOverview ? (
                  <Paragraph
                    nameColor="black"
                    fontSize={16}
                    fontWeight={500}
                    textAlign="center"
                  >
                    Carregando resumo geral...
                  </Paragraph>
                ) : (
                  <>
                    <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                      TPA:
                      <Info>{dataOverview.tpa}</Info>
                    </Paragraph>
                    <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                      TPAT:
                      <Info> {dataOverview.tpat}</Info>
                    </Paragraph>
                    <Paragraph nameColor="black" fontSize={16} fontWeight={500}>
                      TPAG:
                      <Info>{dataOverview.tpag}</Info>
                    </Paragraph>
                  </>
                )}
              </InformationHorizontally>
            </InformationVertically>
          </Card>
        </Container>
      )}
    </>
  );
};
export default CardDashboardCommercialDefault;
