import type { Meta, StoryObj } from '@storybook/react';
import ChatBoard from './index.tsx';
const meta = {
  title: 'Components/ChatBoard',
  component: ChatBoard,
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
  //  decorators: [
  //    (Story) => (
  //      <div style={{ width: '600px' }}>
  //        <Story />
  //      </div>
  //    ),
  //  ],
  //  decorators : [Story => <div>{Story()}</div>], //데코레이터 적용
} satisfies Meta<typeof ChatBoard>;
export default meta;
type Story = StoryObj<typeof ChatBoard>;

// 기본 상태
export const Default: Story = {
  args: {
    sessionId: 'test-session-1',
    wsUrl: 'wss://mock-websocket-server.com',
  },
};

// 채팅 목록이 비어있는 상태
export const EmptyState: Story = {
  args: {
    sessionId: 'empty-session',
    wsUrl: 'wss://mock-websocket-server.com',
  },
  parameters: {
    mockData: {
      httpStatus: 204,
      message: '채팅 목록이 없습니다.',
      data: [],
    },
  },
};

// 에러 상태 (존재하지 않는 세션)
export const InvalidSession: Story = {
  args: {
    sessionId: 'invalid-session',
    wsUrl: 'wss://mock-websocket-server.com',
  },
  parameters: {
    mockData: {
      httpStatus: 404,
      message: '존재하지 않는 세션입니다.',
      data: null,
    },
  },
};

// 에러 상태 (잘못된 입력)
export const InvalidInput: Story = {
  args: {
    sessionId: 'wrong-type',
    wsUrl: 'wss://mock-websocket-server.com',
  },
  parameters: {
    mockData: {
      httpStatus: 404,
      message: '잘못된 입력입니다',
      data: null,
    },
  },
};

// WebSocket 연결 실패 상태
export const ConnectionError: Story = {
  args: {
    sessionId: 'test-session',
    wsUrl: 'wss://invalid-websocket-server.com',
  },
};

// 활발한 채팅이 있는 상태
export const ActiveChat: Story = {
  args: {
    sessionId: 'active-session',
    wsUrl: 'wss://mock-websocket-server.com',
  },
  parameters: {
    mockData: {
      httpStatus: 200,
      message: '채팅 목록 조회 성공',
      data: [
        {
          userId: 1,
          nickname: '날뛰는 날다람쥐',
          text: '1',
          color: '#c9eb37',
          createdTime: '13:00:09',
        },
        {
          userId: 2,
          nickname: '말하는 말',
          text: '○',
          color: '#ed2fae',
          createdTime: '13:01:55',
        },
        {
          userId: 3,
          nickname: '얼록진 얼룩말',
          text: '와 진짜 박빙이네 ㅋㅋ',
          color: '#45B7D1',
          createdTime: '13:01:55',
        },
        {
          userId: 4,
          nickname: '그래도 화면',
          text: '김싸피가 누구임?',
          color: '#FF1493',
          createdTime: '14:23:00',
        },
        {
          userId: 5,
          nickname: '첫한 첫',
          text: '재 공부 잘함?',
          color: '#FFD700',
          createdTime: '15:00:00',
        },
      ],
    },
  },
};
