import React, { useContext, useEffect, useMemo, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Controllers } from '@/components/Controllers/Controllers';
import { WEEK_DAYS_NAMES } from '@/constants/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { useDays } from '@/hooks/useDays';
import { configurationService } from '@/services/configurationService';

interface CalendarProps {
  setCurrentDate: (date: Date) => void;
  isStartWithMonday: boolean;
  areWeekendsHidden: boolean;
}

export const Calendar = ({
  setCurrentDate,
  isStartWithMonday,
  areWeekendsHidden,
}: CalendarProps) => {
  const { currentDate, minDate, maxDate } = useContext(DateContext);

  const initialYear = currentDate?.getFullYear();
  const initialMonth = currentDate?.getMonth();

  const [year, setYear] = useState<number>(
    () => initialYear || new Date().getFullYear(),
  );
  const [month, setMonth] = useState<number>(
    () => initialMonth || new Date().getMonth(),
  );
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
    }),
    [year, month],
  );

  const CalendarBody = configurationService({
    isStartWithMonday,
    areWeekendsHidden,
    minDate,
    maxDate,
  });

  return (
    <CalendarWrapper>
      <CalendarContext.Provider value={dateContext}>
        <Controllers
          setMonth={setMonth}
          setYear={setYear}
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
          areWeekendsHidden={areWeekendsHidden}
          onSetCurrentDate={onSetCurrentDate}
        />
      </CalendarContext.Provider>
    </CalendarWrapper>
  );
};
