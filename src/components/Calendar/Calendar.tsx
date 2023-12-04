import React, { useContext, useEffect, useMemo, useState } from 'react';

import { CalendarWrapper } from '@/components/Calendar/Calendar.styled';
import { Cells } from '@/components/Cells/Cells';
import { Controllers } from '@/components/Controllers/Controllers';
import { WEEK_DAYS_NAMES } from '@/constants/weekDaysNames';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { withHiddenHolidays } from '@/hocs/withHiddenHolidays';
import { withMondayStart } from '@/hocs/withMondayStart';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';

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
  const [days, setDays] = useState<Day[]>([]);

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

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth({
      year,
      month,
      minDate,
      maxDate,
    });

    if (newDays) {
      setDays([...newDays]);
    }
  };

  useEffect(displayDaysInCurrentMonth, [
    month,
    year,
    isStartWithMonday,
    areWeekendsHidden,
    minDate,
    maxDate,
  ]);

  const WithHiddenHolidays = areWeekendsHidden
    ? withHiddenHolidays(Cells)
    : Cells;

  const WithMondayStartCells = isStartWithMonday
    ? withMondayStart(WithHiddenHolidays)
    : WithHiddenHolidays;

  return (
    <CalendarWrapper>
      <CalendarContext.Provider value={dateContext}>
        <Controllers
          setMonth={setMonth}
          setYear={setYear}
          onSetPrevMonth={onSetMonth(month - 1)}
          onSetNextMonth={onSetMonth(month + 1)}
        />
        <WithMondayStartCells
          year={year}
          month={month}
          days={days}
          weekDays={WEEK_DAYS_NAMES}
          areWeekendsHidden={areWeekendsHidden}
          onSetCurrentDate={onSetCurrentDate}
          isStartWithMonday={isStartWithMonday}
        />
      </CalendarContext.Provider>
    </CalendarWrapper>
  );
};
