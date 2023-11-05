import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3vh;
  background-color: ${({ theme }) => theme.colors.white.main};
  border-radius: 6px;
  padding: 2vh 2vw;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.black.opacity.low};
`;

export const InformationHorizontally = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div p {
    font-size: 0.8rem;
  }
  gap: 1vw;
  > div p {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    ::first-letter {
      text-transform: uppercase;
    }
  }
  > div h4 {
    font-size: 1rem;
  }
`;

export const InformationVertically = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vh;
  justify-content: space-between;
  > div p {
    font-size: 0.8rem;
    display: flex;
    gap: 0.3vw;
    text-transform: capitalize;
    ::first-letter {
      text-transform: uppercase;
    }
  }
  > div h4 {
    font-size: 1rem;
  }

  @media (max-width: 360px) {
    > div p {
      gap: 3vw;
    }
  } ;
`;

export const Info = styled.span`
  color: ${({ theme }) => theme.colors.blue.main};
`;
