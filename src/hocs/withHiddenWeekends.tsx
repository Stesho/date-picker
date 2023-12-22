import React, { ComponentType } from 'react';

import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { cutWeekends } from '@/utils/calendar/cutWeekends';

export const withHiddenWeekends = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { days, weekDays, ...rest } = props as T;

    return (
      <WrappedComponent
        {...(rest as T)}
        days={cutWeekends(days)}
        weekDays={cutWeekends(weekDays)}
      />
    );
  };
