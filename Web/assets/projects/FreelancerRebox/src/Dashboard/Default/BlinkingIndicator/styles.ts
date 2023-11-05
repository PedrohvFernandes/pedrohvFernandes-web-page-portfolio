import styled from 'styled-components';

type BlinkingIndicatorProps = {
  blink: boolean;
};

export const Blinked = styled.div<BlinkingIndicatorProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: blink 1s infinite linear;
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
  background-color: ${({ blink, theme }) =>
    blink ? theme.colors.white.main : 'transparent'};
  pointer-events: none;
  transition: all 0.4s ease-in-out;
  z-index: 9999;
`;
