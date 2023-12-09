import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';
import { dateToString } from '@/utils/dateToString';

export interface RangeDateInputProps {
  startDate: Date | null;
  finishDate: Date | null;
  toggleCalendar: () => void;
  onInputValue: (dateString: string) => void;
  isError: boolean;
}

export const RangeDateInput = ({
  startDate,
  finishDate,
  toggleCalendar,
  onInputValue,
  isError,
}: RangeDateInputProps) => {
  const numbersOrSlashSymbol = /^[\d\\/]* ?[-:]? ?[\d\\/]*$/;
  const separator = ' - ';

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
    if (startDate && finishDate) {
      const startDateString = dateToString(startDate);
      const finishDateString = dateToString(finishDate);
      setValue(`${startDateString}${separator}${finishDateString}`);
    }
  }, [startDate, finishDate]);

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
