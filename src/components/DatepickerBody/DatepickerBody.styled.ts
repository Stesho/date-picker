import styled from 'styled-components';

import { ElementColorOptions } from '@/types/ColorOptions';

export const DatepickerBodyWrapper = styled.div`
  position: relative;
`;

export const ErrorMessage = styled.span<{
  $colors?: ElementColorOptions;
}>`
  position: absolute;
  z-index: 1;
  font-size: 12px;
  color: ${(props) => props.$colors?.text || 'red'};
  top: 41px;
  left: 0;
`;
