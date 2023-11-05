import { Children } from 'react';

import { GroupDashboards } from './styles';

const DashboardColumns: React.FC = ({ children }) => {
  const childrens = Children.count(children);
  const columns = Children.count(children) <= 4 ? childrens : 4;

  return <GroupDashboards columns={columns}>{children}</GroupDashboards>;
};

export default DashboardColumns;
