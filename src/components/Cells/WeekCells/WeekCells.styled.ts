import styled from 'styled-components';

import { Cell } from '@/components/Cells/Cells.styled';

export const WeekCell = styled(Cell)<{ $areWeekendsHidden: boolean }>`
  width: ${(props) => (props.$areWeekendsHidden ? '45.5px' : '32px')};
  height: ${(props) => (props.$areWeekendsHidden ? '45.5px' : '32px')};
  font-weight: 700;
`;
