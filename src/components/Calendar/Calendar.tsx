import React from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells, CellsProps } from '@/components/Cells/Cells';
import {
  Controllers,
  ControllersProps,
} from '@/components/Controllers/Controllers';

export type CalendarProps = CellsProps & ControllersProps;

export const Calendar = ({
  type,
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  onSetCurrentDate,
  areWeekendsHidden,
  isCheckedCell,
}: CalendarProps) => (
  <CalendarWrapper>
    <Controllers
      controllersCaption={controllersCaption}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
    />
    <Cells
      type={type}
      days={days}
      weekDays={weekDays}
      areWeekendsHidden={areWeekendsHidden}
      onSetCurrentDate={onSetCurrentDate}
      isCheckedCell={isCheckedCell}
    />
  </CalendarWrapper>
);
