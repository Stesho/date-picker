import { Day } from '@/types/Day';

interface CalculateDaysInMonthParams {
  year: number;
  month: number;
  minDate?: Date;
  maxDate?: Date;
}

export const DISPLAYED_DAYS_COUNT = 42;

const minLimitYear = 1970;
const maxLimitYear = 2099;
const minLimitMonth = 0;
const maxLimitMonth = 11;

export const calculateDaysInMonth = ({
  year,
  month,
  minDate,
  maxDate,
}: CalculateDaysInMonthParams): Day[] | null => {
  if (
    year < minLimitYear ||
    year > maxLimitYear ||
    month < minLimitMonth ||
    month > maxLimitMonth
  ) {
    return null;
  }

  const newDays: Day[] = [];
  const maxDays = new Date(year, month + 1, 0).getDate() + 1;
  const maxDaysInPrevMoth = new Date(year, month, 0).getDate() + 1;
  const firstDayInMonth = new Date(year, month, 1).getDay();
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

    let temp = false;
    if (i >= firstDayInMonth && i < lastDayInMonth) {
      temp = true;
    }

    if (minDate) {
      const currentDate = new Date(year, month, dayNumber);
      if (currentDate < minDate) {
        temp = false;
      }
    }

    if (maxDate) {
      const currentDate = new Date(year, month, dayNumber);
      if (currentDate > maxDate) {
        temp = false;
      }
    }

    newDays.push({
      number: dayNumber,
      isCurrentMoth: temp,
    });
  }

  return newDays;
};
