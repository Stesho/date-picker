import React, { useContext } from 'react';

import { ColorContext } from '@/context/colorContext';
import { InputContext } from '@/context/inputContext';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from './DateInput.styled';

export const DateInput = () => {
  const colors = useContext(ColorContext);
  const { value, toggleCalendar, onChange, onClearInput, isError } =
    useContext(InputContext);

  return (
    <DateInputWrapper>
      <CalendarIcon onClick={toggleCalendar} data-testid='calendarIcon' />
      <Input
        data-testid='dateInput'
        value={value}
        onChange={onChange}
        placeholder='Choose Date'
        type='text'
        $colors={colors.input}
        $errorBorder={colors.input?.error}
        $isError={isError}
      />
      {value.length > 0 && (
        <CrossButton
          onClick={onClearInput}
          type='button'
          $colors={colors.input?.crossButton}
        >
          ✖
        </CrossButton>
      )}
    </DateInputWrapper>
  );
};
