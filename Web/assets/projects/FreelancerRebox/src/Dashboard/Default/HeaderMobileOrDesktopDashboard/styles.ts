import styled from 'styled-components';

export const HeaderMobileAndDesktop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  > div h4 {
    border: 1px solid ${({ theme }) => theme.colors.blue.main};
    border-radius: 6px;
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
    ::first-letter {
      text-transform: uppercase;
    }
  }
`;

export const Temps = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  @media (max-width: 360px) {
    > div p {
      font-size: 0.7rem;
    }
  }
`;
