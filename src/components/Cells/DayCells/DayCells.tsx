import React, { useContext } from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { CalendarContext } from '@/context/calendarContext';
import { ColorContext } from '@/context/colorContext';
import { DateContext } from '@/context/dateContext';
import { WeekContext } from '@/context/weekContext';
import { Day } from '@/types/Day';
import { getDaysByCalendarType } from '@/utils/dayCells/getDaysByCalendarType';
import { hasTodos } from '@/utils/dayCells/hasTodos';
import { isRangeDate } from '@/utils/isRangeDate';
import { isSameDates } from '@/utils/isSameDates';

export interface DayCellsProps {
  days: Day[];
  onSetCurrentDate: (selectedDay: number) => () => void;
  isCheckedCell: (isCurrentMoth: boolean, dayNumber: number) => boolean;
  toggleTodoList: () => void;
}

export const DayCells = ({
  days,
  onSetCurrentDate,
  isCheckedCell,
  toggleTodoList,
}: DayCellsProps) => {
  const colors = useContext(ColorContext);
  const { year, month, week } = useContext(CalendarContext);
  const { startDate, finishDate } = useContext(DateContext);
  const { type, areWeekendsHidden } = useContext(WeekContext);
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
          $colors={colors.calendar?.cells}
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
