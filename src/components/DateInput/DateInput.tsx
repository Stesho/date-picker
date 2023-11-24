import React from 'react';

import {
  CalendarIcon,
  CrossButton,
  DateInputWrapper,
  Input,
} from '@/components/DateInput/DateInput.styled';

export const DateInput = () => (
  <DateInputWrapper>
    <CalendarIcon />
    <Input placeholder='Choose Date' />
    <CrossButton type='button'>✖</CrossButton>
  </DateInputWrapper>
);
