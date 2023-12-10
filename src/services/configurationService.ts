import { ComponentType } from 'react';

import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

type HocType1<T> = (
  WrappedComponent: ComponentType<T>,
) => (props: Omit<T, keyof ConfigurableElementProps>) => JSX.Element;
type HocType2<T> = (
  WrappedComponent: ComponentType<T>,
) => (props: T) => JSX.Element;

type HocTypes<T> = HocType1<T> | HocType2<T>;

type HocMapKeys =
  | 'dateLimits'
  | 'holidays'
  | 'hiddenWeekends'
  | 'isStartWithMonday'
  | 'controllers'
  | 'calendarLogic'
  | 'pickerLogic';

type HocMap<T> = {
  [K in HocMapKeys]: HocTypes<T> | null;
};

export const configurationService = <T extends ConfigurableElementProps>(
  component: ComponentType<T>,
  hocMap: HocMap<T>,
) => {
  let enhancedElement = component;

  (Object.keys(hocMap) as (keyof HocMap<T>)[]).forEach((hoc) => {
    if (hocMap[hoc]) {
      enhancedElement = hocMap[hoc]!(enhancedElement);
    }
  });

  return enhancedElement;
};
