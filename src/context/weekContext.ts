import { createContext } from 'react';

import { CalendarTypes } from '@/types/CalendarTypes';

export interface IWeekContext {
  type: CalendarTypes;
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
  isHolidays: boolean;
  country: string;
}

export const WeekContext = createContext<IWeekContext>({
  type: CalendarTypes.Month,
  isStartWithMonday: false,
  areWeekendsHidden: false,
  isHolidays: false,
  country: 'BY',
});
