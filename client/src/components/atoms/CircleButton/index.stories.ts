import type { Meta, StoryObj } from '@storybook/react';
import CircleButton from '.';

const meta = {
  title: 'components/CircleButton',
  component: CircleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CircleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 원형 버튼 */
export const Primary: Story = {
  args: {
    type: 'button',
  },
};
