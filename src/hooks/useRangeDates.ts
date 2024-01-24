import { Dispatch, SetStateAction, useState } from 'react';

import { validateRangeDates } from '@/utils/validation/validateRangeDates';

export const useRangeDates = (
  startDate: Date | null,
  finishDate: Date | null,
  setStartDate: Dispatch<SetStateAction<Date | null>>,
  setFinishDate: Dispatch<SetStateAction<Date | null>>,
  minDate?: Date,
  maxDate?: Date,
) => {
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
    errorMessage,
    onInputValue,
    setErrorMessage,
  };
};
