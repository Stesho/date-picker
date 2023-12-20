import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CalendarIconSvg } from '@/assets/icons/Calendar.svg';
import { ElementColorOptions } from '@/types/ColorOptions';

export const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
`;

export const Input = styled.input<{
  $colors?: ElementColorOptions;
  $isError: boolean;
}>`
  width: 100%;
  padding: 11px 39px;
  color: ${(props) => props.$colors?.text || '#333'};
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.$isError ? 'red' : props.$colors?.border || '#ddd')};
  background: ${(props) => props.$colors?.background || '#fff'};
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

export const CalendarIcon = styled((props: { onClick: () => void }) => (
  <CalendarIconSvg {...props} />
))`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 15px;

  cursor: pointer;
`;

export const CrossButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: calc(100% - 16px - 15px);
  width: 16px;
  height: 16px;
  color: #fff;
  border-radius: 50%;
  background-color: #aaa;
  font-size: 10px;
  line-height: 100%;
  outline: none;
  border: none;
  cursor: pointer;
`;
