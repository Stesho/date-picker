import { useMemo } from 'react';

import { IInputContext } from '@/context/inputContext';

export const useInputContext = ({
  value,
  onClearInput,
  onChange,
  toggleCalendar,
  isError,
}: IInputContext) =>
  useMemo(
    () => ({
      value,
      onClearInput,
      onChange,
      toggleCalendar,
      isError,
    }),
    [value, onClearInput, onChange, toggleCalendar, isError],
  );
