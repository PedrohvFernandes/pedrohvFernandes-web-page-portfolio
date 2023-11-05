// ./src/pages/privates/Dashboard/styles.ts
import styled from 'styled-components';

type IPropsDashboardType = {
  showMenuTypeDashboards: boolean;
};

type IPropsDashboardDate = {
  menuOpenDashboardsDate: boolean;
};

type IPropsSection = {
  loading: boolean;
};

export const Container = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
`;

export const ContainerGroup = styled.div`
  flex: 1;
  display: flex;
`;

export const Content = styled.section<IPropsSection>`
  width: 100%;
  height: calc(100vh - 65px);
  background-color: ${({ theme }) => theme.colors.whiteCloud.main};
  padding: 3vh 4vw;
  overflow-y: ${({ loading }) => (loading ? 'hidden' : 'auto')};
  position: relative;
`;

export const Options = styled.nav`
  margin-top: 2vh;
  position: relative;
  @media (min-width: 981px) {
    > button {
      display: none;
    }
  }
  @media (max-width: 383px) {
    > button p {
      font-size: 0.55rem;
    }
  }
`;

export const ContainerOptionsGroup = styled.div<IPropsDashboardType>`
  display: flex;
  @media (max-width: 980px) {
    display: ${({ showMenuTypeDashboards }) =>
      showMenuTypeDashboards ? 'flex' : 'none'};
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2vh 2vw;
    border-radius: 6px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    gap: 2vh;
    animation: menu-animation 0.6s ease-in-out forwards;
    @keyframes menu-animation {
      0% {
        top: 0;
        opacity: 0;
      }
      100% {
        top: 45px;
        opacity: 1;
      }
    }
    left: 0;
    right: 0;
    z-index: 8;
    background-color: ${({ theme }) => theme.colors.white.main};
  }
`;

export const Tag = styled.span`
  padding: 3px 5px;
  word-break: break-word;
  font-weight: 600;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.yellowSunFlower.main};
  border-radius: 4px;
  text-align: center;
  font-size: 8px;
`;

export const FirstLetterUpperCase = styled.span`
  text-transform: capitalize;
  ::first-letter {
    text-transform: uppercase;
  }
  margin-inline: 1vw;
`;

export const WrapperOptionsGroup = styled.div`
  > button p {
    display: flex;
    flex-direction: column;
  }
  > div button p {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  gap: 2vw;
  @media (max-width: 371px) {
    flex-direction: column;
    gap: 2vh;
  }
`;

export const GroupFirstTypeDashboard = styled.div`
  display: flex;
  gap: 2vw;
`;

export const ContainerMenuDashboardsDate = styled.div`
  position: relative;
  @media (min-width: 980px) {
    > .button-date-dashboard {
      display: none;
    }
  }
`;

export const WrapperMenuDashboardsDate = styled.div<IPropsDashboardDate>`
  display: none;
  position: absolute;
  animation: menu-animation 0.6s ease-in-out forwards;
  @keyframes menu-animation {
    0% {
      top: 0;
      opacity: 0;
    }
    100% {
      top: 45px;
      opacity: 1;
    }
  }
  left: 0;
  right: 0;
  z-index: 5;
  @media (max-width: 980px) {
    display: ${({ menuOpenDashboardsDate }) =>
      menuOpenDashboardsDate ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
  }
`;

export const MenuDashBoardDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vh;
  padding: 2vh 2vw;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white.main};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 515px) {
    flex-direction: column;
  }
`;

export const GroupFirstTypeDate = styled.div`
  display: flex;
  gap: 1vw;
`;
export const GroupSecondTypeDate = styled.div`
  display: flex;
  gap: 1vw;
`;

export const ButtonsOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .btn-update {
    max-width: 140px;
  }

  @media (max-width: 320px) {
    > button {
      width: 50px;
      > p {
        display: none;
      }
    }
  }
`;
