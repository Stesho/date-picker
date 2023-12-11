import React from 'react';

import { Calendar, CalendarProps } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';

type DatepickerBodyProps = CalendarProps & {
  errorMessage: string;
  isOpenCalendar: boolean;
};

export const DatepickerBody = ({
  errorMessage,
  isOpenCalendar,
  controllersCaption,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  onSetCurrentDate,
  isCheckedCell,
}: DatepickerBodyProps) => (
  <>
    <DateInput />
    {errorMessage.length > 0 && <span>{errorMessage}</span>}
    {isOpenCalendar && (
      <Calendar
        controllersCaption={controllersCaption}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        days={days}
        weekDays={weekDays}
        onSetCurrentDate={onSetCurrentDate}
        isCheckedCell={isCheckedCell}
      />
    )}
  </>
);
