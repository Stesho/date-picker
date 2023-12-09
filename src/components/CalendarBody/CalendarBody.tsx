import React from 'react';

import { Cells, CellsProps } from '@/components/Cells/Cells';
import {
  Controllers,
  ControllersProps,
} from '@/components/Controllers/Controllers';

type CalendarBodyProps = CellsProps & ControllersProps;

export const CalendarBody = ({
  controllersCaption,
  type,
  onPrevClick,
  onNextClick,
  days,
  weekDays,
  areWeekendsHidden,
  onSetCurrentDate,
}: CalendarBodyProps) => (
  <>
    <Controllers
      controllersCaption={controllersCaption}
      onPrevClick={onPrevClick}
      onNextClick={onNextClick}
    />
    <Cells
      type={type}
      days={days}
      weekDays={weekDays}
      areWeekendsHidden={areWeekendsHidden}
      onSetCurrentDate={onSetCurrentDate}
    />
  </>
);
