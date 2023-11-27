import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { ResetStyles } from '@/styles/reset';
import { parseDateString } from '@/utils/parseDateString';

interface DatepickerProps {
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  isStartWithMonday?: boolean;
}

const datePattern = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4})$/;

export const Datepicker = ({
  initialDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
}: DatepickerProps) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentDate, setCurrentDate] = useState(initialDate);

  const onInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  const onClearInput = () => {
    setDateValue('');
  };

  const toggleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  const getCurrentDate = useCallback(() => {
    const newDate = parseDateString(dateValue);
    return dateValue && !isError ? newDate : initialDate;
  }, [dateValue, isError, initialDate]);

  useEffect(() => {
    setCurrentDate(getCurrentDate());
  }, [dateValue, getCurrentDate]);

  useEffect(() => {
    setIsError(
      (dateValue !== '' && !datePattern.test(dateValue)) ||
        (minDate !== undefined && parseDateString(dateValue) < minDate) ||
        (maxDate !== undefined && parseDateString(dateValue) > maxDate),
    );
  }, [dateValue, minDate, maxDate]);

  return (
    <div>
      <ResetStyles />
      <DateInput
        dateValue={dateValue}
        toggleCalendar={toggleCalendar}
        onInputValue={onInputValue}
        onClearInput={onClearInput}
        isError={isError}
      />
      {isOpenCalendar && (
        <Calendar
          initialDate={currentDate}
          minDate={minDate}
          maxDate={maxDate}
          isStartWithMonday={isStartWithMonday}
        />
      )}
    </div>
  );
};
