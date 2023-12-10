import React, { ChangeEvent } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';

export interface DateInputProps {
  value: string;
  onClearInput: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleCalendar: () => void;
  isError: boolean;
}

export const DateInput = ({
  value,
  onClearInput,
  onChange,
  toggleCalendar,
  isError,
}: DateInputProps) => (
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
