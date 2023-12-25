import { Color } from '@/types/Color';

interface ElementColor {
  background: Color;
  border: Color;
  text: Color;
  placeholder: Color;
  hover: {
    background?: Color;
    border?: Color;
    text?: Color;
  };
}

export type ElementColorOptions = Partial<ElementColor>;

export interface CellsColors {
  week: ElementColorOptions;
  disabled: ElementColorOptions;
  common: ElementColorOptions;
  holiday: ElementColorOptions;
  currentDate: ElementColorOptions;
  startDate: ElementColorOptions;
  finishDate: ElementColorOptions;
  rangeDate: ElementColorOptions;
}

interface InputColorOptions extends ElementColor {
  crossButton: ElementColorOptions;
  error: ElementColorOptions;
}

interface CalendarColorOptions extends ElementColor {
  controllers: ElementColorOptions;
  cells: Partial<CellsColors>;
}

interface Elements {
  input: Partial<InputColorOptions>;
  calendar: Partial<CalendarColorOptions>;
}

export type ColorOptions = Partial<Elements>;
