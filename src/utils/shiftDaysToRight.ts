import { Day } from '@/types/Day';
import { shiftArrayToRight } from '@/utils/shiftArrayToRight';

export const shiftDaysToRight = (days: Day[], daysInPrevMonth: number) => {
  const shiftCount = 6;
  const daysStartWithMonday = shiftArrayToRight(days, shiftCount);

  let dayNum = daysInPrevMonth - shiftCount + 1;
  for (let i = 0; i < shiftCount; i++) {
    daysStartWithMonday[i].number = dayNum;
    dayNum++;
  }

  return daysStartWithMonday;
};
