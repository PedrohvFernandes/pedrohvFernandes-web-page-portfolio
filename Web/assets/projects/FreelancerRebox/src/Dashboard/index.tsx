// ./src/pages/privates/Dashboard/index.tsx
import React, { useState } from 'react';

import { IoArrowDownCircle, IoArrowUpCircle } from 'react-icons/io5';

import {
  ButtonDefault,
  ButtonOutline,
  HeaderNavigationPrivate,
  MenuSideBarPrivate,
  SubtitleSecondary,
} from '@components/index';

import BlinkingIndicator from './Default/BlinkingIndicator';
import DashboardCommercial from './TypesOfDashboards/Commercial';
import DashboardFinancial from './TypesOfDashboards/Financial';
import DashboardSinister from './TypesOfDashboards/Sinister';
import {
  dashboardsTypes,
  selectDashboardDateTypes,
} from './TypesOfDashboards/typings';

import {
  Container,
  ContainerGroup,
  ContainerMenuDashboardsDate,
  ContainerOptionsGroup,
  Content,
  FirstLetterUpperCase,
  GroupFirstTypeDashboard,
  GroupFirstTypeDate,
  GroupSecondTypeDate,
  MenuDashBoardDate,
  Options,
  Tag,
  WrapperMenuDashboardsDate,
  WrapperOptionsGroup,
} from './styles';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  const [showMenuDashboards, setShowMenuDashboards] = useState<{
    showMenuDashboardTypes: boolean;
    showMenuDashboardsDate: boolean;
  }>({
    showMenuDashboardTypes: false,
    showMenuDashboardsDate: false,
  });

  const [
    selectedDashboardType,
    setSelectedDashboardType,
  ] = useState<dashboardsTypes>('comercial');
  const [
    selectedDashboardDate,
    setSelectedDashboardDate,
  ] = useState<selectDashboardDateTypes>('hoje');

  let dashboardSelected: JSX.Element;

  const dateArray: {
    datesFirst: Array<selectDashboardDateTypes>;
    datesSecond: Array<selectDashboardDateTypes>;
  } = {
    datesFirst: ['hoje', 'ontem', 'mês atual'],
    datesSecond: ['mês passado', 'ano'],
  };

  const setLoadingDashboard = (loadingDashboard: boolean) => {
    setLoading(loadingDashboard);
  };

  const setFirstLoadingDashboard = (loadingDashboard: boolean) => {
    setFirstLoading(loadingDashboard);
  };

  switch (selectedDashboardType) {
    case 'comercial':
      dashboardSelected = (
        <DashboardCommercial
          dashboardDateTypesMobile={selectedDashboardDate}
          setLoadingDashboard={setLoadingDashboard}
          setFirstLoadingDashboard={setFirstLoadingDashboard}
          firstLoadingDashboard={firstLoading}
        />
      );
      break;
    case 'sinistro':
      dashboardSelected = <DashboardSinister />;
      break;
    case 'financeiro':
      dashboardSelected = <DashboardFinancial />;
      break;
    default:
      return null;
  }

  const openMenuDashboards = () => {
    setShowMenuDashboards(prevState => ({
      ...prevState,
      showMenuDashboardTypes: !prevState.showMenuDashboardTypes,
    }));
    if (!showMenuDashboards.showMenuDashboardTypes) {
      setShowMenuDashboards(prevState => ({
        ...prevState,
        showMenuDashboardsDate: false,
      }));
    }
  };

  const handleSelectedDashboardType = (type: dashboardsTypes) => {
    setSelectedDashboardType(type);
    setShowMenuDashboards({
      showMenuDashboardTypes: false,
      showMenuDashboardsDate: false,
    });
    setSelectedDashboardDate('hoje');
  };

  const handleSelectedDashboardDateTypes = (type: selectDashboardDateTypes) => {
    setSelectedDashboardDate(type);
    setShowMenuDashboards(prevState => ({
      showMenuDashboardTypes: !prevState.showMenuDashboardTypes,
      showMenuDashboardsDate: !prevState.showMenuDashboardsDate,
    }));
  };

  const theButtonIsOpen = (
    type: dashboardsTypes | selectDashboardDateTypes,
  ) => {
    return type === selectedDashboardType || type === selectedDashboardDate;
  };

  return (
    <Container>
      <HeaderNavigationPrivate />
      <ContainerGroup>
        <MenuSideBarPrivate />
        <Content loading={firstLoading}>
          <BlinkingIndicator show={loading} />
          <SubtitleSecondary textAlign="start">Dashboard</SubtitleSecondary>
          <Options>
            <ButtonDefault
              onClick={openMenuDashboards}
              iconLeft={
                !showMenuDashboards.showMenuDashboardTypes
                  ? IoArrowDownCircle
                  : IoArrowUpCircle
              }
              isDisable={loading}
            >
              Dashboard:
              <FirstLetterUpperCase>
                {selectedDashboardType}
              </FirstLetterUpperCase>
              | Data:
              <FirstLetterUpperCase>
                {selectedDashboardDate}
              </FirstLetterUpperCase>
            </ButtonDefault>
            <ContainerOptionsGroup
              showMenuTypeDashboards={showMenuDashboards.showMenuDashboardTypes}
            >
              <WrapperOptionsGroup>
                <GroupFirstTypeDashboard>
                  <ButtonOutline
                    onClick={() => handleSelectedDashboardType('comercial')}
                    isActive={theButtonIsOpen('comercial')}
                    isDisabled={theButtonIsOpen('comercial') || loading}
                  >
                    Comercial
                  </ButtonOutline>
                  <ButtonOutline
                    onClick={() => handleSelectedDashboardType('sinistro')}
                    isActive={theButtonIsOpen('sinistro')}
                    isDisabled={theButtonIsOpen('sinistro') || loading}
                  >
                    Sinistro
                    <Tag>Em breve</Tag>
                  </ButtonOutline>
                </GroupFirstTypeDashboard>
                <ButtonOutline
                  onClick={() => handleSelectedDashboardType('financeiro')}
                  isActive={theButtonIsOpen('financeiro')}
                  isDisabled={theButtonIsOpen('financeiro') || loading}
                >
                  Financeiro
                  <Tag>Em breve</Tag>
                </ButtonOutline>
              </WrapperOptionsGroup>
              <ContainerMenuDashboardsDate>
                <ButtonOutline
                  className="button-date-dashboard"
                  onClick={() =>
                    setShowMenuDashboards(prevState => ({
                      ...prevState,
                      showMenuDashboardsDate: !prevState.showMenuDashboardsDate,
                    }))
                  }
                  iconLeft={
                    !showMenuDashboards.showMenuDashboardsDate
                      ? IoArrowDownCircle
                      : IoArrowUpCircle
                  }
                >
                  <FirstLetterUpperCase>
                    {selectedDashboardDate}
                  </FirstLetterUpperCase>
                </ButtonOutline>

                <WrapperMenuDashboardsDate
                  menuOpenDashboardsDate={
                    showMenuDashboards.showMenuDashboardsDate
                  }
                >
                  <MenuDashBoardDate>
                    <GroupFirstTypeDate>
                      {dateArray.datesFirst.map((day, index) => (
                        <ButtonOutline
                          key={`${day}-${index}`}
                          onClick={() => handleSelectedDashboardDateTypes(day)}
                          isActive={theButtonIsOpen(day)}
                          isDisabled={theButtonIsOpen(day) || loading}
                        >
                          <FirstLetterUpperCase>{day}</FirstLetterUpperCase>
                        </ButtonOutline>
                      ))}
                    </GroupFirstTypeDate>
                    <GroupSecondTypeDate>
                      {dateArray.datesSecond.map((day, index) => (
                        <ButtonOutline
                          key={`${day}-${index}`}
                          onClick={() => handleSelectedDashboardDateTypes(day)}
                          isActive={theButtonIsOpen(day)}
                          isDisabled={theButtonIsOpen(day) || loading}
                        >
                          <FirstLetterUpperCase>{day}</FirstLetterUpperCase>
                        </ButtonOutline>
                      ))}
                    </GroupSecondTypeDate>
                  </MenuDashBoardDate>
                </WrapperMenuDashboardsDate>
              </ContainerMenuDashboardsDate>
            </ContainerOptionsGroup>
          </Options>
          {dashboardSelected}
        </Content>
      </ContainerGroup>
    </Container>
  );
};

export default Dashboard;
