import { Cells } from '@/components/Cells/Cells';
import { withHiddenHolidays } from '@/hocs/withHiddenHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';

interface ConfigurationServiceProps {
  isStartWithMonday?: boolean;
  areWeekendsHidden?: boolean;
}

export const configurationService = ({
  isStartWithMonday,
  areWeekendsHidden,
}: ConfigurationServiceProps) => {
  if (areWeekendsHidden) {
    return withHiddenHolidays(Cells);
  }

  if (isStartWithMonday) {
    return withMondayStart(Cells);
  }

  return Cells;
};
