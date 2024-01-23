import styled from 'styled-components';

import { Cell } from '@/components/Cells/Cells.styled';
import { ElementColor, ElementColorOptions } from '@/types/ColorOptions';

export const WeekCell = styled(Cell)<{
  $areWeekendsHidden: boolean;
  $colors?: ElementColorOptions;
}>`
  width: ${(props) => (props.$areWeekendsHidden ? '45.5px' : '32px')};
  height: ${(props) => (props.$areWeekendsHidden ? '45.5px' : '32px')};
  font-weight: 700;
  color: ${(props) => props.$colors?.text || '#000'};
  background-color: ${(props) => props.$colors?.background || 'none'};
`;
