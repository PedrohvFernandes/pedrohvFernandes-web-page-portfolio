import { useEffect } from 'react';

import DashboardColumns from '../../Default/DashboardColumnsDefault';

const DashboardSinister: React.FC = () => {
  useEffect(() => {
    console.log('DashboardSinister');
  }, []);
  return (
    <DashboardColumns>
      <h1>Em breve</h1>
    </DashboardColumns>
  );
};

export default DashboardSinister;
