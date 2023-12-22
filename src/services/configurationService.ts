import { ComponentType } from 'react';

import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

type HocType = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) => (props: Omit<T, keyof ConfigurableElementProps>) => JSX.Element;

type HocMapKeys =
  | 'dateLimits'
  | 'holidays'
  | 'hiddenWeekends'
  | 'isStartWithMonday'
  | 'controllers'
  | 'calendarLogic'
  | 'pickerLogic';

type HocMap = {
  [K in HocMapKeys]: HocType | null;
};

export const configurationService = <T extends ConfigurableElementProps>(
  component: ComponentType<T>,
  hocMap: HocMap,
) => {
  let enhancedElement = component;

  (Object.keys(hocMap) as (keyof HocMap)[]).forEach((hoc) => {
    if (hocMap[hoc]) {
      enhancedElement = hocMap[hoc]!(enhancedElement);
    }
  });

  return enhancedElement;
};
