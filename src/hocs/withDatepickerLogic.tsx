import React, { ComponentType, useCallback, useMemo, useState } from 'react';

import { DatepickerProps } from '@/components/Datepicker/Datepicker';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

export const withDatepickerLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
  options: DatepickerProps,
) =>
  function (props: T) {
    const { ...rest } = props as T;
    const {
      type,
      initialDate,
      minDate,
      maxDate,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country = 'BY',
    } = options;

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
      <DateContext.Provider value={dateContext}>
        <WeekContext.Provider value={weekContext}>
          <WrappedComponent
            {...(rest as T)}
            currentDate={currentDate}
            toggleCalendar={toggleCalendar}
            onInputValue={onInputValue}
            isError={isError}
            isOpenCalendar={isOpenCalendar}
            type={type}
            setCurrentDate={setCurrentDate}
          />
        </WeekContext.Provider>
      </DateContext.Provider>
    );
  };
