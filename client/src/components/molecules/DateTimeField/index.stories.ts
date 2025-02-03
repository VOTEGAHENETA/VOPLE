// DateTimeField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeField } from './index';

const meta = {
  title: 'Molecules/DateTimeField',
  component: DateTimeField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '입력 필드 라벨',
      control: 'text',
    },
    onChange: {
      description: '일시 변경 시 호출되는 함수',
      action: 'changed',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof DateTimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '투표 진행 예정 시간',
  },
};

export const Disabled: Story = {
  args: {
    label: '투표 진행 예정 시간',
    disabled: true,
  },
};
