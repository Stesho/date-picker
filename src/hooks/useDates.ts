import { useState } from 'react';

import { validateDate } from '@/utils/validation/validateDate';

export const useDates = (
  initialDate?: Date,
  minDate?: Date,
  maxDate?: Date,
) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(initialDate || null);

  const onInputValue = (dateString: string) => {
    const validatedDate = validateDate(dateString, minDate, maxDate);
    setCurrentDate(validatedDate.currentDate);
    setErrorMessage(validatedDate.errorMessage);
  };

  return {
    currentDate,
    errorMessage,
    onInputValue,
    setCurrentDate,
    setErrorMessage,
  };
};
