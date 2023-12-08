import React, { useCallback, useMemo, useState } from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { ResetStyles } from '@/styles/reset';
import { CalendarTypes } from '@/types/CalendarTypes';
import { DatepickerParams } from '@/types/DatepickerParams';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

interface DatepickerProps extends DatepickerParams {
  initialDate?: Date;
}

export const Datepicker = ({
  type = CalendarTypes.Month,
  initialDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
  areWeekendsHidden = false,
  isHolidays = false,
  country = 'BY',
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

  const weekContext = useMemo(
    () => ({
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country,
    }),
    [isStartWithMonday, areWeekendsHidden, isHolidays, country],
  );

  return (
    <div>
      <DateContext.Provider value={dateContext}>
        <WeekContext.Provider value={weekContext}>
          <ResetStyles />
          <DateInput
            currentDate={currentDate}
            toggleCalendar={toggleCalendar}
            onInputValue={onInputValue}
            isError={isError}
          />
          {isOpenCalendar && (
            <Calendar type={type} setCurrentDate={setCurrentDate} />
          )}
        </WeekContext.Provider>
      </DateContext.Provider>
    </div>
  );
};
