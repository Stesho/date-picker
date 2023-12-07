import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { RangeDatepicker } from '@/components/RangeDatepicker/RangeDatepicker';

const meta: Meta<typeof RangeDatepicker> = {
  component: RangeDatepicker,
};

export default meta;
type Story = StoryObj<typeof RangeDatepicker>;

export const Default: Story = {
  render: () => <RangeDatepicker />,
};
