import { ChangeEvent, useEffect, useState } from 'react';

import { dateToString } from '@/utils/dates/dateToString';

export const useDateInput = (
  setErrorMessage: (errorMessage: string) => void,
  onInputValue: (dateString: string) => void,
  currentDate: Date | null,
) => {
  const numbersOrSlashSymbol = /^[\d\\/]*$/;

  const [value, setValue] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    if (numbersOrSlashSymbol.test(dateString)) {
      setValue(dateString);
      onInputValue(dateString);
    }
  };

  const onClearInput = () => {
    setValue('');
    onInputValue('');
  };

  useEffect(() => {
    if (currentDate) {
      const dateString = dateToString(currentDate);
      setValue(dateString);
      setErrorMessage('');
    }
  }, [currentDate, setErrorMessage]);

  return {
    value,
    onChange,
    onClearInput,
  };
};
