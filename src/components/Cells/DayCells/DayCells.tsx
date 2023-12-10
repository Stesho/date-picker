import React, { useContext } from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { CalendarContext } from '@/context/calendarContext';
import { RangeDateContext } from '@/context/rangeDateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';
import { getDaysByCalendarType } from '@/utils/dayCells/getDaysByCalendarType';
import { hasTodos } from '@/utils/dayCells/hasTodos';
import { isRangeDate } from '@/utils/isRangeDate';
import { isSameDates } from '@/utils/isSameDates';

interface DayCellsProps {
  type: CalendarTypes;
  days: Day[];
  onSetCurrentDate: (selectedDay: number) => () => void;
  isCheckedCell: (isCurrentMoth: boolean, dayNumber: number) => boolean;
  toggleTodoList: () => void;
  areWeekendsHidden: boolean;
}

export const DayCells = ({
  type,
  days,
  onSetCurrentDate,
  isCheckedCell,
  toggleTodoList,
  areWeekendsHidden,
}: DayCellsProps) => {
  const { year, month, week } = useContext(CalendarContext);
  const { startDate, finishDate } = useContext(RangeDateContext);
  const typedDays = getDaysByCalendarType(type, days, week, areWeekendsHidden);

  return (
    <>
      {typedDays.map((day, index) => (
        <DayCell
          key={`${day.number}${day.isCurrentMoth}${index}`}
          $hasTodos={hasTodos(year, month, day.number)}
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
        >
          <input
            type='checkbox'
            name='day'
            id={`${index}${day.number}`}
            disabled={!day.isCurrentMoth}
            onChange={onSetCurrentDate(day.number)}
            checked={isCheckedCell(day.isCurrentMoth, day.number)}
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
