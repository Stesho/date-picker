import React, { ComponentType } from 'react';

import { CellsProps } from '@/components/Cells/Cells';
import { Day } from '@/types/Day';
import { setDatesLimits } from '@/utils/setDatesLimits';

interface WrappedComponentProps extends CellsProps {
  year: number;
  month: number;
  days: Day[];
  minDate?: Date;
  maxDate?: Date;
}

export const withDateLimits = <T extends WrappedComponentProps>(
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
