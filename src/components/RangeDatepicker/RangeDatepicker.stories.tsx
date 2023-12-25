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
    colorOptions: {
      input: {
        placeholder: '#bbb',
        text: '#333',
        background: '#fff',
        border: '#ddd',
        error: {
          text: '#ff0000',
          border: '#ff0000',
        },
        crossButton: {
          text: '#fff',
          background: '#aaa',
        },
      },
      calendar: {
        background: '#fff',
        border: '#ddd',
        controllers: {
          text: '#000',
          background: '#fff',
        },
        cells: {
          week: {
            text: '#000',
            background: '#fff',
          },
          disabled: {
            text: '#aaa',
            background: '#fff',
          },
          common: {
            text: '#000',
            background: '#fff',
            hover: {
              background: '#f1f1f1',
            },
          },
          holiday: {
            text: '#ff0000',
          },
          startDate: {
            text: '#fff',
            background: '#2F80ED99',
          },
          finishDate: {
            text: '#fff',
            background: '#2f80ed',
          },
          rangeDate: {
            text: '#2F80ED',
            background: '#2F80ED19',
          },
        },
      },
    },
  },
};
