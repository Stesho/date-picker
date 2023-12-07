import { createContext } from 'react';

interface IWeekContext {
  isStartWithMonday?: boolean;
  areWeekendsHidden?: boolean;
  isHolidays?: boolean;
  country: string;
}

export const WeekContext = createContext<IWeekContext>({
  isStartWithMonday: false,
  areWeekendsHidden: false,
  isHolidays: false,
  country: 'BY',
});
