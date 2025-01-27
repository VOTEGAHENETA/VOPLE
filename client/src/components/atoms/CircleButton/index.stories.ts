import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import CircleButton from '.';

const meta = {
  title: 'components/CircleButton',
  component: CircleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      description: '투표 전과 투표 진행 중인 상태에 따라 나뉩니다.',
    },
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    status: true,
    children: '투표하기',
    onClick: fn(),
  },
} satisfies Meta<typeof CircleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'button',
    status: true,
    children: '투표하기',
  },
};
