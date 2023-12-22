import React, { ComponentType, useContext } from 'react';

import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { setDatesLimits } from '@/utils/dates/setDatesLimits';

export const withDateLimits = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { days, ...rest } = props as T;
    const { minDate, maxDate } = useContext(DateContext);
    const { year, month } = useContext(CalendarContext);

    return (
      <WrappedComponent
        {...(rest as T)}
        days={setDatesLimits({
          year,
          month,
          days,
          minDate,
          maxDate,
        })}
      />
    );
  };
