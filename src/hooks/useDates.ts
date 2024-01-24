import { Dispatch, SetStateAction, useState } from 'react';

import { validateDate } from '@/utils/validation/validateDate';

export const useDates = (
  currentDate: Date | null,
  setCurrentDate: Dispatch<SetStateAction<Date | null>>,
  minDate?: Date,
  maxDate?: Date,
) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onInputValue = (dateString: string) => {
    const validatedDate = validateDate(dateString, minDate, maxDate);
    setCurrentDate(validatedDate.currentDate);
    setErrorMessage(validatedDate.errorMessage);
  };

  return {
    errorMessage,
    onInputValue,
    setErrorMessage,
  };
};
