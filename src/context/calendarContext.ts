import { createContext } from 'react';

interface ICalendarContext {
  year: number;
  month: number;
}

export const CalendarContext = createContext<ICalendarContext>({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
});
