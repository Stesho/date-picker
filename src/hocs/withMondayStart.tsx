import React, { ComponentType } from 'react';

import { CellsProps } from '@/components/Cells/Cells';
import { Day } from '@/types/Day';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';
import { shiftArrayToRight } from '@/utils/shiftArrayToRight';

interface WrappedComponentProps extends CellsProps {
  year: number;
  month: number;
}

const shiftDaysToLeft = (days: Day[]) => {
  const daysStartWithMonday = shiftArrayToLeft(days, 1);
  const beforeLastDayNumber =
    daysStartWithMonday[daysStartWithMonday.length - 2].number;
  daysStartWithMonday[daysStartWithMonday.length - 1].number =
    beforeLastDayNumber + 1;

  return daysStartWithMonday;
};

const shiftDaysToRight = (days: Day[], daysInPrevMonth: number) => {
  const shiftCount = 6;
  const daysStartWithMonday = shiftArrayToRight(days, shiftCount);

  let dayNum = daysInPrevMonth - shiftCount + 1;
  for (let i = 0; i < shiftCount; i++) {
    daysStartWithMonday[i].number = dayNum;
    dayNum++;
  }

  return daysStartWithMonday;
};

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
