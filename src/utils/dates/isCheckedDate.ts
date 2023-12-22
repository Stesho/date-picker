import { isSameDates } from '@/utils/dates/isSameDates';

export const isCheckedDate = (
  date: Date | null,
  isCurrentMonth: boolean,
  checkedDate: Date | null,
) => !!date && isCurrentMonth && isSameDates(date, checkedDate);
