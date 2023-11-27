import React, { useCallback, useState } from 'react';

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
  const [isError, setIsError] = useState(false);
  const [currentDate, setCurrentDate] = useState(initialDate);

  const isInvalidDateString = useCallback(
    (dateString: string) => dateString !== '' && !datePattern.test(dateString),
    [],
  );

  const onInputValue = useCallback(
    (dateString: string) => {
      if (!isInvalidDateString(dateString)) {
        setCurrentDate(parseDateString(dateString));
        setIsError(false);
      } else {
        setIsError(true);
      }
    },
    [isInvalidDateString],
  );

  const toggleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  return (
    <div>
      <ResetStyles />
      <DateInput
        toggleCalendar={toggleCalendar}
        onInputValue={onInputValue}
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
