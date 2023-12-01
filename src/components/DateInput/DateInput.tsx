import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';
import { dateToString } from '@/utils/dateToString';

interface DateInputProps {
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
  const numbersOrSlashSymbol = /^[\d\\/]*$/;

  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    if (numbersOrSlashSymbol.test(dateString)) {
      setValue(dateString);
      onInputValue(dateString);
    }
  };

  const onClearInput = () => {
    setValue('');
    onInputValue('');
  };

  useEffect(() => {
    if (currentDate) {
      const dateString = dateToString(currentDate);
      setValue(dateString);
    }
  }, [currentDate]);

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
