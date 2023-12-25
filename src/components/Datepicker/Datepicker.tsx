import React, {
  ComponentType,
  Dispatch,
  memo,
  SetStateAction,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { DatepickerBody } from '@/components/DatepickerBody/DatepickerBody';
import { emptyProps } from '@/constants/datepicker/emptyProps';
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
  currentDate: Date | null;
  setCurrentDate: Dispatch<SetStateAction<Date | null>>;
}

export const Datepicker = ({
  type = CalendarTypes.Month,
  currentDate,
  setCurrentDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
  areWeekendsHidden = false,
  isHolidays = false,
  country = 'BY',
  colorOptions,
}: DatepickerProps) => {
  const WithDatepickerWrapper = useMemo(
    () =>
      configurationService(DatepickerBody, {
        dateLimits: minDate || maxDate ? withDateLimits : null,
        holidays: isHolidays && country ? withHolidays : null,
        hiddenWeekends: areWeekendsHidden ? withHiddenWeekends : null,
        isStartWithMonday:
          !areWeekendsHidden && isStartWithMonday ? withMondayStart : null,
        controllers: withControllers,
        calendarLogic: withCalendarLogic,
        pickerLogic: withDatepickerLogic,
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
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
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
