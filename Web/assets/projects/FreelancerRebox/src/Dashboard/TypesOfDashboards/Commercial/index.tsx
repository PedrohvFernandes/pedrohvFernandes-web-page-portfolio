import { useCallback, useEffect, useState } from 'react';

import { apiRebox } from '@services/index';

import CardDashboardCommercialDefault from '../../Default/CardDashboardCommercialDefault';
import DashboardColumns from '../../Default/DashboardColumnsDefault';
import useGetDateFormatted from '../../hooks/get-date-formatted';
import useWindowDimensions from '../../hooks/get-window-dimensions';
import {
  IContract,
  IPropsDashboards,
  IStatusContract,
  selectDashboardDateTypes,
} from '../typings';

import { Container } from './styles';

interface IStatusCurrentPaymentsStatusAndStatus {
  inDay: number;
  overdue: number;
  statusContract: IStatusContract;
}
const DashboardCommercial: React.FC<IPropsDashboards> = ({
  dashboardDateTypesMobile,
  setLoadingDashboard,
  firstLoadingDashboard,
  setFirstLoadingDashboard,
}) => {
  // Para dados do dashboard
  const [dataDashboardOverview, setDataDashboardOverview] = useState({
    // header: {
    //   total: 0,
    // },
    data: [],
  });
  // Para formatação de dados
  const [dataOverviewFormatted, setDataOverviewFormatted] = useState({
    overview: {
      tpa: 0,
      tpat: 0,
      tpag: 0,
    },
  });
  const [loadingOverview, setLoadingOverview] = useState<boolean>(false);

  const { width } = useWindowDimensions();

  const {
    formattedToday,
    formattedYesterday,
    formattedCurrentMonth,
    formattedLastMonth,
    formattedCurrentYear,
  } = useGetDateFormatted();
  const days: Array<selectDashboardDateTypes> = [
    'hoje',
    'ontem',
    'mês atual',
    'mês passado',
    'ano',
  ];

  const whichDate = (dayWitch: selectDashboardDateTypes) => {
    return days.find(day => dayWitch === day);
  };

  const date = [
    {
      period_start: formattedToday().formattedTodayStart,
      period_end: formattedToday().formattedTodayEnd,
      nameDay: whichDate('hoje'),
    },
    {
      period_start: formattedYesterday().formattedYesterdayStart,
      period_end: formattedYesterday().formattedYesterdayEnd,
      nameDay: whichDate('ontem'),
    },
    {
      period_start: formattedCurrentMonth().formattedThisMonthFirstDay,
      period_end: formattedCurrentMonth().formattedThisMonthLastDay,
      nameDay: whichDate('mês atual'),
    },
    {
      period_start: formattedLastMonth().formattedLastMonthFirstDay,
      period_end: formattedLastMonth().formattedLastMonthLastDay,
      nameDay: whichDate('mês passado'),
    },
    {
      period_start: formattedCurrentYear().formattedThisYearFirstDay,
      period_end: formattedCurrentYear().formattedThisYearLastDay,
      nameDay: whichDate('ano'),
    },
  ];

  // switch (dashboardDateTypesMobile) {
  //   case whichDate('hoje'):
  //     period_start_mobile = formattedToday().formattedTodayStart;
  //     period_end_mobile = formattedToday().formattedTodayEnd;
  //     break;
  //   case whichDate('ontem'):
  //     period_start_mobile = formattedYesterday().formattedYesterdayStart;
  //     period_end_mobile = formattedYesterday().formattedYesterdayEnd;
  //     break;
  //   case whichDate('mês atual'):
  //     period_start_mobile = formattedCurrentMonth().formattedThisMonthFirstDay;
  //     period_end_mobile = formattedCurrentMonth().formattedThisMonthLastDay;
  //     break;
  //   case whichDate('mês passado'):
  //     period_start_mobile = formattedLastMonth().formattedLastMonthFirstDay;
  //     period_end_mobile = formattedLastMonth().formattedLastMonthLastDay;
  //     break;
  //   case whichDate('ano'):
  //     period_start_mobile = formattedCurrentYear().formattedThisYearFirstDay;
  //     period_end_mobile = formattedCurrentYear().formattedThisYearLastDay;
  //     break;
  //   default:
  //     return null;
  // }

  const period_start_and_end_mobile = useCallback(() => {
    // for (let i = 0; i < date.length; i++) {
    //   case whichDate(date[i].nameDay):
    //     period_start_mobile = date[i].period_start;
    //     period_end_mobile = date[i].period_end;
    //     break;
    //   default:
    //     return null;
    // }
    // for (const element of date) {
    //   switch (dashboardDateTypesMobile) {
    //     case whichDate(element.nameDay as selectDashboardDateTypes):
    //       return {
    //         period_start_mobile: element.period_start,
    //         period_end_mobile: element.period_end,
    //       };
    //     default:
    //       return {
    //         period_start_mobile: formattedToday().formattedTodayStart,
    //         period_end_mobile: formattedToday().formattedTodayEnd,
    //       };
    //   }
    // }
    for (const element of date) {
      if (element.nameDay === dashboardDateTypesMobile) {
        return {
          period_start_mobile: element.period_start,
          period_end_mobile: element.period_end,
        };
      }
    }
    return {
      period_start_mobile: formattedToday().formattedTodayStart,
      period_end_mobile: formattedToday().formattedTodayEnd,
    };
  }, [dashboardDateTypesMobile]);

  const totalActiveAwaitingAndOverduePlansOverview = useCallback(() => {
    const initialValueStatusCurrentPaymentsStatus: IStatusCurrentPaymentsStatusAndStatus = {
      inDay: 0,
      overdue: 0,
      statusContract: {
        pending: 0,
        released: 0,
        canceled: 0,
      },
    };

    const status = dataDashboardOverview.data.reduce(
      // O primeiro parametro sempre é o acc, que é o acumulador, o segundo é o valor atual do array, ex: data[0].current_payments_status
      (acc: IStatusCurrentPaymentsStatusAndStatus, contracts: IContract) => {
        const statusCurrentPaymentsStatus = contracts.current_payments_status.toUpperCase();
        const statusContracts = contracts.status.toUpperCase();
        if (statusCurrentPaymentsStatus === 'OVERDUE') {
          acc.overdue += 1;
        } else if (statusCurrentPaymentsStatus === 'IN_DAY') {
          acc.inDay += 1;
        } else if (statusContracts === 'PENDING') {
          acc.statusContract.pending += 1;
        }
        return acc;
      },
      initialValueStatusCurrentPaymentsStatus,
    );
    return status;
  }, [dataDashboardOverview]);

  const dataFormatted = useCallback(() => {
    setDataOverviewFormatted({
      overview: {
        tpa: totalActiveAwaitingAndOverduePlansOverview().inDay,
        tpat: totalActiveAwaitingAndOverduePlansOverview().overdue,
        tpag: totalActiveAwaitingAndOverduePlansOverview().statusContract
          .pending,
      },
    });
  }, [dataDashboardOverview]);

  // const getDataDashboardOverview = useCallback(async () => {
  //   const fetchData = async (page = 1, dataArray = []) => {
  //     try {
  //       const response = await apiRebox.get(`/contracts`, {
  //         params: {
  //           page,
  //           per_page: 2000,
  //         },
  //       });

  //       const responseData = response.data.data;

  //       if (responseData.length === 0) {
  //         // Se o array estiver vazio, interrompa a recursão
  //         setDataDashboardOverview({
  //           header: response.data.header,
  //           data: dataArray,
  //         });
  //         setLoadingOverview(false);
  //         return;
  //       }

  //       const updatedDataArray = dataArray.concat(responseData);
  //       const nextPage = page + 1;
  //       fetchData(nextPage, updatedDataArray);
  //     } catch (error) {
  //       console.error(
  //         `Erro ao tentar buscar dados para o dashboard overview: ${error}`,
  //         error,
  //       );
  //       setLoadingOverview(false);
  //     }
  //   };
  //   setLoadingOverview(true);
  //   fetchData();
  // }, []);
  // const getDataDashboardOverview = useCallback(async () => {
  //   let currentPage: number;
  //   let futurePage: number;

  //   const fetchData = async (page: number): Promise<never[]> => {
  //     const response = await apiRebox.get(`/contracts`, {
  //       params: {
  //         page,
  //         per_page: 2000,
  //       },
  //     });

  //     const responseData = response.data.data;

  //     return responseData;
  //   };

  //   const fetchMultiRequests = async (lastPage = 1, dataArray = []) => {
  //     currentPage = lastPage + 1;
  //     futurePage = currentPage + 1;
  //     try {
  //       const promiseLastPage = fetchData(lastPage);
  //       const promiseCurrentPage = fetchData(currentPage);
  //       const promiseFuturePage = fetchData(futurePage);
  //       const [
  //         responseLastPage,
  //         responseCurrentPage,
  //         responseFuturePage,
  //       ] = await Promise.all([
  //         promiseLastPage,
  //         promiseCurrentPage,
  //         promiseFuturePage,
  //       ]);

  //       if (
  //         responseLastPage.length === 0 &&
  //         responseCurrentPage.length === 0 &&
  //         responseFuturePage.length === 0
  //       ) {
  //         // Se o array estiver vazio, interrompa a recursão
  //         setDataDashboardOverview({
  //           data: dataArray,
  //         });
  //         setLoadingOverview(false);
  //         return;
  //       }
  //       const updatedDataArray = dataArray.concat(
  //         responseLastPage,
  //         responseCurrentPage,
  //         responseFuturePage,
  //       );
  //       // + 3 pois estamos pegando a página atual, a próxima e a futura, ou seja de tres em tres. Ex: Lastpage na primeira é um, o currentpage é 2, e o futurePage é 3 por conta do +1, na proxima recurssão o lastpage será 4 por conta desse +3 aqui, o currentpage será 5 e o futurePage sera 6 por conta do +1 e assim por diante.
  //       const nextPage = lastPage + 3;
  //       await fetchMultiRequests(nextPage, updatedDataArray);
  //     } catch (error) {
  //       console.error(
  //         `Erro ao tentar buscar dados para o dashboard overview: ${error}`,
  //         error,
  //       );
  //       setLoadingOverview(false);
  //     }
  //   };
  //   setLoadingOverview(true);
  //   fetchMultiRequests();
  // }, []);
  const getDataDashboardOverview = useCallback(async () => {
    const fetchData = async (page: number): Promise<never[]> => {
      const response = await apiRebox.get(`/contracts`, {
        params: {
          page,
          per_page: 2000,
        },
      });

      const responseData = response.data.data;

      return responseData;
    };

    try {
      setLoadingOverview(true);

      // Fazer uma requisição inicial para obter o número total de contratos
      const initialResponse = await apiRebox.get(`/contracts`);
      const totalContracts = initialResponse.data.header.total; //  o número total de contratos

      const numPages = Math.ceil(totalContracts / 2000); // Calcular o número de páginas com base no número total de contratos
      const promises: Promise<never[]>[] = [];

      for (let page = 1; page <= numPages; page++) {
        promises.push(fetchData(page));
      }
      const responseDataArray = await Promise.all(promises);

      const finalDataArray = responseDataArray.flat();
      setDataDashboardOverview({
        data: finalDataArray,
      });
      setLoadingOverview(false);
    } catch (error) {
      console.error(
        `Erro ao tentar buscar dados para o dashboard overview: ${error}`,
        error,
      );
      setLoadingOverview(false);
    }
  }, []);

  useEffect(() => {
    getDataDashboardOverview();
    const interval = setInterval(getDataDashboardOverview, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dataFormatted();
  }, [dataDashboardOverview]);

  return (
    <Container>
      {width < 981 ? (
        <CardDashboardCommercialDefault
          period_start={period_start_and_end_mobile()?.period_start_mobile}
          period_end={period_start_and_end_mobile()?.period_end_mobile}
          dataOverview={{
            tpa: dataOverviewFormatted.overview.tpa,
            tpat: dataOverviewFormatted.overview.tpat,
            tpag: dataOverviewFormatted.overview.tpag,
            loadingOverview,
          }}
          IpropsDashboards={{
            dashboardDateTypesMobile,
            setLoadingDashboard,
            setFirstLoadingDashboard,
            firstLoadingDashboard,
          }}
          className="card-mobile"
          id="card-mobile"
        />
      ) : (
        <DashboardColumns>
          {date.map((day, index) => (
            <CardDashboardCommercialDefault
              key={`${index}-${day}`}
              period_start={day.period_start}
              period_end={day.period_end}
              dataOverview={{
                tpa: dataOverviewFormatted.overview.tpa,
                tpat: dataOverviewFormatted.overview.tpat,
                tpag: dataOverviewFormatted.overview.tpag,
                loadingOverview,
              }}
              IpropsDashboards={{
                dashboardDateTypesDesktop: day.nameDay,
                setLoadingDashboard,
                setFirstLoadingDashboard,
                firstLoadingDashboard,
              }}
              className="card-desktop"
              id="card-desktop"
            />
          ))}
        </DashboardColumns>
      )}
    </Container>
  );
};

export default DashboardCommercial;
