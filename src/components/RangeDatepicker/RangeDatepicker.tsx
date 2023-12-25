import React, { Dispatch, SetStateAction, useMemo } from 'react';

import { DatepickerBody } from '@/components/DatepickerBody/DatepickerBody';
import { emptyProps } from '@/constants/datepicker/emptyProps';
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
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  finishDate: Date | null;
  setFinishDate: Dispatch<SetStateAction<Date | null>>;
}

export const RangeDatepicker = ({
  type = CalendarTypes.Month,
  startDate,
  setStartDate,
  finishDate,
  setFinishDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
  areWeekendsHidden = false,
  isHolidays = false,
  country = 'BY',
  colorOptions = {},
}: RangeDatepickerProps) => {
  const WithDatepickerWrapper = useMemo(
    () =>
      configurationService(DatepickerBody, {
        dateLimits: minDate || maxDate ? withDateLimits : null,
        holidays: isHolidays && country ? withHolidays : null,
        hiddenWeekends: areWeekendsHidden ? withHiddenWeekends : null,
        isStartWithMonday:
          !areWeekendsHidden && isStartWithMonday ? withMondayStart : null,
        controllers: withControllers,
        calendarLogic: withRangeCalendarLogic,
        pickerLogic: withRangepickerLogic,
      }),
    [
      areWeekendsHidden,
      minDate,
      maxDate,
      country,
      isStartWithMonday,
      isHolidays,
    ],
  );

  return (
    <div>
      <ResetStyles />
      <WithDatepickerWrapper
        {...emptyProps}
        type={type}
        startDate={startDate}
        setStartDate={setStartDate}
        finishDate={finishDate}
        setFinishDate={setFinishDate}
        minDate={minDate}
        maxDate={maxDate}
        isStartWithMonday={isStartWithMonday}
        areWeekendsHidden={areWeekendsHidden}
        isHolidays={isHolidays}
        country={country}
        colorOptions={colorOptions}
      />
    </div>
  );
};
