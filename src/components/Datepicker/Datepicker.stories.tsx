import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Datepicker } from './Datepicker';

const meta: Meta<typeof Datepicker> = {
  component: Datepicker,
};

export default meta;
type Story = StoryObj<typeof Datepicker>;

export const Default: Story = {
  render: () => (
    <Datepicker
      initialDate={new Date(2023, 9, 15)}
      // minDate={new Date(2023, 7, 10)}
      // maxDate={new Date(2024, 0, 15)}
      // areWeekendsHidden
      // isStartWithMonday
      // isHolidays
    />
  ),
};
