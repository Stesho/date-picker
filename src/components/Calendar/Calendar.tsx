import React, { useEffect, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells } from '@/components/Cells/Cells';
import { Controllers } from '@/components/Controllers/Controllers';

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

  return (
    <CalendarWrapper>
      <Controllers
        year={year}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
        onSetPrevMonth={onSetMonth(month - 1)}
        onSetNextMonth={onSetMonth(month + 1)}
      />
      <Cells
        year={year}
        month={month}
        currentDate={currentDate}
        onSetCurrentDate={onSetCurrentDate}
        isStartWithMonday={isStartWithMonday}
        minDate={minDate}
        maxDate={maxDate}
      />
    </CalendarWrapper>
  );
};
