import React, { useContext } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells, CellsProps } from '@/components/Cells/Cells';
import {
  Controllers,
  ControllersProps,
} from '@/components/Controllers/Controllers';
import { ColorContext } from '@/context/colorContext';

export type CalendarProps = CellsProps & ControllersProps;

export const Calendar = ({
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  onSetCurrentDate,
  isCheckedCell,
}: CalendarProps) => {
  const colors = useContext(ColorContext);

  return (
    <CalendarWrapper
      $background={colors.calendar?.background}
      data-testid='calendar'
    >
      <Controllers
        controllersCaption={controllersCaption}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
      <Cells
        days={days}
        weekDays={weekDays}
        onSetCurrentDate={onSetCurrentDate}
        isCheckedCell={isCheckedCell}
      />
    </CalendarWrapper>
  );
};
