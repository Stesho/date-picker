import { createContext, Dispatch, SetStateAction } from 'react';

export interface ICalendarContext {
  year: number;
  month: number;
  week: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setWeek: Dispatch<SetStateAction<number>>;
}

export const CalendarContext = createContext<ICalendarContext>({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  week: 1,
  setYear: () => {},
  setMonth: () => {},
  setWeek: () => {},
});
