import { useState } from 'react';

import { errorMessages } from '@/constants/errorMessages/errorMessages';
import { isValidDateString } from '@/utils/isValidDateString';
import { parseDateString } from '@/utils/parseDateString';

export const useDates = (initialDate?: Date) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(initialDate || null);

  const onInputValue = (dateString: string) => {
    if (isValidDateString(dateString)) {
      setCurrentDate(dateString !== '' ? parseDateString(dateString) : null);
      setErrorMessage('');
    } else {
      setCurrentDate(null);
      setErrorMessage(errorMessages.datepickerFormat);
    }
  };

  return {
    currentDate,
    errorMessage,
    onInputValue,
    setCurrentDate,
  };
};
