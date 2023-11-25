import { Day } from '@/types/Day';

export const DISPLAYED_DAYS_COUNT = 42;

const minYear = 1970;
const maxYear = 2099;
const minMonth = 0;
const maxMonth = 11;
const firstWeekDay = 0;
const lastWeekDay = 6;

const getFirstDayInMonth = (
  firstDayInMonth: number,
  isStartWithMonday: boolean,
): number => {
  if (isStartWithMonday && firstDayInMonth === firstWeekDay) {
    return lastWeekDay;
  }

  return firstDayInMonth - (isStartWithMonday ? 1 : 0);
};

export const calculateDaysInMonth = (
  year: number,
  month: number,
  isStartWithMonday = false,
): Day[] | null => {
  if (
    year < minYear ||
    year > maxYear ||
    month < minMonth ||
    month > maxMonth
  ) {
    return null;
  }

  const newDays: Day[] = [];
  const maxDays = new Date(year, month + 1, 0).getDate() + 1;
  const maxDaysInPrevMoth = new Date(year, month, 0).getDate() + 1;
  const firstDayInMonthOffset = new Date(year, month, 1).getDay();
  const firstDayInMonth = getFirstDayInMonth(
    firstDayInMonthOffset,
    isStartWithMonday,
  );
  const lastDayInMonth = firstDayInMonth + maxDays - 1;
  let isCurrentMonth = false;

  for (
    let i = 0, dayNumber = maxDaysInPrevMoth - firstDayInMonth;
    i < DISPLAYED_DAYS_COUNT;
    i++, dayNumber++
  ) {
    if (dayNumber === maxDaysInPrevMoth && !isCurrentMonth) {
      dayNumber = 1;
      isCurrentMonth = true;
    }

    if (dayNumber === maxDays && isCurrentMonth) {
      dayNumber = 1;
    }

    newDays.push({
      number: dayNumber,
      isCurrentMoth: i >= firstDayInMonth && i < lastDayInMonth,
    });
  }

  return newDays;
};
