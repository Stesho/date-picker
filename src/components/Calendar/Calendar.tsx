import React, { useContext, useEffect, useMemo, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells } from '@/components/Cells/Cells';
import { Controllers } from '@/components/Controllers/Controllers';
import { WEEK_DAYS_NAMES } from '@/constants/calendar/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { useDays } from '@/hooks/useDays';
import { configurationService } from '@/services/configurationService';
import { weeksInMonth } from '@/utils/weeksInMonth';

interface CalendarProps {
  setCurrentDate: (date: Date) => void;
}

export const Calendar = ({ setCurrentDate }: CalendarProps) => {
  const { currentDate, minDate, maxDate } = useContext(DateContext);
  const { isStartWithMonday, areWeekendsHidden, isHolidays, country } =
    useContext(WeekContext);

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

  const onSetMonth = (newMonth: number) => () => {
    if (currentDate) {
      setCurrentDate(new Date(year, newMonth, currentDate.getDate()));
    }
  };

  const onSetCurrentDate = (date: Date) => {
    setCurrentDate(date);
  };

  useEffect(() => {
    if (currentDate) {
      setYear(currentDate.getFullYear());
      setMonth(currentDate.getMonth());
    }
  }, [currentDate]);

  const dateContext = useMemo(
    () => ({
      year,
      month,
      week,
      weeksInMonth: weeksInMonth(year, month),
    }),
    [year, month, week],
  );

  const CalendarBody = configurationService({
    element: Cells,
    year,
    isHolidays,
    isStartWithMonday,
    areWeekendsHidden,
    minDate,
    maxDate,
    country,
  });

  return (
    <CalendarWrapper>
      <CalendarContext.Provider value={dateContext}>
        <Controllers
          setMonth={setMonth}
          setYear={setYear}
          setWeek={setWeek}
          onSetPrevMonth={onSetMonth(month - 1)}
          onSetNextMonth={onSetMonth(month + 1)}
        />
        <CalendarBody
          year={year}
          month={month}
          days={days}
          minDate={minDate}
          maxDate={maxDate}
          weekDays={WEEK_DAYS_NAMES}
          areWeekendsHidden={areWeekendsHidden!}
          onSetCurrentDate={onSetCurrentDate}
          country={country}
        />
      </CalendarContext.Provider>
    </CalendarWrapper>
  );
};
