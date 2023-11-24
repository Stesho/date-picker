import React, { useEffect, useState } from 'react';

import { ReactComponent as NextIcon } from '@/assets/icons/Next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/Prev.svg';
import {
  CalendarWrapper,
  Cell,
  Cells,
  Controller,
} from '@/components/Calendar/Calendar.styled';
import { CALENDAR_MONTH_NAMES } from '@/constants/calendarMonthNames';
import { WEEK_DAYS_NAMES } from '@/constants/weekDaysNames';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';

export const Calendar = () => {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(9);
  const [days, setDays] = useState<Day[]>([]);

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth(year, month);
    if (newDays) {
      setDays([...newDays]);
    }
  };

  const setNextMonth = (): void => {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
    } else {
      setMonth((current) => current + 1);
    }
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }
  };

  useEffect(displayDaysInCurrentMonth, [month, year]);

  return (
    <CalendarWrapper>
      <Controller>
        <PrevIcon onClick={setPrevMonth} />
        <span>
          {CALENDAR_MONTH_NAMES[month]} {year}
        </span>
        <NextIcon onClick={setNextMonth} />
      </Controller>
      <Cells>
        {WEEK_DAYS_NAMES.map((weekDay) => (
          <Cell>{weekDay}</Cell>
        ))}
        {days.map((item, index) => (
          <Cell key={`${item.number}-${item.isCurrentMoth}`}>
            <input
              type='radio'
              name='day'
              id={`${index}${item.number}`}
              disabled={!item.isCurrentMoth}
            />
            <label htmlFor={`${index}${item.number}`}>{item.number}</label>
          </Cell>
        ))}
      </Cells>
    </CalendarWrapper>
  );
};
