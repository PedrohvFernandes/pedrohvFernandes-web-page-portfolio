import styled from 'styled-components';

interface IProps {
  columns?: number;
}

export const GroupDashboards = styled.div<IProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 0.5fr);
  column-gap: 2vw;
  row-gap: 2vh;
  @media (max-width: 1245.6px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
