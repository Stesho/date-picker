import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CalendarTypes } from '@/types/CalendarTypes';

import { Datepicker } from './Datepicker';

const meta: Meta<typeof Datepicker> = {
  component: Datepicker,
  argTypes: {
    type: {
      options: CalendarTypes,
      control: 'select',
    },
    initialDate: {
      control: 'date',
    },
    minDate: {
      control: 'date',
    },
    maxDate: {
      control: 'date',
    },
    isHolidays: {
      control: 'boolean',
    },
    isStartWithMonday: {
      control: 'boolean',
    },
    areWeekendsHidden: {
      control: 'boolean',
    },
    country: {
      control: 'text',
    },
    colorOptions: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Datepicker>;

export const Default: Story = {
  render: (args) => {
    const initialDate =
      typeof args.initialDate === 'number'
        ? new Date(args.initialDate)
        : args.initialDate;

    return <Datepicker {...args} initialDate={initialDate} />;
  },
  args: {
    type: CalendarTypes.Month,
    initialDate: new Date(2023, 11, 5),
    isStartWithMonday: false,
    isHolidays: false,
    areWeekendsHidden: false,
    country: 'BY',
  },
};
