import { Link } from 'react-router-dom';
import styled from 'styled-components';

type IAreaClientLink = {
  loadingFirstAuth: boolean;
};

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  justify-content: center;
  align-items: center;
  padding: 3vh 0;
  > .buttonMenuPlatforms {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > .buttonMenuPlatforms {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const AreaClientLink = styled(Link)<IAreaClientLink>`
  pointer-events: ${({ loadingFirstAuth }) =>
    loadingFirstAuth ? 'none' : 'auto'};
`;