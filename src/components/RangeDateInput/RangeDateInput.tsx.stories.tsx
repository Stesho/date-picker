import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { RangeDatepicker } from '@/components/RangeDatepicker/RangeDatepicker';

const meta: Meta<typeof RangeDatepicker> = {
  component: RangeDatepicker,
};

export default meta;
type Story = StoryObj<typeof RangeDatepicker>;

export const Default: Story = {
  render: () => (
    <RangeDatepicker
      initialStartDate={new Date(2023, 9, 15)}
      initialFinishDate={new Date(2023, 9, 15)}
      // minDate={new Date(2023, 7, 10)}
      // maxDate={new Date(2024, 0, 15)}
      // areWeekendsHidden
      // isStartWithMonday
      // isHolidays
    />
  ),
};
