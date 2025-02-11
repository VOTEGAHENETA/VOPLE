// ChatBoard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ChatBoard from './index';

const meta = {
  title: 'Components/ChatBoard',
  component: ChatBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['session', 'team'],
      description: '채팅방 타입',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: '테마 설정',
    },
    userId: {
      control: 'number',
      description: '사용자 ID',
    },
    sessionId: {
      control: 'number',
      description: '세션 ID',
    },
    voteTeamId: {
      control: 'number',
      description: '투표 팀 ID (선택사항)',
    },
  },
} satisfies Meta<typeof ChatBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 세션 채팅 기본 스토리
export const SessionChat: Story = {
  args: {
    type: 'session',
    theme: 'dark',
    userId: 1,
    sessionId: 1234,
  },
};

// 팀 채팅 기본 스토리
export const TeamChat: Story = {
  args: {
    type: 'team',
    theme: 'dark',
    userId: 1,
    sessionId: 1234,
    voteTeamId: 5678,
  },
};

// 라이트 테마 스토리
export const LightTheme: Story = {
  args: {
    type: 'session',
    theme: 'light',
    userId: 1,
    sessionId: 1234,
  },
};

// 에러 상태를 시뮬레이션하는 스토리
export const WithError: Story = {
  args: {
    type: 'session',
    theme: 'dark',
    userId: 1,
    sessionId: -1, // 잘못된 세션 ID로 에러 상황 재현
  },
};
