import React, { ComponentType, useEffect, useState } from 'react';

import { fetchHolidays } from '@/api/fetchHolidays';
import { CellsProps } from '@/components/Cells/Cells';
import { HOLIDAYS_STORAGE_KEY } from '@/constants/holidays/storage';
import { Day } from '@/types/Day';
import { Holiday } from '@/types/Holiday';
import { holidaysToHolidaysByDate } from '@/utils/setHolidays';

interface WrappedComponentProps extends CellsProps {
  days: Day[];
  year: number;
  month: number;
  country: string;
  minDate?: Date;
  maxDate?: Date;
}

interface HolidaysByDate {
  [K: string]: Holiday;
}

const addHolidaysToDays = (
  days: Day[],
  year: number,
  month: number,
  holidaysByDate: HolidaysByDate,
) =>
  days.map((day) => {
    const date = new Date(year, month, day.number - 1)
      .toISOString()
      .split('T')[0];

    if (day.isCurrentMoth && holidaysByDate[date]) {
      return {
        ...day,
        isHoliday: true,
      };
    }

    return {
      ...day,
      isHoliday: false,
    };
  });

export const withHolidays = <T extends WrappedComponentProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: T) {
    const { days, year, month, country, ...rest } = props as T;
    const [daysWithHolidays, setDaysWithHolidays] = useState<Day[]>([]);

    useEffect(() => {
      const holidays = localStorage.getItem(HOLIDAYS_STORAGE_KEY);

      if (!holidays) {
        fetchHolidays(country, year).then((holidaysData) => {
          const holidaysByDate = holidaysToHolidaysByDate(holidaysData);
          localStorage.setItem(
            HOLIDAYS_STORAGE_KEY,
            JSON.stringify(holidaysByDate),
          );
          setDaysWithHolidays(
            addHolidaysToDays(days, year, month, holidaysByDate),
          );
        });
      } else {
        setDaysWithHolidays(
          addHolidaysToDays(days, year, month, JSON.parse(holidays)),
        );
      }
    }, [country, days, year, month]);

    return (
      <WrappedComponent
        {...(rest as T)}
        days={daysWithHolidays}
        year={year}
        country={country}
      />
    );
  };