import React from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput, DateInputProps } from '@/components/DateInput/DateInput';
import { withCalendarLogic } from '@/hocs/withCalendarLogic';
import { CalendarTypes } from '@/types/CalendarTypes';

interface DatepickerBodyProps extends DateInputProps {
  type: CalendarTypes;
  isOpenCalendar: boolean;
  setCurrentDate: (newDate: Date) => void;
}

const CalendarBodyWrapper = withCalendarLogic(Calendar);

export const DatepickerBody = ({
  currentDate,
  toggleCalendar,
  onInputValue,
  isError,
  isOpenCalendar,
  type,
  setCurrentDate,
}: DatepickerBodyProps) => (
  <>
    <DateInput
      currentDate={currentDate}
      toggleCalendar={toggleCalendar}
      onInputValue={onInputValue}
      isError={isError}
    />
    {isOpenCalendar && (
      <CalendarBodyWrapper type={type} setCurrentDate={setCurrentDate} />
    )}
  </>
);
