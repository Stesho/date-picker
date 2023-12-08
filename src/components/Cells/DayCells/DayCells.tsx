import React, { useContext } from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';
import { getTodosByDate } from '@/utils/getTodosByDate';

interface DayCellsProps {
  type: CalendarTypes;
  days: Day[];
  onSetCurrentDate: (date: Date) => void;
  toggleTodoList: () => void;
  areWeekendsHidden: boolean;
}

export const DayCells = ({
  type,
  days,
  onSetCurrentDate,
  toggleTodoList,
  areWeekendsHidden,
}: DayCellsProps) => {
  const { year, month, week } = useContext(CalendarContext);
  const { currentDate } = useContext(DateContext);

  const weekSize = areWeekendsHidden ? 5 : 7;
  const weekIndex = week - 1;
  const typedDays =
    type === CalendarTypes.Month
      ? days
      : days.slice(weekIndex * weekSize, weekIndex * weekSize + weekSize);

  const hasTodos = (selectedDay: number) => {
    const todosList = getTodosByDate(new Date(year, month, selectedDay));
    return todosList.length !== 0;
  };

  const isChecked = (isCurrentMonth: boolean, dayNumber: number) =>
    !!currentDate && isCurrentMonth && currentDate.getDate() === dayNumber;

  const selectDate = (selectedDay: number) => () => {
    onSetCurrentDate(new Date(year, month, selectedDay));
  };

  return (
    <>
      {typedDays.map((day, index) => (
        <DayCell
          $hasTodos={hasTodos(day.number)}
          $areWeekendsHidden={areWeekendsHidden}
          $isHoliday={day.isHoliday}
          key={`${day.number}${day.isCurrentMoth}${index}`}
        >
          <input
            type='radio'
            name='day'
            id={`${index}${day.number}`}
            disabled={!day.isCurrentMoth}
            onChange={selectDate(day.number)}
            checked={isChecked(day.isCurrentMoth, day.number)}
          />
          <label
            onDoubleClick={toggleTodoList}
            htmlFor={`${index}${day.number}`}
          >
            {day.number}
          </label>
        </DayCell>
      ))}
    </>
  );
};
