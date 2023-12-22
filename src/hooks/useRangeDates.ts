import { useState } from 'react';

import { addDayToDate } from '@/utils/dates/addDayToDate';
import { validateRangeDates } from '@/utils/validation/validateRangeDates';

const yesterday = addDayToDate(new Date(), -1);
const tomorrow = addDayToDate(new Date(), 1);

export const useRangeDates = (
  initialStartDate?: Date,
  initialFinishDate?: Date,
  minDate?: Date,
  maxDate?: Date,
) => {
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate || yesterday,
  );
  const [finishDate, setFinishDate] = useState<Date | null>(
    initialFinishDate || tomorrow,
  );
  const [errorMessage, setErrorMessage] = useState('');

  const onInputValue = (dateString: string) => {
    const validatedDates = validateRangeDates(dateString, minDate, maxDate);
    setStartDate((prev) =>
      validatedDates.startDate !== undefined ? validatedDates.startDate : prev,
    );
    setFinishDate((prev) =>
      validatedDates.finishDate !== undefined
        ? validatedDates.finishDate
        : prev,
    );
    setErrorMessage(validatedDates.errorMessage);
  };

  return {
    startDate,
    finishDate,
    errorMessage,
    onInputValue,
    setStartDate,
    setFinishDate,
    setErrorMessage,
  };
};
