import React from 'react';

import { DatepickerBody } from '@/components/DatepickerBody/DatepickerBody';
import { withDatepickerLogic } from '@/hocs/withDatepickerLogic';
import { ResetStyles } from '@/styles/reset';
import { CalendarTypes } from '@/types/CalendarTypes';
import { DatepickerParams } from '@/types/DatepickerParams';

export interface DatepickerProps extends DatepickerParams {
  initialDate?: Date;
}

export const Datepicker = ({
  type = CalendarTypes.Month,
  initialDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
  areWeekendsHidden = false,
  isHolidays = false,
  country = 'BY',
}: DatepickerProps) => {
  const WithDatepickerWrapper = withDatepickerLogic(DatepickerBody, {
    type,
    initialDate,
    minDate,
    maxDate,
    isStartWithMonday,
    areWeekendsHidden,
    isHolidays,
    country,
  });

  return (
    <div>
      <ResetStyles />
      <WithDatepickerWrapper />
    </div>
  );
};
