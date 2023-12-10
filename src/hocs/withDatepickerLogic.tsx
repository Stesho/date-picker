import React, { ComponentType, useMemo, useState } from 'react';

import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { useDateInput } from '@/hooks/useDateInput';
import { useDates } from '@/hooks/useDates';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

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
    const { currentDate, errorMessage, onInputValue, setCurrentDate } =
      useDates(initialDate);
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
            errorMessage={errorMessage}
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
