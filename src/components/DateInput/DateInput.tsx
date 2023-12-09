import React from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';
import { useDateInput } from '@/hooks/useDateInput';

export interface DateInputProps {
  currentDate: Date | null;
  toggleCalendar: () => void;
  onInputValue: (dateString: string) => void;
  isError: boolean;
}

export const DateInput = ({
  currentDate,
  toggleCalendar,
  onInputValue,
  isError,
}: DateInputProps) => {
  const { value, onClearInput, onChange } = useDateInput(
    onInputValue,
    currentDate,
  );

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
