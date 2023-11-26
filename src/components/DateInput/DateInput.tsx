import React from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';

interface DateInputProps {
  toggleCalendar: () => void;
}

export const DateInput = ({ toggleCalendar }: DateInputProps) => (
  <DateInputWrapper>
    <CalendarIcon onClick={toggleCalendar} />
    <Input placeholder='Choose Date' />
    <CrossButton type='button'>✖</CrossButton>
  </DateInputWrapper>
);
