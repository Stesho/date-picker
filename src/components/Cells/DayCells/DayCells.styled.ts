import styled from 'styled-components';

import { Cell } from '@/components/Cells/Cells.styled';

export const DayCell = styled(Cell)<{
  $hasTodos: boolean;
  $areWeekendsHidden: boolean;
  $isHoliday: boolean;
  $isRange?: boolean;
  $isStart?: boolean;
  $isFinish?: boolean;
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
    background-color: ${(props) =>
      props.$isRange ? 'rgba(47, 128, 237, 0.10)' : 'none'};
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
      if (props.$isRange) return '#2F80ED';
      return 'inherit';
    }};
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
    background-color: ${(props) =>
      props.$isStart ? 'rgba(47, 128, 237, 0.60)' : '#2f80ed'};
  }
`;
