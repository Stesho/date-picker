import React from 'react';

import { WeekCell } from '@/components/Cells/WeekCells/WeekCells.styled';
import { cutWeekends } from '@/utils/cutWeekends';

interface WeekCellsProps {
  weekDays: string[];
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
}

const WeekCells = ({
  weekDays,
  isStartWithMonday,
  areWeekendsHidden,
}: WeekCellsProps) => {
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
