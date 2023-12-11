import { CalendarTypes } from '@/types/CalendarTypes';

export interface DatepickerParams {
  type: CalendarTypes;
  minDate?: Date;
  maxDate?: Date;
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
  isHolidays: boolean;
  country: string;
}
