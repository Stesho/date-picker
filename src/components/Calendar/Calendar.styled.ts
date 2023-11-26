import styled from 'styled-components';

import { ReactComponent as NextIcon } from '@/assets/icons/Next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/Prev.svg';

export const CalendarWrapper = styled.div`
  position: relative;
  width: 250px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;

  user-select: none;
`;

export const Controllers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-weight: 700;
`;

export const PrevControllerIcon = styled(PrevIcon)`
  cursor: pointer;
`;
export const NextControllerIcon = styled(NextIcon)`
  cursor: pointer;
`;

export const Cells = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-weight: 600;
`;

export const WeekCell = styled(Cell)`
  font-weight: 700;
`;

export const DayCell = styled(Cell)<{ $hasTodos: boolean }>`
  & input {
    display: none;
  }

  & label {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  & input:not(:disabled):not(:checked) + label:hover {
    background-color: #f1f1f1;
  }

  & input:disabled + label {
    color: #aaa;
  }

  & input:not(:disabled) + label:before {
    content: '';
    display: ${(props) => (props.$hasTodos ? 'block' : 'none')};
    position: absolute;
    width: 5px;
    height: 5px;
    top: 3px;
    left: calc(100% - 8px);
    border-radius: 50%;
    background-color: red;
  }

  & input:checked + label {
    color: #fff;
    background-color: #2f80ed;
  }
`;