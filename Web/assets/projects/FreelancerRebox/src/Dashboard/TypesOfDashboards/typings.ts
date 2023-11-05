import values from '@config/values';

type selectDashboardDateTypes =
  | 'hoje'
  | 'ontem'
  | 'mês atual'
  | 'mês passado'
  | 'ano';

type dashboardsTypes = 'comercial' | 'sinistro' | 'financeiro';

interface IAdresses {
  city: string;
  state: string;
  amount: number;
  percentage: number;
}

interface IContract {
  product: {
    name: string;
  };
  user: {
    adresses: IAdresses[];
    environment: keyof typeof values.rebox.contract.environment;
  };
  amount: number;
  status: keyof typeof values.rebox.contract.status;
  current_payments_status: keyof typeof values.rebox.contract.current_payments_status;
}

interface IStatusContract {
  canceled: number;
  released: number;
  pending: number;
}

type IPropsDashboards = {
  dashboardDateTypesMobile?: selectDashboardDateTypes;
  dashboardDateTypesDesktop?: selectDashboardDateTypes | 'resumo geral';
  setLoadingDashboard: (loadingDashboard: boolean) => void;
  setFirstLoadingDashboard: (loadingDashboard: boolean) => void;
  firstLoadingDashboard?: boolean;
};

export type {
  IPropsDashboards,
  dashboardsTypes,
  selectDashboardDateTypes,
  IContract,
  IStatusContract,
  IAdresses,
};
