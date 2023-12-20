import styled from 'styled-components';

import { Color } from '@/types/Color';

export const CalendarWrapper = styled.div<{
  $background?: Color;
}>`
  position: absolute;
  width: 250px;
  top: 55px;
  left: 0;
  padding: 10px;
  background: ${(props) => props.$background || '#fff'};
  border-radius: 8px;
  border: 1px solid #ddd;

  user-select: none;
`;
