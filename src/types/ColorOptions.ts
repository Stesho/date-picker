import { Color } from '@/types/Color';

interface ElementColor {
  background: Color;
  border: Color;
  text: Color;
  hover: {
    background: Color;
    text: Color;
  };
}

export type ElementColorOptions = Partial<ElementColor>;

export interface CellsColors {
  week?: ElementColorOptions;
  disabled?: ElementColorOptions;
  common?: ElementColorOptions;
  currentDate?: ElementColorOptions;
  startDate?: ElementColorOptions;
  finishDate?: ElementColorOptions;
  rangeDate?: ElementColorOptions;
}

interface Elements {
  input: ElementColorOptions;
  calendar: {
    background?: Color;
    border?: Color;
    controllers?: ElementColorOptions;
    cells?: CellsColors;
  };
}

export type ColorOptions = Partial<Elements>;
