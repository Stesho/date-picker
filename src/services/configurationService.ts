import { ComponentType } from 'react';

import { withControllers } from '@/hocs/withControllers';
import { withDateLimits } from '@/hocs/withDateLimits';
import { withHiddenWeekends } from '@/hocs/withHiddenWeekends';
import { withHolidays } from '@/hocs/withHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';
import { withRangeCalendarLogic } from '@/hocs/withRangeCalendarLogic';
import { withRangepickerLogic } from '@/hocs/withRangepickerLogic';
import { CalendarTypes } from '@/types/CalendarTypes';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

interface ConfigurationServiceProps<T extends ConfigurableElementProps> {
  element: ComponentType<T>;
  type: CalendarTypes;
  initialDate: Date | null;
  year?: number;
  isStartWithMonday?: boolean;
  areWeekendsHidden?: boolean;
  isHolidays?: boolean;
  minDate?: Date;
  maxDate?: Date;
  country?: string;
}

export const configurationService = <T extends ConfigurableElementProps>({
  element,
  isStartWithMonday,
  areWeekendsHidden,
  isHolidays,
  minDate,
  maxDate,
  country,
}: ConfigurationServiceProps<T>) => {
  const typedCalendar = withControllers(element);
  const daysWithDateLimits =
    minDate || maxDate ? withDateLimits(typedCalendar) : typedCalendar;

  const daysWithHolidays =
    isHolidays && country
      ? withHolidays(daysWithDateLimits)
      : daysWithDateLimits;

  if (areWeekendsHidden) {
    return withRangepickerLogic(
      withRangeCalendarLogic(withHiddenWeekends(daysWithHolidays)),
    );
  }

  if (isStartWithMonday) {
    return withRangepickerLogic(
      withRangeCalendarLogic(withMondayStart(daysWithHolidays)),
    );
  }

  return withRangepickerLogic(withRangeCalendarLogic(daysWithHolidays));
};
