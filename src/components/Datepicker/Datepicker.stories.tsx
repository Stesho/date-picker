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
              text: '#000',
              background: '#f1f1f1',
            },
          },
          holiday: {
            text: '#ff0000',
          },
          currentDate: {
            text: '#fff',
            background: '#2f80ed',
          },
        },
      },
    },
  },
};
