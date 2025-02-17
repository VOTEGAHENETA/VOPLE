import type { Meta, StoryObj } from '@storybook/react';
import TabContainer from './index';

const meta = {
  title: 'organisms/TabContainer',
  component: TabContainer,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['session', 'team'],
      description: '채팅방 타입',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: '테마',
    },
    sessionId: {
      control: 'number',
      description: '세션 ID',
    },
    voteTeamId: {
      control: 'number',
      description: '투표 팀 ID (선택)',
    },
  },
} satisfies Meta<typeof TabContainer>;

export default meta;
type Story = StoryObj<typeof TabContainer>;

export const Default: Story = {
  args: {
    type: 'team',
    theme: 'dark',
    sessionId: 123,
    voteTeamId: 456,
  },
};

export const SessionChat: Story = {
  args: {
    type: 'session',
    theme: 'dark',
    sessionId: 123,
  },
};
