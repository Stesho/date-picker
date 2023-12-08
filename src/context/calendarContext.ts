import { createContext } from 'react';

interface ICalendarContext {
  year: number;
  month: number;
  week: number;
  weeksInMonth: number;
}

export const CalendarContext = createContext<ICalendarContext>({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  week: 1,
  weeksInMonth: 5,
});
