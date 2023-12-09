import React from 'react';

import { DatepickerBody } from '@/components/DatepickerBody/DatepickerBody';
import { configurationService } from '@/services/configurationService';
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
  const WithDatepickerWrapper = configurationService({
    element: DatepickerBody,
    isStartWithMonday,
    areWeekendsHidden,
    isHolidays,
    minDate,
    maxDate,
    country,
  });

  return (
    <div>
      <ResetStyles />
      <WithDatepickerWrapper
        type={type}
        initialDate={initialDate}
        minDate={minDate}
        maxDate={maxDate}
        isStartWithMonday={isStartWithMonday}
        areWeekendsHidden={areWeekendsHidden}
        isHolidays={isHolidays}
        country={country}
      />
    </div>
  );
};
