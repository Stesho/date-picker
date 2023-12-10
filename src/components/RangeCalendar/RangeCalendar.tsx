import React from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells, CellsProps } from '@/components/Cells/Cells';
import {
  Controllers,
  ControllersProps,
} from '@/components/Controllers/Controllers';

export type RangeCalendarProps = CellsProps & ControllersProps;

export const RangeCalendar = ({
  type,
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  onSetCurrentDate,
  areWeekendsHidden,
  isCheckedCell,
}: RangeCalendarProps) => (
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
      onSetCurrentDate={onSetCurrentDate}
      areWeekendsHidden={areWeekendsHidden}
      isCheckedCell={isCheckedCell}
    />
  </CalendarWrapper>
);
