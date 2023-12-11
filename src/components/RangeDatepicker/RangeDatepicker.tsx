import React from 'react';

import { DatepickerBody } from '@/components/DatepickerBody/DatepickerBody';
import { withControllers } from '@/hocs/withControllers';
import { withDateLimits } from '@/hocs/withDateLimits';
import { withHiddenWeekends } from '@/hocs/withHiddenWeekends';
import { withHolidays } from '@/hocs/withHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';
import { withRangeCalendarLogic } from '@/hocs/withRangeCalendarLogic';
import { withRangepickerLogic } from '@/hocs/withRangepickerLogic';
import { configurationService } from '@/services/configurationService';
import { ResetStyles } from '@/styles/reset';
import { CalendarTypes } from '@/types/CalendarTypes';
import { DatepickerParams } from '@/types/DatepickerParams';

export interface RangeDatepickerProps extends DatepickerParams {
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
  const WithDatepickerWrapper = configurationService(DatepickerBody, {
    dateLimits: minDate || maxDate ? withDateLimits : null,
    holidays: isHolidays && country ? withHolidays : null,
    hiddenWeekends: areWeekendsHidden ? withHiddenWeekends : null,
    isStartWithMonday:
      !areWeekendsHidden && isStartWithMonday ? withMondayStart : null,
    controllers: withControllers,
    calendarLogic: withRangeCalendarLogic,
    pickerLogic: withRangepickerLogic,
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
