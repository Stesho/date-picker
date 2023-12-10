import React, { ComponentType, useMemo, useState } from 'react';

import { RangeDateContext } from '@/context/rangeDateContext';
import { WeekContext } from '@/context/weekContext';
import { useRangeDate } from '@/hooks/useRangeDate';
import { useRangeDateInput } from '@/hooks/useRangeDateInput';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withRangepickerLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const {
      type,
      initialStartDate,
      initialFinishDate,
      minDate,
      maxDate,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country = 'BY',
      ...rest
    } = props as T;
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const {
      startDate,
      finishDate,
      errorMessage,
      onInputValue,
      setStartDate,
      setFinishDate,
    } = useRangeDate(initialStartDate, initialFinishDate);
    const { value, onClearInput, onChange } = useRangeDateInput(
      onInputValue,
      startDate,
      finishDate,
    );

    const toggleCalendar = () => {
      setIsOpenCalendar(!isOpenCalendar);
    };

    const dateContext = useMemo(
      () => ({
        startDate,
        finishDate,
        minDate,
        maxDate,
      }),
      [startDate, finishDate, minDate, maxDate],
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
      <RangeDateContext.Provider value={dateContext}>
        <WeekContext.Provider value={weekContext}>
          <WrappedComponent
            {...(rest as T)}
            isOpenCalendar={isOpenCalendar}
            errorMessage={errorMessage}
            toggleCalendar={toggleCalendar}
            type={type}
            setStartDate={setStartDate}
            setFinishDate={setFinishDate}
            value={value}
            onClearInput={onClearInput}
            onChange={onChange}
          />
        </WeekContext.Provider>
      </RangeDateContext.Provider>
    );
  };
