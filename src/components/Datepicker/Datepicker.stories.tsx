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
      initialDate={new Date(2022, 5, 15)}
      minDate={new Date(2022, 3, 15)}
      maxDate={new Date(2022, 7, 15)}
    />
  ),
};
