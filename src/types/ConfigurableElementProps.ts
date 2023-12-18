import { DatepickerProps } from '@/components/Datepicker/Datepicker';
import { RangeDatepickerProps } from '@/components/RangeDatepicker/RangeDatepicker';
import { Day } from '@/types/Day';

export interface ConfigurableElementProps
  extends DatepickerProps,
    RangeDatepickerProps {
  days: Day[];
  weekDays: string[];
}
