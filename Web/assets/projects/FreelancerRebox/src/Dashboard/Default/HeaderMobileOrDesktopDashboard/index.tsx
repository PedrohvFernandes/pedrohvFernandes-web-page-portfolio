import { Paragraph, SubtitleSecondary } from '@components/index';

import { selectDashboardDateTypes } from '../../TypesOfDashboards/typings';

import { HeaderMobileAndDesktop, Temps } from './styles';
import useGetDateFormatted from '../../hooks/get-date-formatted';

type Iprops = {
  dashboardDateTypes: selectDashboardDateTypes;
  period_start: string;
  period_end: string;
};

const HeaderMobileOrDesktopDashboard: React.FC<Iprops> = ({
  dashboardDateTypes,
  period_start,
  period_end,
}) => {
  const { formattedDateBr } = useGetDateFormatted();
  return (
    <HeaderMobileAndDesktop>
      <SubtitleSecondary fontSize={20}>{dashboardDateTypes}</SubtitleSecondary>
      <Temps>
        <Paragraph>{formattedDateBr(period_start)}</Paragraph>
        <Paragraph>{formattedDateBr(period_end)}</Paragraph>
      </Temps>
    </HeaderMobileAndDesktop>
  );
};

export default HeaderMobileOrDesktopDashboard;
