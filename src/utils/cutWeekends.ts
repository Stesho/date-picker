import { deleteEveryNthElement } from '@/utils/deleteEveryNthElement';

export const cutWeekends = <T>(days: T[], isStartWithMonday: boolean) => {
  const daysInWeek = 7;
  const noLastDayWeek = deleteEveryNthElement(days, daysInWeek, 7);

  if (isStartWithMonday) {
    return deleteEveryNthElement(noLastDayWeek, 6, 6);
  }

  return deleteEveryNthElement(noLastDayWeek, 6, 1);
};
