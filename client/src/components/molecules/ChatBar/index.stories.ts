import type { Meta, StoryObj } from '@storybook/react';
import { ChatBar } from './index';

const meta = {
  title: 'Molecules/ChatBar',
  component: ChatBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    roomId: {
      description: '채팅방 ID',
      control: 'text',
      required: true,
    },
    onSendMessage: {
      description: '메시지 전송 시 호출되는 함수',
      action: 'sent',
      required: true,
    },
    placeholder: {
      description: '입력창 플레이스홀더',
      control: 'text',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ChatBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    roomId: 'room-1',
    onSendMessage: (messageData) => {
      console.log('Sent message:', messageData);
    },
  },
};

export const CustomPlaceholder: Story = {
  args: {
    roomId: 'room-1',
    onSendMessage: (messageData) => {
      console.log('Sent message:', messageData);
    },
    placeholder: '질문을 입력해주세요.',
  },
};

export const Disabled: Story = {
  args: {
    roomId: 'room-1',
    onSendMessage: (messageData) => {
      console.log('Sent message:', messageData);
    },
    disabled: true,
  },
};

export const LongRoomId: Story = {
  args: {
    roomId: 'very-long-room-id-for-testing-layout-12345678901234567890',
    onSendMessage: (messageData) => {
      console.log('Sent message:', messageData);
    },
  },
};
