import { Holiday } from '@/types/Holiday';

interface HolidaysByDate {
  [K: string]: Holiday;
}

export const holidaysToHolidaysByDate = (holidays: Holiday[]) => {
  const holidaysByDate: HolidaysByDate = {};

  holidays.forEach((holiday) => {
    const [, month, day] = holiday.date.split('-');
    const date = `${month}-${day}`;

    holidaysByDate[date] = holiday;
  });

  return holidaysByDate;
};
