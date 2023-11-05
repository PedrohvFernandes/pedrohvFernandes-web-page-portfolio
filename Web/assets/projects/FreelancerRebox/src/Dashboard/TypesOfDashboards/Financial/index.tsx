import { useEffect } from 'react';

import DashboardColumns from '../../Default/DashboardColumnsDefault';

const DashboardFinancial: React.FC = () => {
  useEffect(() => {
    console.log('DashboardFinancial');
  }, []);
  return (
    <DashboardColumns>
      <h1>Em breve</h1>
    </DashboardColumns>
  );
};

export default DashboardFinancial;
