import styled from 'styled-components';

import { ReactComponent as CalendarIconSvg } from '@/assets/icons/Calendar.svg';

export const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 250px;
  margin: 0 0 8px 0;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 39px;
  color: #333;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

export const CalendarIcon = styled(CalendarIconSvg)`
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
