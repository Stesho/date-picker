import { Day } from '@/types/Day';

export interface ConfigurableElementProps {
  days: Day[];
  weekDays: string[];
  areWeekendsHidden: boolean;
  // ===================
  // onSetCurrentDate: (date: Date) => void;
  // onSetStartDate: (date: Date) => void;
  // onSetFinishDate: (date: Date) => void;
  // isStartDateSelect: boolean;
  // setIsStartDateSelect: (isStartDateSelect: boolean) => void;
  // year: number;
  // month: number;
  // minDate?: Date;
  // maxDate?: Date;
  // country: string;
}
