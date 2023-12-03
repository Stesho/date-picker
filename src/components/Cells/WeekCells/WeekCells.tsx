import React from 'react';

import { WeekCell } from '@/components/Cells/WeekCells/WeekCells.styled';
import { WEEK_DAYS_NAMES } from '@/constants/weekDaysNames';
import { cutWeekends } from '@/utils/cutWeekends';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';

interface WeekCellsProps {
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
}

const WeekCells = ({
  isStartWithMonday,
  areWeekendsHidden,
}: WeekCellsProps) => {
  const weekDays = isStartWithMonday
    ? shiftArrayToLeft(WEEK_DAYS_NAMES, 1)
    : WEEK_DAYS_NAMES;

  const weekendCalculatedWeekDays = areWeekendsHidden
    ? cutWeekends(weekDays, isStartWithMonday)
    : weekDays;

  return (
    <>
      {weekendCalculatedWeekDays.map((weekDay) => (
        <WeekCell $areWeekendsHidden={areWeekendsHidden} key={weekDay}>
          {weekDay}
        </WeekCell>
      ))}
    </>
  );
};

export default WeekCells;
