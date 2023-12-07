import React, { ComponentType } from 'react';

import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { setDatesLimits } from '@/utils/setDatesLimits';

export const withDateLimits = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const { year, month, days, minDate, maxDate, ...rest } = props as T;

    return (
      <WrappedComponent
        {...(rest as T)}
        days={setDatesLimits({
          year,
          month,
          days,
          minDate,
          maxDate,
        })}
      />
    );
  };
