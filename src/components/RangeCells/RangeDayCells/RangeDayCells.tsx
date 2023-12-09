import React, { useContext } from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { CalendarContext } from '@/context/calendarContext';
import { RangeDateContext } from '@/context/rangeDateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';
import { getTodosByDate } from '@/utils/getTodosByDate';
import { isCheckedDate } from '@/utils/isCheckedDate';
import { isRangeDate } from '@/utils/isRangeDate';
import { isSameDates } from '@/utils/isSameDates';

interface RangeDayCellsProps {
  type: CalendarTypes;
  days: Day[];
  onSetStartDate: (date: Date) => void;
  onSetFinishDate: (date: Date) => void;
  toggleTodoList: () => void;
  areWeekendsHidden: boolean;
  isStartDateSelect: boolean;
  setIsStartDateSelect: (isStartDateSelect: boolean) => void;
}

export const RangeDayCells = ({
  type,
  days,
  onSetStartDate,
  onSetFinishDate,
  toggleTodoList,
  areWeekendsHidden,
  isStartDateSelect,
  setIsStartDateSelect,
}: RangeDayCellsProps) => {
  const { year, month, week } = useContext(CalendarContext);
  const { startDate, finishDate } = useContext(RangeDateContext);

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

  const isChecked = (isCurrentMonth: boolean, dayNumber: number) => {
    const checkedDate = new Date(year, month, dayNumber);

    return (
      isCheckedDate(startDate, isCurrentMonth, checkedDate) ||
      isCheckedDate(finishDate, isCurrentMonth, checkedDate)
    );
  };

  const selectDate = (selectedDay: number) => () => {
    const newDate = new Date(year, month, selectedDay);

    if ((startDate && newDate < startDate) || isStartDateSelect) {
      onSetStartDate(newDate);
      onSetFinishDate(newDate);
      return setIsStartDateSelect(false);
    } else {
      onSetFinishDate(newDate);
      return setIsStartDateSelect(true);
    }
  };

  return (
    <>
      {typedDays.map((day, index) => (
        <DayCell
          $hasTodos={hasTodos(day.number)}
          $areWeekendsHidden={areWeekendsHidden}
          $isHoliday={day.isHoliday}
          $isRange={isRangeDate(
            startDate,
            finishDate,
            new Date(year, month, day.number),
            day.isCurrentMoth,
          )}
          $isStart={isSameDates(startDate, new Date(year, month, day.number))}
          $isFinish={isSameDates(finishDate, new Date(year, month, day.number))}
          key={`${day.number}${day.isCurrentMoth}${index}`}
        >
          <input
            type='checkbox'
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
