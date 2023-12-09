import React from 'react';

import {
  RangeCalendar,
  RangeCalendarProps,
} from '@/components/RangeCalendar/RangeCalendar';
import {
  RangeDateInput,
  RangeDateInputProps,
} from '@/components/RangeDateInput/RangeDateInput';

type RangeDatepickerBodyProps = RangeDateInputProps &
  RangeCalendarProps & {
    errorMessage: string;
    isOpenCalendar: boolean;
  };

export const RangeDatepickerBody = ({
  isOpenCalendar,
  errorMessage,
  startDate,
  finishDate,
  toggleCalendar,
  onInputValue,
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
}: RangeDatepickerBodyProps) => (
  <>
    <RangeDateInput
      startDate={startDate}
      finishDate={finishDate}
      toggleCalendar={toggleCalendar}
      onInputValue={onInputValue}
      isError={errorMessage.length > 0}
    />
    {errorMessage.length > 0 && <span>{errorMessage}</span>}
    {isOpenCalendar && (
      <RangeCalendar
        type={type}
        controllersCaption={controllersCaption}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        days={days}
        weekDays={weekDays}
        onSetFinishDate={onSetFinishDate}
        onSetStartDate={onSetStartDate}
        areWeekendsHidden={areWeekendsHidden}
        isStartDateSelect={isStartDateSelect}
        setIsStartDateSelect={setIsStartDateSelect}
      />
    )}
  </>
);
