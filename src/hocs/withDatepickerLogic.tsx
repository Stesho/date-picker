import React, { ComponentType, useMemo } from 'react';

import { ColorContext } from '@/context/colorContext';
import { DateContext } from '@/context/dateContext';
import { InputContext } from '@/context/inputContext';
import { WeekContext } from '@/context/weekContext';
import { useCalendarToggle } from '@/hooks/useCalendarToggle';
import { useDateInput } from '@/hooks/useDateInput';
import { useDates } from '@/hooks/useDates';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withDatepickerLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const {
      type,
      initialDate,
      minDate,
      maxDate,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country = 'BY',
      colorOptions,
      ...rest
    } = props as T;

    const { currentDate, errorMessage, onInputValue, setCurrentDate } =
      useDates(initialDate);
    const { value, onClearInput, onChange } = useDateInput(
      onInputValue,
      currentDate,
    );
    const { isOpenCalendar, toggleCalendar } = useCalendarToggle();

    const dateContext = useMemo(
      () => ({
        currentDate,
        startDate: null,
        finishDate: null,
        minDate,
        maxDate,
        setCurrentDate,
        setStartDate: () => {},
        setFinishDate: () => {},
      }),
      [currentDate, minDate, maxDate, setCurrentDate],
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
                errorMessage={errorMessage}
                isOpenCalendar={isOpenCalendar}
              />
            </ColorContext.Provider>
          </InputContext.Provider>
        </WeekContext.Provider>
      </DateContext.Provider>
    );
  };
