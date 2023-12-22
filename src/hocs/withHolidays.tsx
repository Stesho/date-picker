import React, { ComponentType, useContext, useEffect, useState } from 'react';

import { fetchHolidays } from '@/api/fetchHolidays';
import { HOLIDAYS_STORAGE_KEY } from '@/constants/holidays/storage';
import { CalendarContext } from '@/context/calendarContext';
import { WeekContext } from '@/context/weekContext';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { Day } from '@/types/Day';
import { Holiday } from '@/types/Holiday';
import { holidaysToHolidaysByDate } from '@/utils/holidays/setHolidays';

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
    const formattedMonth = (month + 1).toString().padStart(2, '0');
    const formattedDay = day.number.toString().padStart(2, '0');
    const date = `${formattedMonth}-${formattedDay}`;

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

export const withHolidays =
  <T extends ConfigurableElementProps>(WrappedComponent: ComponentType<T>) =>
  (props: Omit<T, keyof ConfigurableElementProps>) => {
    const { days, ...rest } = props as T;
    const { year, month } = useContext(CalendarContext);
    const { country } = useContext(WeekContext);
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

    return <WrappedComponent {...(rest as T)} days={daysWithHolidays} />;
  };
