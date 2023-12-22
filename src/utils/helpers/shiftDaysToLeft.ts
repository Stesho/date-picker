import { Day } from '@/types/Day';
import { shiftArrayToLeft } from '@/utils/helpers/shiftArrayToLeft';

export const shiftDaysToLeft = (days: Day[]) => {
  const daysStartWithMonday = shiftArrayToLeft(days, 1);
  const beforeLastDayNumber =
    daysStartWithMonday[daysStartWithMonday.length - 2].number;

  daysStartWithMonday[daysStartWithMonday.length - 1].number =
    beforeLastDayNumber + 1;

  return daysStartWithMonday;
};
