import React, { ComponentType } from 'react';

import { CellsProps } from '@/components/Cells/Cells';
import { Day } from '@/types/Day';
import { cutWeekends } from '@/utils/cutWeekends';

interface WrappedComponentProps extends CellsProps {
  days: Day[];
  weekDays: string[];
}

export const withHiddenWeekends = <T extends WrappedComponentProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const { days, weekDays, ...rest } = props as T;

    return (
      <WrappedComponent
        {...(rest as T)}
        days={cutWeekends(days)}
        weekDays={cutWeekends(weekDays)}
      />
    );
  };
