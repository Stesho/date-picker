import { isCheckedDate } from '@/utils/isCheckedDate';

export const isCheckedRangeCell = (
  year: number,
  month: number,
  startDate: Date | null,
  finishDate: Date | null,
  isCurrentMonth: boolean,
  dayNumber: number,
) => {
  const checkedDate = new Date(year, month, dayNumber);

  return (
    isCheckedDate(startDate, isCurrentMonth, checkedDate) ||
    isCheckedDate(finishDate, isCurrentMonth, checkedDate)
  );
};
