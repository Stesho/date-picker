import React, { ComponentType } from 'react';

import { ColorContext } from '@/context/colorContext';
import { DateContext } from '@/context/dateContext';
import { InputContext } from '@/context/inputContext';
import { WeekContext } from '@/context/weekContext';
import { useCalendarToggle } from '@/hooks/useCalendarToggle';
import { useDateContext } from '@/hooks/useDateContext';
import { useDateInput } from '@/hooks/useDateInput';
import { useDates } from '@/hooks/useDates';
import { useInputContext } from '@/hooks/useInputContext';
import { useWeekContext } from '@/hooks/useWeekContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withDatepickerLogic =
  <T extends ConfigurableElementProps>(WrappedComponent: ComponentType<T>) =>
  (props: Omit<T, keyof ConfigurableElementProps>) => {
    const {
      type = CalendarTypes.Month,
      currentDate,
      setCurrentDate,
      minDate,
      maxDate,
      isStartWithMonday = false,
      areWeekendsHidden = false,
      isHolidays = false,
      country = 'BY',
      colorOptions = {},
      ...rest
    } = props as T;

    const { errorMessage, onInputValue, setErrorMessage } = useDates(
      currentDate,
      setCurrentDate,
      minDate,
      maxDate,
    );
    const { value, onClearInput, onChange } = useDateInput(
      setErrorMessage,
      onInputValue,
      currentDate,
    );
    const { isOpenCalendar, toggleCalendar } = useCalendarToggle();

    const dateContext = useDateContext({
      currentDate,
      startDate: null,
      finishDate: null,
      minDate,
      maxDate,
      setCurrentDate,
      setStartDate: () => {},
      setFinishDate: () => {},
    });

    const weekContext = useWeekContext({
      type,
      isStartWithMonday,
      areWeekendsHidden,
      isHolidays,
      country,
    });

    const inputContext = useInputContext({
      value,
      onClearInput,
      onChange,
      toggleCalendar,
      isError: errorMessage.length > 0,
    });

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
