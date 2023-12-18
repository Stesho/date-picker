import { Holiday } from '@/types/Holiday';

interface HolidaysByDate {
  [K: string]: Holiday;
}

export const holidaysToHolidaysByDate = (holidays: Holiday[]) => {
  const holidaysByDate: HolidaysByDate = {};

  holidays.forEach((holiday) => {
    holidaysByDate[holiday.date] = holiday;
  });

  return holidaysByDate;
};
