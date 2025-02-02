import type { Meta, StoryObj } from '@storybook/react';
import TextAreaField from './index';

const meta = {
  title: 'Molecules/TextAreaField',
  component: TextAreaField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: '텍스트 영역의 고유 식별자',
      control: 'text',
    },
    label: {
      description: '폼 요소의  label',
      control: 'text',
    },
    value: {
      description: '입력된 텍스트 값',
      control: 'text',
    },
    onChange: {
      description: '텍스트 변경 시 호출되는 핸들러',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
    },
    maxLength: {
      description: '최대 입력 가능 문자 수',
      control: { type: 'number', min: 0 },
    },
    rows: {
      description: '텍스트 영역의 기본 행 수',
      control: { type: 'number', min: 1 },
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    value: '',
    placeholder: '자신을 자유롭게 소개해보세요!',
    onChange: (e) => console.log('Changed:', e.target.value),
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    value: '비활성화된 텍스트 영역입니다.',
    disabled: true,
    onChange: (e) => console.log('Changed:', e.target.value),
  },
};
