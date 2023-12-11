import React, { useContext } from 'react';

import { WeekCell } from '@/components/Cells/WeekCells/WeekCells.styled';
import { WeekContext } from '@/context/weekContext';

export interface WeekCellsProps {
  weekDays: string[];
}

export const WeekCells = ({ weekDays }: WeekCellsProps) => {
  const { areWeekendsHidden } = useContext(WeekContext);

  return (
    <>
      {weekDays.map((weekDay) => (
        <WeekCell $areWeekendsHidden={areWeekendsHidden} key={weekDay}>
          {weekDay}
        </WeekCell>
      ))}
    </>
  );
};
