import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { RangeDatepicker } from '@/components/RangeDatepicker/RangeDatepicker';
import { CalendarTypes } from '@/types/CalendarTypes';

const meta: Meta<typeof RangeDatepicker> = {
  component: RangeDatepicker,
  argTypes: {
    type: {
      options: CalendarTypes,
      control: 'select',
    },
    initialStartDate: {
      control: 'date',
    },
    initialFinishDate: {
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
type Story = StoryObj<typeof RangeDatepicker>;

export const Default: Story = {
  render: (args) => {
    const initialStartDate =
      typeof args.initialStartDate === 'number'
        ? new Date(args.initialStartDate)
        : args.initialStartDate;
    const initialFinishDate =
      typeof args.initialFinishDate === 'number'
        ? new Date(args.initialFinishDate)
        : args.initialFinishDate;

    return (
      <RangeDatepicker
        {...args}
        initialStartDate={initialStartDate}
        initialFinishDate={initialFinishDate}
      />
    );
  },
  args: {
    type: CalendarTypes.Month,
    initialStartDate: new Date(2023, 11, 5),
    initialFinishDate: new Date(2023, 11, 7),
    isStartWithMonday: false,
    isHolidays: false,
    areWeekendsHidden: false,
    country: 'BY',
  },
};
