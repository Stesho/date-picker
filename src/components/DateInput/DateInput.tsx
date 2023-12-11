import React, { useContext } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';
import { InputContext } from '@/context/inputContext';

export const DateInput = () => {
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
        style={{
          borderColor: isError ? 'red' : '#ddd',
        }}
      />
      {value.length > 0 && (
        <CrossButton onClick={onClearInput} type='button'>
          ✖
        </CrossButton>
      )}
    </DateInputWrapper>
  );
};
