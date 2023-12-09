import { ComponentType } from 'react';

import { withCalendarLogic } from '@/hocs/withCalendarLogic';
import { withControllers } from '@/hocs/withControllers';
import { withDateLimits } from '@/hocs/withDateLimits';
import { withDatepickerLogic } from '@/hocs/withDatepickerLogic';
import { withHiddenWeekends } from '@/hocs/withHiddenWeekends';
import { withHolidays } from '@/hocs/withHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';
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
    return withDatepickerLogic(
      withCalendarLogic(withHiddenWeekends(daysWithHolidays)),
    );
  }

  if (isStartWithMonday) {
    return withDatepickerLogic(
      withCalendarLogic(withMondayStart(daysWithHolidays)),
    );
  }

  return withDatepickerLogic(withCalendarLogic(daysWithHolidays));
};
