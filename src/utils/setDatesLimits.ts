import { Day } from '@/types/Day';

interface SetDatesLimitsProps {
  year: number;
  month: number;
  days: Day[];
  minDate?: Date;
  maxDate?: Date;
}

export const setDatesLimits = ({
  year,
  month,
  days,
  minDate,
  maxDate,
}: SetDatesLimitsProps) => {
  const len = days.length;
  const newDays = [...days];

  for (let i = 0; i < len; i++) {
    const date = new Date(year, month, days[i].number);

    if ((minDate && date < minDate) || (maxDate && date > maxDate)) {
      newDays[i].isCurrentMoth = false;
    }
  }

  return newDays;
};
