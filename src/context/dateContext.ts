import { createContext } from 'react';

interface IDateContext {
  year: number;
  month: number;
  currentDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
}

export const DateContext = createContext<IDateContext>({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  currentDate: null,
  minDate: undefined,
  maxDate: undefined,
});
