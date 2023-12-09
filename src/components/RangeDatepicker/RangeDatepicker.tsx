import React from 'react';

import { RangeDatepickerBody } from '@/components/RangeDatepickerBody/RangeDatepickerBody';
import { configurationService } from '@/services/configurationService';
import { ResetStyles } from '@/styles/reset';
import { CalendarTypes } from '@/types/CalendarTypes';
import { DatepickerParams } from '@/types/DatepickerParams';

interface RangeDatepickerProps extends DatepickerParams {
  initialStartDate?: Date;
  initialFinishDate?: Date;
}

export const RangeDatepicker = ({
  type = CalendarTypes.Month,
  initialStartDate,
  initialFinishDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
  areWeekendsHidden = false,
  isHolidays = false,
  country = 'BY',
}: RangeDatepickerProps) => {
  const WithDatepickerWrapper = configurationService({
    element: RangeDatepickerBody,
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
        initialStartDate={initialStartDate}
        initialFinishDate={initialFinishDate}
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
