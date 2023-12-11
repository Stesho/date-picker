import { createContext, Dispatch, SetStateAction } from 'react';

export interface IDateContext {
  currentDate: Date | null;
  startDate: Date | null;
  finishDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  setCurrentDate: Dispatch<SetStateAction<Date | null>>;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setFinishDate: Dispatch<SetStateAction<Date | null>>;
}

export const DateContext = createContext<IDateContext>({
  currentDate: null,
  startDate: null,
  finishDate: null,
  minDate: undefined,
  maxDate: undefined,
  setCurrentDate: () => {},
  setStartDate: () => {},
  setFinishDate: () => {},
});
