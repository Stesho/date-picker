import React, { ComponentType, useContext } from 'react';

import { CalendarContext } from '@/context/calendarContext';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';
import { shiftDaysToLeft } from '@/utils/shiftDaysToLeft';
import { shiftDaysToRight } from '@/utils/shiftDaysToRight';

export const withMondayStart = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { days, weekDays, ...rest } = props as T;
    const { year, month } = useContext(CalendarContext);

    const daysInPrevMoth = new Date(year, month, 0).getDate();

    const shiftDays = () => {
      if (days.length === 0) {
        return days;
      }

      return days[0].number === 1
        ? shiftDaysToRight(days, daysInPrevMoth)
        : shiftDaysToLeft(days);
    };

    return (
      <WrappedComponent
        {...(rest as T)}
        days={shiftDays()}
        weekDays={shiftArrayToLeft(weekDays, 1)}
      />
    );
  };
