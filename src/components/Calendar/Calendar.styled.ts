import styled from 'styled-components';

import { Color } from '@/types/Color';

export const CalendarWrapper = styled.div<{
  $background?: Color;
}>`
  position: relative;
  width: 250px;
  padding: 10px;
  background: ${(props) => props.$background || '#fff'};
  border-radius: 8px;
  border: 1px solid #ddd;

  user-select: none;
`;
