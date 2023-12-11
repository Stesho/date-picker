import React, { ComponentType, useContext, useMemo, useState } from 'react';

import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { useDays } from '@/hooks/useDays';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';
import { isCheckedRangeCell } from '@/utils/dayCells/isCheckedRangeCell';

export const withRangeCalendarLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { ...rest } = props as T;

    const { startDate, finishDate, setStartDate, setFinishDate } =
      useContext(DateContext);

    const initialYear = startDate?.getFullYear();
    const initialMonth = startDate?.getMonth();

    const [year, setYear] = useState<number>(
      () => initialYear || new Date().getFullYear(),
    );
    const [month, setMonth] = useState<number>(
      () => initialMonth || new Date().getMonth(),
    );
    const [week, setWeek] = useState<number>(1);
    const [days] = useDays(year, month);
    const [isStartDateSelect, setIsStartDateSelect] = useState(true);

    const isCheckedCell = (isCurrentMoth: boolean, dayNumber: number) =>
      isCheckedRangeCell(
        year,
        month,
        startDate,
        finishDate,
        isCurrentMoth,
        dayNumber,
      );

    const onSetCurrentDate = (selectedDay: number) => () => {
      const newDate = new Date(year, month, selectedDay);

      if ((startDate && newDate < startDate) || isStartDateSelect) {
        setStartDate(newDate);
        setFinishDate(newDate);
        return setIsStartDateSelect(false);
      } else {
        setFinishDate(newDate);
        return setIsStartDateSelect(true);
      }
    };

    const calendarContext = useMemo(
      () => ({
        year,
        month,
        week,
        setYear,
        setMonth,
        setWeek,
      }),
      [year, month, week],
    );

    return (
      <CalendarContext.Provider value={calendarContext}>
        <WrappedComponent
          {...(rest as T)}
          days={days}
          weekDays={WEEK_DAYS_NAMES}
          onSetCurrentDate={onSetCurrentDate}
          isCheckedCell={isCheckedCell}
        />
      </CalendarContext.Provider>
    );
  };
