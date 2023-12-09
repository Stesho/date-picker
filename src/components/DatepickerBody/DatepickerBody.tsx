import React from 'react';

import { Calendar, CalendarProps } from '@/components/Calendar/Calendar';
import { DateInput, DateInputProps } from '@/components/DateInput/DateInput';
import { CalendarTypes } from '@/types/CalendarTypes';

type DatepickerBodyProps = DateInputProps &
  CalendarProps & {
    type: CalendarTypes;
    isOpenCalendar: boolean;
  };

export const DatepickerBody = ({
  currentDate,
  toggleCalendar,
  onInputValue,
  isError,
  isOpenCalendar,
  type,
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  areWeekendsHidden,
  onSetCurrentDate,
}: DatepickerBodyProps) => (
  <>
    <DateInput
      currentDate={currentDate}
      toggleCalendar={toggleCalendar}
      onInputValue={onInputValue}
      isError={isError}
    />
    {isOpenCalendar && (
      <Calendar
        type={type}
        controllersCaption={controllersCaption}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        days={days}
        weekDays={weekDays}
        areWeekendsHidden={areWeekendsHidden}
        onSetCurrentDate={onSetCurrentDate}
      />
    )}
  </>
);
