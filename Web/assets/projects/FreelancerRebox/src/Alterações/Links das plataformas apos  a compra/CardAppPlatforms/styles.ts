import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardAppPlatformsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 2vh 2vw;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px 0px ${({ theme }) => theme.colors.black.opacity.low};
  background-color: ${({ theme }) => theme.colors.white.main};
  width: 100%;
  max-width: 100vh;

  > svg {
    cursor: pointer;
    display: none;
  }
  > div h4 {
    font-size: ${({ theme }) => theme.fonts.size.subtitle.medium}px;
  }
  > div .titleMobileMain {
    display: none;
    font-size: ${({ theme }) => theme.fonts.size.subtitle.tiny}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > div .titleMobileMain {
      display: block;
    }
    > div h4 {
      font-size: ${({ theme }) => theme.fonts.size.subtitle.tiny}px;
    }
    > svg {
      display: block;
    }
  }
`;

export const CardAppPlatformsContent = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 2vw;
`;

export const AppPlatformsLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.2vh 0.2vw;
  width: 100%;
  max-width: 15rem;
  height: 100%;
  max-height: 5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray.opacity.veryLow};
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileLarge}) {
    max-width: 10rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
    height: 80%;
  }
`;

export const BackgroundSpan = styled.span`
  padding: 0.4vh 0.4vw;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.black.opacity.low};
`;
