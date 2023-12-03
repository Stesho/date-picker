import React, { useCallback, useMemo, useState } from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { DateContext } from '@/context/dateContext';
import { ResetStyles } from '@/styles/reset';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

interface DatepickerProps {
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  isStartWithMonday?: boolean;
}

export const Datepicker = ({
  initialDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
}: DatepickerProps) => {
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentDate, setCurrentDate] = useState(initialDate || null);

  const onInputValue = useCallback((dateString: string) => {
    if (isValidDateString(dateString)) {
      setCurrentDate(dateString !== '' ? parseDateString(dateString) : null);
      setIsError(false);
    } else {
      setCurrentDate(null);
      setIsError(true);
    }
  }, []);

  const toggleCalendar = () => {
    setIsOpenCalendar(!isOpenCalendar);
  };

  const dateContext = useMemo(
    () => ({
      currentDate,
      minDate,
      maxDate,
    }),
    [currentDate, minDate, maxDate],
  );

  return (
    <div>
      <DateContext.Provider value={dateContext}>
        <ResetStyles />
        <DateInput
          currentDate={currentDate}
          toggleCalendar={toggleCalendar}
          onInputValue={onInputValue}
          isError={isError}
        />
        {isOpenCalendar && (
          <Calendar
            setCurrentDate={setCurrentDate}
            isStartWithMonday={isStartWithMonday}
          />
        )}
      </DateContext.Provider>
    </div>
  );
};
