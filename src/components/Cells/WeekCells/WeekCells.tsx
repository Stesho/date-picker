import React from 'react';

import { WeekCell } from '@/components/Cells/WeekCells/WeekCells.styled';
import { WEEK_DAYS_NAMES } from '@/constants/weekDaysNames';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';

interface WeekCellsProps {
  isStartWithMonday: boolean;
}

const WeekCells = ({ isStartWithMonday }: WeekCellsProps) => {
  const weekDays = isStartWithMonday
    ? shiftArrayToLeft(WEEK_DAYS_NAMES, 1)
    : WEEK_DAYS_NAMES;

  return (
    <>
      {weekDays.map((weekDay) => (
        <WeekCell key={weekDay}>{weekDay}</WeekCell>
      ))}
    </>
  );
};

export default WeekCells;
