import type { Meta, StoryObj } from '@storybook/react';
import TextCounter from './index';

const meta = {
  title: 'Atoms/TextCounter',
  component: TextCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    currentLength: 0,
    maxLength: 100,
  },
} satisfies Meta<typeof TextCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLength: 0,
    maxLength: 100,
  },
};

export const HalfFilled: Story = {
  args: {
    currentLength: 50,
    maxLength: 100,
  },
};

export const Full: Story = {
  args: {
    currentLength: 100,
    maxLength: 100,
  },
};
