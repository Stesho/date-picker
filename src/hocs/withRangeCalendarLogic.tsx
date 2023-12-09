import React, { ComponentType, useContext, useMemo, useState } from 'react';

import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { RangeDateContext } from '@/context/rangeDateContext';
import { WeekContext } from '@/context/weekContext';
import { useDays } from '@/hooks/useDays';
import { ConfigurableElementProps } from '@/types/ConfigurableElementProps';

export const withRangeCalendarLogic = <T extends ConfigurableElementProps>(
  WrappedComponent: ComponentType<T>,
) =>
  function (props: Omit<T, keyof ConfigurableElementProps>) {
    const { type, setStartDate, setFinishDate, ...rest } = props as T;

    const { startDate, minDate, maxDate } = useContext(RangeDateContext);
    const { areWeekendsHidden, country } = useContext(WeekContext);

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

    const onSetStartDate = (date: Date) => {
      setStartDate(date);
    };

    const onSetFinishDate = (date: Date) => {
      setFinishDate(date);
    };

    const dateContext = useMemo(
      () => ({
        year,
        month,
        week,
      }),
      [year, month, week],
    );

    return (
      <CalendarContext.Provider value={dateContext}>
        <WrappedComponent
          {...(rest as T)}
          type={type}
          week={week}
          year={year}
          month={month}
          setMonth={setMonth}
          setYear={setYear}
          setWeek={setWeek}
          days={days}
          minDate={minDate}
          maxDate={maxDate}
          weekDays={WEEK_DAYS_NAMES}
          areWeekendsHidden={areWeekendsHidden!}
          onSetStartDate={onSetStartDate}
          onSetFinishDate={onSetFinishDate}
          isStartDateSelect={isStartDateSelect}
          setIsStartDateSelect={setIsStartDateSelect}
          country={country}
        />
      </CalendarContext.Provider>
    );
  };
