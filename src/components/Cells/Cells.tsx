import React, { useContext } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import { DayCells } from '@/components/Cells/DayCells/DayCells';
import { WeekCells } from '@/components/Cells/WeekCells/WeekCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { DateContext } from '@/context/dateContext';
import { RangeDateContext } from '@/context/rangeDateContext';
import { useTodos } from '@/hooks/useTodos';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';

export interface CellsProps {
  type: CalendarTypes;
  days: Day[];
  weekDays: string[];
  onSetCurrentDate: (selectedDay: number) => () => void;
  isCheckedCell: (isCurrentMoth: boolean, dayNumber: number) => boolean;
  areWeekendsHidden: boolean;
}

export const Cells = ({
  type,
  days,
  weekDays,
  onSetCurrentDate,
  isCheckedCell,
  areWeekendsHidden,
}: CellsProps) => {
  const { currentDate } = useContext(DateContext);
  const { startDate } = useContext(RangeDateContext);
  const { isOpenTodoList, toggleTodoList } = useTodos();

  return (
    <CellsWrapper>
      <WeekCells weekDays={weekDays} areWeekendsHidden={areWeekendsHidden} />
      <DayCells
        type={type}
        days={days}
        onSetCurrentDate={onSetCurrentDate}
        toggleTodoList={toggleTodoList}
        areWeekendsHidden={areWeekendsHidden}
        isCheckedCell={isCheckedCell}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={currentDate! || startDate!} />
      )}
    </CellsWrapper>
  );
};
