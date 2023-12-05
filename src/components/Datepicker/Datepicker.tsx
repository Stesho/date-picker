import React, { useCallback, useMemo, useState } from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { ResetStyles } from '@/styles/reset';
import { DatepickerParams } from '@/types/DatepickerParams';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

interface DatepickerProps extends DatepickerParams {
  initialDate?: Date;
}

export const Datepicker = ({
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
    }),
    [isStartWithMonday, areWeekendsHidden],
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
            <Calendar
              setCurrentDate={setCurrentDate}
              isHolidays={isHolidays}
              country={country}
            />
          )}
        </WeekContext.Provider>
      </DateContext.Provider>
    </div>
  );
};
