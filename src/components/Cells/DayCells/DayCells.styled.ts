import styled from 'styled-components';

import { Cell } from '@/components/Cells/Cells.styled';
import { CellsColors } from '@/types/ColorOptions';

export const DayCell = styled(Cell)<{
  $hasTodos: boolean;
  $areWeekendsHidden: boolean;
  $isHoliday: boolean;
  $isRange?: boolean;
  $isStart?: boolean;
  $isFinish?: boolean;
  $colors?: CellsColors;
}>`
  width: ${(props) => (props.$areWeekendsHidden ? '45.5px' : '32px')};
  height: ${(props) => (props.$areWeekendsHidden ? '45.5px' : '32px')};

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
    color: ${(props) => props.$colors?.common?.text || 'inherit'};
    background-color: ${(props) => {
      if (props.$isRange)
        return (
          props.$colors?.rangeDate?.background || 'rgba(47, 128, 237, 0.10)'
        );
      return props.$colors?.common?.background || 'none';
    }};
    border-radius: ${(props) => {
      if (props.$isStart) return '8px 0 0 8px';
      if (props.$isFinish) return '0 8px 8px 0';
      if (props.$isRange) return 'none';
      return '8px';
    }};
  }

  & input:not(:disabled) + label {
    color: ${(props) => {
      if (props.$isHoliday) return 'red';
      if (props.$isRange) return props.$colors?.rangeDate?.text || '#2F80ED';
      return 'inherit';
    }};
  }

  & input:not(:disabled):not(:checked) + label:hover {
    color: ${(props) => props.$colors?.common?.hover?.text};
    background-color: ${(props) =>
      props.$colors?.common?.hover?.background || '#f1f1f1'};
  }

  & input:disabled + label {
    color: ${(props) => props.$colors?.disabled?.text || '#aaa'};
    background-color: ${(props) =>
      props.$colors?.disabled?.background || 'none'};
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
    color: ${(props) => {
      if (props.$isStart) return props.$colors?.startDate?.text || '#fff';
      if (props.$isFinish) return props.$colors?.finishDate?.text || '#fff';
      return props.$colors?.currentDate?.text || '#fff';
    }};
    background-color: ${(props) => {
      if (props.$isStart)
        return (
          props.$colors?.startDate?.background || 'rgba(47, 128, 237, 0.60)'
        );
      if (props.$isFinish)
        return props.$colors?.finishDate?.background || '#2f80ed';
      return props.$colors?.currentDate?.background || '#2f80ed';
    }};
  }
`;
