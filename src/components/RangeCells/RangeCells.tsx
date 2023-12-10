import React, { useContext, useState } from 'react';

import { CellsWrapper } from '@/components/Cells/Cells.styled';
import { WeekCells } from '@/components/Cells/WeekCells/WeekCells';
import { RangeDayCells } from '@/components/RangeCells/RangeDayCells/RangeDayCells';
import { TodoList } from '@/components/TodoList/TodoList';
import { RangeDateContext } from '@/context/rangeDateContext';
import { CalendarTypes } from '@/types/CalendarTypes';
import { Day } from '@/types/Day';

export interface RangeCellsProps {
  type: CalendarTypes;
  days: Day[];
  weekDays: string[];
  onSetCurrentDate: (selectedDay: number) => () => void;
  areWeekendsHidden: boolean;
}

export const RangeCells = ({
  type,
  days,
  weekDays,
  areWeekendsHidden,
  onSetCurrentDate,
}: RangeCellsProps) => {
  const { startDate } = useContext(RangeDateContext);

  const [isOpenTodoList, setIsOpenTodoList] = useState<boolean>(false);

  const toggleTodoList = () => {
    setIsOpenTodoList(!isOpenTodoList);
  };

  return (
    <CellsWrapper>
      <WeekCells weekDays={weekDays} areWeekendsHidden={areWeekendsHidden} />
      <RangeDayCells
        type={type}
        days={days}
        onSetCurrentDate={onSetCurrentDate}
        toggleTodoList={toggleTodoList}
        areWeekendsHidden={areWeekendsHidden}
      />
      {isOpenTodoList && (
        <TodoList onClose={toggleTodoList} date={startDate!} />
      )}
    </CellsWrapper>
  );
};
