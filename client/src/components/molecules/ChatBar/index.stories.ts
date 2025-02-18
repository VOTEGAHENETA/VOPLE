// ChatBar.stories.tsx
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
    onSendMessage: {
      action: 'sent',
      description: '메시지 전송 핸들러',
    },
    placeholder: {
      control: 'text',
      description: '입력창 플레이스홀더 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '채팅창 비활성화 여부',
    },
    theme: {
      control: 'radio',
      options: ['dark', 'light'],
      description: '테마 설정',
    },
  },
} satisfies Meta<typeof ChatBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '메세지를 입력해주세요.',
    disabled: false,
    theme: 'dark',
  },
};

export const Light: Story = {
  args: {
    placeholder: '메세지를 입력해주세요.',
    disabled: false,
    theme: 'light',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '메세지를 입력해주세요.',
    disabled: true,
    theme: 'dark',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: '새로운 메시지를 입력하세요',
    disabled: false,
    theme: 'dark',
  },
};
