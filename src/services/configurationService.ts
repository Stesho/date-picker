import { ComponentType } from 'react';

import { withDateLimits } from '@/hocs/withDateLimits';
import { withHiddenWeekends } from '@/hocs/withHiddenWeekends';
import { withHolidays } from '@/hocs/withHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

interface ConfigurationServiceProps<T extends ConfigurableElementProps> {
  element: ComponentType<T>;
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
  const daysWithDateLimits =
    minDate || maxDate ? withDateLimits(element) : element;
  const daysWithHolidays =
    isHolidays && country
      ? withHolidays(daysWithDateLimits)
      : daysWithDateLimits;

  if (areWeekendsHidden) {
    return withHiddenWeekends(daysWithHolidays);
  }

  if (isStartWithMonday) {
    return withMondayStart(daysWithHolidays);
  }

  return daysWithHolidays;
};
