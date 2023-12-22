import { DatepickerProps } from '@/components/Datepicker/Datepicker';
import { DatepickerBodyProps } from '@/components/DatepickerBody/DatepickerBody';
import { RangeDatepickerProps } from '@/components/RangeDatepicker/RangeDatepicker';
import { Day } from '@/types/Day';

export interface ConfigurableElementProps
  extends DatepickerProps,
    RangeDatepickerProps,
    DatepickerBodyProps {
  days: Day[];
  weekDays: string[];
}
