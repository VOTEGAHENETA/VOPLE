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
    value: {
      description: '입력된 메시지 텍스트',
      control: 'text',
    },
    onChange: {
      description: '입력값 변경 시 호출되는 핸들러',
    },
    onSubmit: {
      description: '메시지 전송 시 호출되는 핸들러',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
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

// 기본 상태
export const Default: Story = {
  args: {
    value: '',
    onChange: (e) => console.log('Changed:', e.target.value),
    onSubmit: () => console.log('Message sent!'),
    placeholder: '메시지를 입력하세요',
  },
};

// 텍스트가 입력된 상태
export const WithText: Story = {
  args: {
    value: '안녕하세요!',
    onChange: (e) => console.log('Changed:', e.target.value),
    onSubmit: () => console.log('Message sent!'),
    placeholder: '메시지를 입력하세요',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    value: '',
    onChange: (e) => console.log('Changed:', e.target.value),
    onSubmit: () => console.log('Message sent!'),
    placeholder: '메시지를 입력하세요',
    disabled: true,
  },
};

// 긴 텍스트가 입력된 상태
export const LongText: Story = {
  args: {
    value:
      '이것은 매우 긴 메시지입니다. 입력창이 어떻게 처리되는지 테스트해보기 위한 긴 텍스트입니다.',
    onChange: (e) => console.log('Changed:', e.target.value),
    onSubmit: () => console.log('Message sent!'),
    placeholder: '메시지를 입력하세요',
  },
};
