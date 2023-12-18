import React, { ComponentType, useContext, useEffect, useState } from 'react';

import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { useCalendarContext } from '@/hooks/useCalendarContext';
import { useDays } from '@/hooks/useDays';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { isCheckedDayCell } from '@/utils/dayCells/isCheckedDayCell';

export const withCalendarLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { ...rest } = props as T;

    const { currentDate, setCurrentDate } = useContext(DateContext);

    const initialYear = currentDate?.getFullYear();
    const initialMonth = currentDate?.getMonth();

    const [year, setYear] = useState<number>(
      () => initialYear || new Date().getFullYear(),
    );
    const [month, setMonth] = useState<number>(
      () => initialMonth || new Date().getMonth(),
    );
    const [week, setWeek] = useState<number>(1);
    const [days] = useDays(year, month);

    const isCheckedCell = (isCurrentMoth: boolean, dayNumber: number) =>
      isCheckedDayCell(isCurrentMoth, dayNumber, currentDate);

    const onSetCurrentDate = (selectedDay: number) => () => {
      setCurrentDate(new Date(year, month, selectedDay));
    };

    useEffect(() => {
      if (currentDate) {
        setYear(currentDate.getFullYear());
        setMonth(currentDate.getMonth());
      }
    }, [currentDate]);

    const calendarContext = useCalendarContext({
      year,
      month,
      week,
      setYear,
      setMonth,
      setWeek,
    });

    return (
      <CalendarContext.Provider value={calendarContext}>
        <WrappedComponent
          {...(rest as T)}
          days={days}
          weekDays={WEEK_DAYS_NAMES}
          onSetCurrentDate={onSetCurrentDate}
          setCurrentDate={setCurrentDate}
          isCheckedCell={isCheckedCell}
        />
      </CalendarContext.Provider>
    );
  };
