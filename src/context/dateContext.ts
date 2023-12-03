import { createContext } from 'react';

interface IDateContext {
  currentDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
}

export const DateContext = createContext<IDateContext>({
  currentDate: null,
  minDate: undefined,
  maxDate: undefined,
});
