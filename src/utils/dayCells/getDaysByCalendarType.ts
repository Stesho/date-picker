import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';

export const getDaysByCalendarType = (
  type: CalendarTypes,
  days: Day[],
  week: number,
  areWeekendsHidden: boolean,
) => {
  const weekSize = areWeekendsHidden ? 5 : 7;
  const weekIndex = week - 1;
  return type === CalendarTypes.Month
    ? days
    : days.slice(weekIndex * weekSize, weekIndex * weekSize + weekSize);
};
