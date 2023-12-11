import React from 'react';

import { DatepickerBody } from '@/components/DatepickerBody/DatepickerBody';
import { withCalendarLogic } from '@/hocs/withCalendarLogic';
import { withControllers } from '@/hocs/withControllers';
import { withDateLimits } from '@/hocs/withDateLimits';
import { withDatepickerLogic } from '@/hocs/withDatepickerLogic';
import { withHiddenWeekends } from '@/hocs/withHiddenWeekends';
import { withHolidays } from '@/hocs/withHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';
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
  const WithDatepickerWrapper = configurationService(DatepickerBody, {
    dateLimits: minDate || maxDate ? withDateLimits : null,
    holidays: isHolidays && country ? withHolidays : null,
    hiddenWeekends: areWeekendsHidden ? withHiddenWeekends : null,
    isStartWithMonday:
      !areWeekendsHidden && isStartWithMonday ? withMondayStart : null,
    controllers: withControllers,
    calendarLogic: withCalendarLogic,
    pickerLogic: withDatepickerLogic,
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
