import { CalendarTypes } from '@/types/CalendarTypes';
import { ColorOptions } from '@/types/ColorOptions';

export interface DatepickerParams {
  type: CalendarTypes;
  minDate?: Date;
  maxDate?: Date;
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
  isHolidays: boolean;
  country: string;
  colorOptions: ColorOptions;
}
