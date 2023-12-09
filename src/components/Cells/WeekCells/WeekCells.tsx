import React from 'react';

import { WeekCell } from '@/components/Cells/WeekCells/WeekCells.styled';

interface WeekCellsProps {
  weekDays: string[];
  areWeekendsHidden: boolean;
}

export const WeekCells = ({ weekDays, areWeekendsHidden }: WeekCellsProps) => (
  <>
    {weekDays.map((weekDay) => (
      <WeekCell $areWeekendsHidden={areWeekendsHidden} key={weekDay}>
        {weekDay}
      </WeekCell>
    ))}
  </>
);
