import React, { useEffect, useMemo, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells } from '@/components/Cells/Cells';
import { Controllers } from '@/components/Controllers/Controllers';
import { DateContext } from '@/context/dateContext';

interface CalendarProps {
  currentDate: Date | null;
  setCurrentDate: (date: Date) => void;
  isStartWithMonday: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar = ({
  currentDate,
  setCurrentDate,
  minDate,
  maxDate,
  isStartWithMonday,
}: CalendarProps) => {
  const initialYear = currentDate?.getFullYear();
  const initialMonth = currentDate?.getMonth();

  const [year, setYear] = useState<number>(
    () => initialYear || new Date().getFullYear(),
  );
  const [month, setMonth] = useState<number>(
    () => initialMonth || new Date().getMonth(),
  );

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
      currentDate,
      minDate,
      maxDate,
    }),
    [year, month, currentDate, minDate, maxDate],
  );

  return (
    <CalendarWrapper>
      <DateContext.Provider value={dateContext}>
        <Controllers
          setMonth={setMonth}
          setYear={setYear}
          onSetPrevMonth={onSetMonth(month - 1)}
          onSetNextMonth={onSetMonth(month + 1)}
        />
        <Cells
          onSetCurrentDate={onSetCurrentDate}
          isStartWithMonday={isStartWithMonday}
        />
      </DateContext.Provider>
    </CalendarWrapper>
  );
};
