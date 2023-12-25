import React, { ComponentType } from 'react';

import { ColorContext } from '@/context/colorContext';
import { DateContext } from '@/context/dateContext';
import { InputContext } from '@/context/inputContext';
import { WeekContext } from '@/context/weekContext';
import { useCalendarToggle } from '@/hooks/useCalendarToggle';
import { useDateContext } from '@/hooks/useDateContext';
import { useInputContext } from '@/hooks/useInputContext';
import { useRangeDateInput } from '@/hooks/useRangeDateInput';
import { useRangeDates } from '@/hooks/useRangeDates';
import { useWeekContext } from '@/hooks/useWeekContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withRangepickerLogic =
  <T extends ConfigurableElementProps>(WrappedComponent: ComponentType<T>) =>
  (props: Omit<T, keyof ConfigurableElementProps>) => {
    const {
      type = CalendarTypes.Month,
      startDate,
      finishDate,
      setStartDate,
      setFinishDate,
      minDate,
      maxDate,
      isStartWithMonday = false,
      areWeekendsHidden = false,
      isHolidays = false,
      country = 'BY',
      colorOptions = {},
      ...rest
    } = props as T;

    const { errorMessage, onInputValue, setErrorMessage } = useRangeDates(
      startDate,
      finishDate,
      setStartDate,
      setFinishDate,
      minDate,
      maxDate,
    );
    const { value, onClearInput, onChange } = useRangeDateInput(
      setErrorMessage,
      onInputValue,
      startDate,
      finishDate,
    );
    const { isOpenCalendar, toggleCalendar } = useCalendarToggle();

    const dateContext = useDateContext({
      currentDate: null,
      startDate,
      finishDate,
      minDate,
      maxDate,
      setCurrentDate: () => {},
      setStartDate,
      setFinishDate,
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
                isOpenCalendar={isOpenCalendar}
                errorMessage={errorMessage}
              />
            </ColorContext.Provider>
          </InputContext.Provider>
        </WeekContext.Provider>
      </DateContext.Provider>
    );
  };
