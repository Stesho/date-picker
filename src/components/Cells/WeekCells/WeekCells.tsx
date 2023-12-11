import React, { useContext } from 'react';

import { WeekCell } from '@/components/Cells/WeekCells/WeekCells.styled';
import { ColorContext } from '@/context/colorContext';
import { WeekContext } from '@/context/weekContext';

export interface WeekCellsProps {
  weekDays: string[];
}

export const WeekCells = ({ weekDays }: WeekCellsProps) => {
  const colors = useContext(ColorContext);
  const { areWeekendsHidden } = useContext(WeekContext);

  return (
    <>
      {weekDays.map((weekDay) => (
        <WeekCell
          key={weekDay}
          $areWeekendsHidden={areWeekendsHidden}
          $colors={colors.calendar?.cells?.week}
        >
          {weekDay}
        </WeekCell>
      ))}
    </>
  );
};
