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
  onSetFinishDate,
  onSetStartDate,
  areWeekendsHidden,
  isStartDateSelect,
  setIsStartDateSelect,
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
      onSetStartDate={onSetStartDate}
      onSetFinishDate={onSetFinishDate}
      areWeekendsHidden={areWeekendsHidden}
      isStartDateSelect={isStartDateSelect}
      setIsStartDateSelect={setIsStartDateSelect}
    />
  </CalendarWrapper>
);
