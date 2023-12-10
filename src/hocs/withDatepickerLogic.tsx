import React, { ComponentType, useCallback, useMemo, useState } from 'react';

import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { useDateInput } from '@/hooks/useDateInput';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

export const withDatepickerLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const {
      type,
      initialDate,
      minDate,
      maxDate,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country = 'BY',
      ...rest
    } = props as T;

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

    const { value, onClearInput, onChange } = useDateInput(
      onInputValue,
      currentDate,
    );

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
            value={value}
            onClearInput={onClearInput}
            onChange={onChange}
          />
        </WeekContext.Provider>
      </DateContext.Provider>
    );
  };
