import React from 'react';

import { Calendar } from '@/components/Calendar/Calendar';
import { DateInput } from '@/components/DateInput/DateInput';
import { ResetStyles } from '@/styles/reset';

export const Datepicker = () => (
  <div>
    <ResetStyles />
    <DateInput />
    <Calendar />
  </div>
);
