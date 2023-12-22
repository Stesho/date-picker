import React, { ComponentType, useContext } from 'react';

import { CALENDAR_MONTH_NAMES } from '@/constants/calendar/calendarMonthNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { weeksInMonth } from '@/utils/calendar/weeksInMonth';

export const withControllers =
  <T extends ConfigurableElementProps>(WrappedComponent: ComponentType<T>) =>
  (props: Omit<T, keyof ConfigurableElementProps>) => {
    const { ...rest } = props;

    const { year, month, week, setYear, setMonth, setWeek } =
      useContext(CalendarContext);
    const { currentDate, setCurrentDate } = useContext(DateContext);
    const { type } = useContext(WeekContext);

    const controllersCaption =
      type === CalendarTypes.Month
        ? `${CALENDAR_MONTH_NAMES[month]} ${year}`
        : `${week} week of ${CALENDAR_MONTH_NAMES[month]} ${year}`;

    const setNextMonth = (): void => {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }

      if (currentDate) {
        setCurrentDate(new Date(year, month + 1, currentDate.getDate()));
      }
    };

    const setPrevMonth = (): void => {
      if (month === 0) {
        setMonth(11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }

      if (currentDate) {
        setCurrentDate(new Date(year, month - 1, currentDate.getDate()));
      }
    };

    const setPrevWeek = () => {
      if (week === 1) {
        const newYear = month === 0 ? year - 1 : year;
        const newMonth = month === 0 ? 11 : month - 1;

        setPrevMonth();
        setWeek(weeksInMonth(newYear, newMonth));
      } else {
        setWeek((prev) => prev - 1);
      }
    };

    const setNextWeek = () => {
      const newYear = month === 11 ? 0 : month + 1;
      const newMonth = month === 11 ? year + 1 : year;

      if (week === weeksInMonth(newYear, newMonth)) {
        setNextMonth();
        setWeek(1);
      } else {
        setWeek((prev) => prev + 1);
      }
    };

    return (
      <WrappedComponent
        {...(rest as T)}
        controllersCaption={controllersCaption}
        onPrevClick={type === CalendarTypes.Month ? setPrevMonth : setPrevWeek}
        onNextClick={type === CalendarTypes.Month ? setNextMonth : setNextWeek}
      />
    );
  };
