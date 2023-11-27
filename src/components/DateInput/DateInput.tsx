import React, { ChangeEvent } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';

interface DateInputProps {
  dateValue: string;
  toggleCalendar: () => void;
  onInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearInput: () => void;
  isError: boolean;
}

export const DateInput = ({
  dateValue,
  toggleCalendar,
  onInputValue,
  onClearInput,
  isError,
}: DateInputProps) => (
  <DateInputWrapper>
    <CalendarIcon onClick={toggleCalendar} />
    <Input
      value={dateValue}
      onChange={onInputValue}
      placeholder='Choose Date'
      type='text'
      style={{
        borderColor: isError ? 'red' : '#ddd',
      }}
    />
    {dateValue.length > 0 && (
      <CrossButton onClick={onClearInput} type='button'>
        ✖
      </CrossButton>
    )}
  </DateInputWrapper>
);
