import React from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import {
  Controllers,
  ControllersProps,
} from '@/components/Controllers/Controllers';
import {
  RangeCells,
  RangeCellsProps,
} from '@/components/RangeCells/RangeCells';

export type RangeCalendarProps = RangeCellsProps & ControllersProps;

export const RangeCalendar = ({
  type,
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  onSetCurrentDate,
  areWeekendsHidden,
}: RangeCalendarProps) => (
  <CalendarWrapper>
    <Controllers
      controllersCaption={controllersCaption}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
    />
    <RangeCells
      type={type}
      days={days}
      weekDays={weekDays}
      onSetCurrentDate={onSetCurrentDate}
      areWeekendsHidden={areWeekendsHidden}
    />
  </CalendarWrapper>
);
