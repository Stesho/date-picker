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
  toggleCalendar,
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
  isCheckedCell,
  value,
  onClearInput,
  onChange,
}: DatepickerBodyProps) => (
  <>
    <DateInput
      value={value}
      onClearInput={onClearInput}
      onChange={onChange}
      toggleCalendar={toggleCalendar}
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
        isCheckedCell={isCheckedCell}
      />
    )}
  </>
);
