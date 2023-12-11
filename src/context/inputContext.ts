import { ChangeEvent, createContext } from 'react';

interface IInputContext {
  value: string;
  onClearInput: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  toggleCalendar: () => void;
  isError: boolean;
}

export const InputContext = createContext<IInputContext>({
  value: '',
  onClearInput: () => {},
  onChange: () => {},
  toggleCalendar: () => {},
  isError: false,
});
