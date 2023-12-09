import React from 'react';

import {
  Controllers,
  ControllersProps,
} from '@/components/Controllers/Controllers';
import {
  RangeCells,
  RangeCellsProps,
} from '@/components/RangeCells/RangeCells';

type RangeCalendarBodyProps = RangeCellsProps & ControllersProps;

export const RangeCalendarBody = ({
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
}: RangeCalendarBodyProps) => (
  <>
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
  </>
);
