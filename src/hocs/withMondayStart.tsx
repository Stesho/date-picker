import React, { ComponentType } from 'react';

import { CellsProps } from '@/components/Cells/Cells';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';
import { shiftDaysToLeft } from '@/utils/shiftDaysToLeft';
import { shiftDaysToRight } from '@/utils/shiftDaysToRight';

interface WrappedComponentProps extends CellsProps {
  year: number;
  month: number;
  isStartWithMonday: boolean;
}

export const withMondayStart = <T extends WrappedComponentProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const { year, month, days, weekDays, ...rest } = props as T;
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
