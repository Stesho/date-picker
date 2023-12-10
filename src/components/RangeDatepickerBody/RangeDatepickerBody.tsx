import React from 'react';

import { Calendar, CalendarProps } from '@/components/Calendar/Calendar';
import {
  RangeDateInput,
  RangeDateInputProps,
} from '@/components/RangeDateInput/RangeDateInput';

type RangeDatepickerBodyProps = RangeDateInputProps &
  CalendarProps & {
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
  onSetCurrentDate,
  areWeekendsHidden,
  isCheckedCell,
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
      <Calendar
        type={type}
        controllersCaption={controllersCaption}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        days={days}
        weekDays={weekDays}
        onSetCurrentDate={onSetCurrentDate}
        areWeekendsHidden={areWeekendsHidden}
        isCheckedCell={isCheckedCell}
      />
    )}
  </>
);
