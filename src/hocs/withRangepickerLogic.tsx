import React, { ComponentType, useMemo } from 'react';

import { ColorContext } from '@/context/colorContext';
import { DateContext } from '@/context/dateContext';
import { InputContext } from '@/context/inputContext';
import { WeekContext } from '@/context/weekContext';
import { useCalendarToggle } from '@/hooks/useCalendarToggle';
import { useRangeDate } from '@/hooks/useRangeDate';
import { useRangeDateInput } from '@/hooks/useRangeDateInput';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withRangepickerLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
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
      colorOptions,
      ...rest
    } = props as T;

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
    const { isOpenCalendar, toggleCalendar } = useCalendarToggle();

    const dateContext = useMemo(
      () => ({
        currentDate: null,
        startDate,
        finishDate,
        minDate,
        maxDate,
        setCurrentDate: () => {},
        setStartDate,
        setFinishDate,
      }),
      [startDate, finishDate, minDate, maxDate, setStartDate, setFinishDate],
    );

    const weekContext = useMemo(
      () => ({
        type,
        isStartWithMonday,
        areWeekendsHidden,
        isHolidays,
        country,
      }),
      [type, isStartWithMonday, areWeekendsHidden, isHolidays, country],
    );

    const inputContext = useMemo(
      () => ({
        value,
        onClearInput,
        onChange,
        toggleCalendar,
        isError: errorMessage.length > 0,
      }),
      [value, onClearInput, onChange, toggleCalendar, errorMessage.length],
    );

    return (
      <DateContext.Provider value={dateContext}>
        <WeekContext.Provider value={weekContext}>
          <InputContext.Provider value={inputContext}>
            <ColorContext.Provider value={colorOptions}>
              <WrappedComponent
                {...(rest as T)}
                isOpenCalendar={isOpenCalendar}
                errorMessage={errorMessage}
              />
            </ColorContext.Provider>
          </InputContext.Provider>
        </WeekContext.Provider>
      </DateContext.Provider>
    );
  };
