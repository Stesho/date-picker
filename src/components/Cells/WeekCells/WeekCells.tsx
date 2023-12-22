import React, { useContext } from 'react';

import { ColorContext } from '@/context/colorContext';
import { WeekContext } from '@/context/weekContext';

import { WeekCell } from './WeekCells.styled';

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
          data-testid='weekCell'
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
