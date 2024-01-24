import React, { useContext } from 'react';

import { Calendar, CalendarProps } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { ColorContext } from '@/context/colorContext';

import { DatepickerBodyWrapper, ErrorMessage } from './DatepickerBody.styled';

export type DatepickerBodyProps = CalendarProps & {
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
}: DatepickerBodyProps) => {
  const colors = useContext(ColorContext);

  return (
    <DatepickerBodyWrapper>
      <DateInput />
      {errorMessage.length > 0 && (
        <ErrorMessage $colors={colors.input?.error}>
          {errorMessage}
        </ErrorMessage>
      )}
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
    </DatepickerBodyWrapper>
  );
};
