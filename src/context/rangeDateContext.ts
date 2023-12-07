import { createContext } from 'react';

interface IRangeDateContext {
  startDate: Date | null;
  finishDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
}

export const RangeDateContext = createContext<IRangeDateContext>({
  startDate: null,
  finishDate: null,
  minDate: undefined,
  maxDate: undefined,
});
