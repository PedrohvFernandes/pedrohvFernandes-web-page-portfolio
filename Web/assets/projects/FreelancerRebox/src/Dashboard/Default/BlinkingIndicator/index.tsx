import React from 'react';

import { Blinked } from './styles';

type IProps = {
  show: boolean;
};
const BlinkingIndicator: React.FC<IProps> = ({ show }) => {
  return <Blinked blink={show} />;
};

export default BlinkingIndicator;
