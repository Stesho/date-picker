import React, { useContext } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';
import { ColorContext } from '@/context/colorContext';
import { InputContext } from '@/context/inputContext';

export const DateInput = () => {
  const colors = useContext(ColorContext);
  const { value, toggleCalendar, onChange, onClearInput, isError } =
    useContext(InputContext);

  return (
    <DateInputWrapper>
      <CalendarIcon onClick={toggleCalendar} />
      <Input
        value={value}
        onChange={onChange}
        placeholder='Choose Date'
        type='text'
        $colors={colors.input}
        $isError={isError}
      />
      {value.length > 0 && (
        <CrossButton onClick={onClearInput} type='button'>
          ✖
        </CrossButton>
      )}
    </DateInputWrapper>
  );
};
