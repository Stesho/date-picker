import styled from 'styled-components';

import { Cell } from '@/components/Cells/Cells.styled';

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