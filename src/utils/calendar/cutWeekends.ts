import { deleteEveryNthElement } from '@/utils/helpers/deleteEveryNthElement';

export const cutWeekends = <T>(days: T[]) => {
  const daysInWeek = 7;
  const noLastDayWeek = deleteEveryNthElement(days, daysInWeek, 7);

  return deleteEveryNthElement(noLastDayWeek, 6, 1);
};
