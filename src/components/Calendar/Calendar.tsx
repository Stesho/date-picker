import React, { useContext, useEffect, useMemo, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells } from '@/components/Cells/Cells';
import { Controllers } from '@/components/Controllers/Controllers';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';

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
  const { currentDate } = useContext(DateContext);

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
    }),
    [year, month],
  );

  return (
    <CalendarWrapper>
      <CalendarContext.Provider value={dateContext}>
        <Controllers
          setMonth={setMonth}
          setYear={setYear}
          onSetPrevMonth={onSetMonth(month - 1)}
          onSetNextMonth={onSetMonth(month + 1)}
        />
        <Cells
          areWeekendsHidden={areWeekendsHidden}
          onSetCurrentDate={onSetCurrentDate}
          isStartWithMonday={isStartWithMonday}
        />
      </CalendarContext.Provider>
    </CalendarWrapper>
  );
};
