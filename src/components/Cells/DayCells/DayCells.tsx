import React from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { Day } from '@/types/Day';
import { getTodosByDate } from '@/utils/getTodosByDate';

interface DayCellsProps {
  year: number;
  month: number;
  currentDate: Date | null;
  days: Day[];
  onSetCurrentDate: (date: Date) => void;
  toggleTodoList: () => void;
}

const DayCells = ({
  year,
  month,
  days,
  currentDate,
  onSetCurrentDate,
  toggleTodoList,
}: DayCellsProps) => {
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
      {days.map((day, index) => (
        <DayCell
          $hasTodos={hasTodos(day.number)}
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

export default DayCells;
