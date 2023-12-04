import { Cells } from '@/components/Cells/Cells';
import { withDateLimits } from '@/hocs/withDateLimits';
import { withHiddenHolidays } from '@/hocs/withHiddenHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';

interface ConfigurationServiceProps {
  isStartWithMonday?: boolean;
  areWeekendsHidden?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const configurationService = ({
  isStartWithMonday,
  areWeekendsHidden,
  minDate,
  maxDate,
}: ConfigurationServiceProps) => {
  const daysWithDateLimits = minDate || maxDate ? withDateLimits(Cells) : Cells;

  if (areWeekendsHidden) {
    return withHiddenHolidays(daysWithDateLimits);
  }

  if (isStartWithMonday) {
    return withMondayStart(daysWithDateLimits);
  }

  return daysWithDateLimits;
};
