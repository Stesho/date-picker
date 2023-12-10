import React, { useContext } from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { CalendarContext } from '@/context/calendarContext';
import { RangeDateContext } from '@/context/rangeDateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';
import { getDaysByCalendarType } from '@/utils/dayCells/getDaysByCalendarType';
import { hasTodos } from '@/utils/dayCells/hasTodos';
import { isCheckedRangeCell } from '@/utils/dayCells/isCheckedRangeCell';
import { isRangeDate } from '@/utils/isRangeDate';
import { isSameDates } from '@/utils/isSameDates';

interface RangeDayCellsProps {
  type: CalendarTypes;
  days: Day[];
  onSetCurrentDate: (selectedDay: number) => () => void;
  toggleTodoList: () => void;
  areWeekendsHidden: boolean;
}

export const RangeDayCells = ({
  type,
  days,
  onSetCurrentDate,
  toggleTodoList,
  areWeekendsHidden,
}: RangeDayCellsProps) => {
  const { year, month, week } = useContext(CalendarContext);
  const { startDate, finishDate } = useContext(RangeDateContext);
  const typedDays = getDaysByCalendarType(type, days, week, areWeekendsHidden);

  return (
    <>
      {typedDays.map((day, index) => (
        <DayCell
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
          key={`${day.number}${day.isCurrentMoth}${index}`}
        >
          <input
            type='checkbox'
            name='day'
            id={`${index}${day.number}`}
            disabled={!day.isCurrentMoth}
            onChange={onSetCurrentDate(day.number)}
            checked={isCheckedRangeCell(
              year,
              month,
              startDate,
              finishDate,
              day.isCurrentMoth,
              day.number,
            )}
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
