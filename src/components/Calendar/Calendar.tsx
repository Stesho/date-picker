import React, { useEffect, useState } from 'react';

import {
  CalendarWrapper,
  Cells,
  Controllers,
  DayCell,
  NextControllerIcon,
  PrevControllerIcon,
  WeekCell,
} from '@/components/Calendar/Calendar.styled';
import { TodoList } from '@/components/TodoList/TodoList';
import { CALENDAR_MONTH_NAMES } from '@/constants/calendarMonthNames';
import { WEEK_DAYS_NAMES } from '@/constants/weekDaysNames';
import { Day } from '@/types/Day';
import { calculateDaysInMonth } from '@/utils/calculateDaysInMonth';
import { getTodosByDate } from '@/utils/getTodosByDate';
import { shiftArrayToLeft } from '@/utils/shiftArrayToLeft';

interface CalendarProps {
  isStartWithMonday?: boolean;
}

export const Calendar = ({ isStartWithMonday = false }: CalendarProps) => {
  const weekDays = isStartWithMonday
    ? shiftArrayToLeft(WEEK_DAYS_NAMES, 1)
    : WEEK_DAYS_NAMES;

  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(9);
  const [days, setDays] = useState<Day[]>([]);
  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(null!);

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth(year, month, isStartWithMonday);
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

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  const selectDate = (day: number) => () => {
    setSelectedDate(new Date(year, month, day));
  };

  const hasTodos = (day: number) => {
    const todosList = getTodosByDate(new Date(year, month, day));
    return todosList.length !== 0;
  };

  useEffect(displayDaysInCurrentMonth, [month, year, isStartWithMonday]);

  return (
    <CalendarWrapper>
      <Controllers>
        <PrevControllerIcon onClick={setPrevMonth} />
        <span>
          {CALENDAR_MONTH_NAMES[month]} {year}
        </span>
        <NextControllerIcon onClick={setNextMonth} />
      </Controllers>
      <Cells>
        {weekDays.map((weekDay) => (
          <WeekCell>{weekDay}</WeekCell>
        ))}
        {days.map((item, index) => (
          <DayCell
            $hasTodos={hasTodos(item.number)}
            key={`${item.number}-${item.isCurrentMoth}`}
          >
            <input
              type='radio'
              name='day'
              id={`${index}${item.number}`}
              disabled={!item.isCurrentMoth}
            />
            <label
              onDoubleClick={toggleTodoList}
              onClick={selectDate(item.number)}
              htmlFor={`${index}${item.number}`}
            >
              {item.number}
            </label>
          </DayCell>
        ))}
      </Cells>
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={selectedDate} />
      )}
    </CalendarWrapper>
  );
};
