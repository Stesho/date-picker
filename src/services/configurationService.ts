import { Cells } from '@/components/Cells/Cells';
import { withDateLimits } from '@/hocs/withDateLimits';
import { withHiddenWeekends } from '@/hocs/withHiddenWeekends';
import { withHolidays } from '@/hocs/withHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';

interface ConfigurationServiceProps {
  year?: number;
  isStartWithMonday?: boolean;
  areWeekendsHidden?: boolean;
  isHolidays?: boolean;
  minDate?: Date;
  maxDate?: Date;
  country?: string;
}

export const configurationService = ({
  isStartWithMonday,
  areWeekendsHidden,
  isHolidays,
  minDate,
  maxDate,
  country,
}: ConfigurationServiceProps) => {
  const daysWithDateLimits = minDate || maxDate ? withDateLimits(Cells) : Cells;
  // console.log(withHolidays, isHolidays, country);
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
