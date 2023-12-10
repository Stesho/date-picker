import React from 'react';

import { Calendar, CalendarProps } from '@/components/Calendar/Calendar';
import { DateInput, DateInputProps } from '@/components/DateInput/DateInput';

type DatepickerBodyProps = DateInputProps &
  CalendarProps & {
    errorMessage: string;
    isOpenCalendar: boolean;
  };

export const DatepickerBody = ({
  toggleCalendar,
  errorMessage,
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
        areWeekendsHidden={areWeekendsHidden}
        onSetCurrentDate={onSetCurrentDate}
        isCheckedCell={isCheckedCell}
      />
    )}
  </>
);
