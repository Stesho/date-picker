import React, { ComponentType, useEffect } from 'react';

import { fetchHolidays } from '@/api/fetchHolidays';
import { CellsProps } from '@/components/Cells/Cells';
import { Day } from '@/types/Day';

interface WrappedComponentProps extends CellsProps {
  days: Day[];
  year: number;
  country: string;
  month: number;
  minDate?: Date;
  maxDate?: Date;
}

export const withHolidays = <T extends WrappedComponentProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const { days, year, country, ...rest } = props as T;

    useEffect(() => {
      fetchHolidays(country, year).then((holidays) => {
        console.log(holidays);
      });
    }, [country, year]);

    return (
      <WrappedComponent
        {...(rest as T)}
        days={days}
        year={year}
        country={country}
      />
    );
  };
