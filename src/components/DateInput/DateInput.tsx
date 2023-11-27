import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';

interface DateInputProps {
  toggleCalendar: () => void;
  onInputValue: (dateString: string) => void;
  isError: boolean;
}

export const DateInput = ({
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
    }
  };

  const onClearInput = () => {
    setValue('');
  };

  useEffect(() => {
    onInputValue(value);
  }, [onInputValue, value]);

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
