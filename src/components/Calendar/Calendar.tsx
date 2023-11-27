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
  currentDate: Date | null;
  setCurrentDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isStartWithMonday?: boolean;
}

export const Calendar = ({
  currentDate,
  setCurrentDate,
  minDate,
  maxDate,
  isStartWithMonday = false,
}: CalendarProps) => {
  const initialYear = currentDate?.getFullYear();
  const initialMonth = currentDate?.getMonth();
  const weekDays = isStartWithMonday
    ? shiftArrayToLeft(WEEK_DAYS_NAMES, 1)
    : WEEK_DAYS_NAMES;

  const [year, setYear] = useState<number>(
    () => initialYear || new Date().getFullYear(),
  );
  const [month, setMonth] = useState<number>(
    () => initialMonth || new Date().getMonth(),
  );
  const [days, setDays] = useState<Day[]>([]);
  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const displayDaysInCurrentMonth = (): void => {
    const newDays = calculateDaysInMonth({
      year,
      month,
      isStartWithMonday,
      minDate,
      maxDate,
    });

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

    if (currentDate) {
      setCurrentDate(new Date(year, month + 1, currentDate.getDate()));
    }
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }

    if (currentDate) {
      setCurrentDate(new Date(year, month - 1, currentDate.getDate()));
    }
  };

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  const selectDate = (selectedDay: number) => () => {
    setCurrentDate(new Date(year, month, selectedDay));
  };

  const hasTodos = (selectedDay: number) => {
    const todosList = getTodosByDate(new Date(year, month, selectedDay));
    return todosList.length !== 0;
  };

  useEffect(displayDaysInCurrentMonth, [
    month,
    year,
    isStartWithMonday,
    minDate,
    maxDate,
  ]);

  useEffect(() => {
    if (currentDate) {
      setYear(currentDate.getFullYear());
      setMonth(currentDate.getMonth());
    }
  }, [currentDate]);

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
          <WeekCell key={weekDay}>{weekDay}</WeekCell>
        ))}
        {days.map((item, index) => (
          <DayCell
            $hasTodos={hasTodos(item.number)}
            key={`${item.number}${item.isCurrentMoth}${index}`}
          >
            <input
              type='radio'
              name='day'
              id={`${index}${item.number}`}
              disabled={!item.isCurrentMoth}
              checked={
                !!currentDate &&
                item.isCurrentMoth &&
                currentDate.getDate() === item.number
              }
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
        <TodoList onClose={toggleTodoList} date={currentDate!} />
      )}
    </CalendarWrapper>
  );
};
