import React from 'react';

import { Calendar, CalendarProps } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { RangeDateInputProps } from '@/components/RangeDateInput/RangeDateInput';

type RangeDatepickerBodyProps = RangeDateInputProps &
  CalendarProps & {
    errorMessage: string;
    isOpenCalendar: boolean;
  };

export const RangeDatepickerBody = ({
  isOpenCalendar,
  errorMessage,
  toggleCalendar,
  type,
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  onSetCurrentDate,
  areWeekendsHidden,
  isCheckedCell,
  value,
  onClearInput,
  onChange,
}: RangeDatepickerBodyProps) => (
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
        onSetCurrentDate={onSetCurrentDate}
        areWeekendsHidden={areWeekendsHidden}
        isCheckedCell={isCheckedCell}
      />
    )}
  </>
);
