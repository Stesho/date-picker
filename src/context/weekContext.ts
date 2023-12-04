import { createContext } from 'react';

interface IWeekContext {
  isStartWithMonday?: boolean;
  areWeekendsHidden?: boolean;
}

export const WeekContext = createContext<IWeekContext>({
  isStartWithMonday: false,
  areWeekendsHidden: false,
});
