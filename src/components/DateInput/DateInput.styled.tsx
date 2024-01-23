import React from 'react';
import styled from 'styled-components';

import { CalendarIconSvg } from '@/assets/icons/CalendarIcon/CalendarIcon';
import { ElementColor, ElementColorOptions } from '@/types/ColorOptions';

export const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
`;

export const Input = styled.input<{
  $colors?: ElementColorOptions;
  $errorBorder?: ElementColorOptions;
  $isError: boolean;
}>`
  width: 100%;
  padding: 11px 39px;
  color: ${(props) => props.$colors?.text || '#333'};
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$isError
        ? props.$errorBorder?.border || 'red'
        : props.$colors?.border || '#ddd'};
  background: ${(props) => props.$colors?.background || '#fff'};
  outline: none;

  &::placeholder {
    color: ${(props) => props.$colors?.placeholder || '#bbb'};
  }
`;

export const CalendarIcon = styled(CalendarIconSvg)`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 15px;

  cursor: pointer;
`;

export const CrossButton = styled.button<{
  $colors?: ElementColorOptions;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: calc(100% - 16px - 15px);
  width: 16px;
  height: 16px;
  color: ${(props) => props.$colors?.text || '#fff'};
  border-radius: 50%;
  background-color: ${(props) => props.$colors?.background || '#aaa'};
  font-size: 10px;
  line-height: 100%;
  outline: none;
  border: none;
  cursor: pointer;
`;
