import React, { useContext } from 'react';

import { DayCell } from '@/components/Cells/DayCells/DayCells.styled';
import { CalendarContext } from '@/context/calendarContext';
import { DateContext } from '@/context/dateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';
import { getDaysByCalendarType } from '@/utils/dayCells/getDaysByCalendarType';
import { hasTodos } from '@/utils/dayCells/hasTodos';
import { isChecked } from '@/utils/dayCells/isChecked';

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
  const typedDays = getDaysByCalendarType(type, days, week, areWeekendsHidden);

  const selectDate = (selectedDay: number) => () => {
    onSetCurrentDate(new Date(year, month, selectedDay));
  };

  return (
    <>
      {typedDays.map((day, index) => (
        <DayCell
          $hasTodos={hasTodos(year, month, day.number)}
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
            checked={isChecked(day.isCurrentMoth, day.number, currentDate)}
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
