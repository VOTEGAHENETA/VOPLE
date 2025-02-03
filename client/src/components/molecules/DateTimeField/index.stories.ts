import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeField } from './index';

/**
 * DateTimeField는 시작 일시와 종료 일시를 입력받을 수 있는 필드입니다.
 * 네이티브 날짜/시간 선택기를 사용하여 직관적인 입력이 가능합니다.
 */
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
    startDate: {
      description: '시작 날짜 (YYYY-MM-DD 형식)',
      control: 'text',
    },
    startTime: {
      description: '시작 시간 (HH:mm 형식)',
      control: 'text',
    },
    endDate: {
      description: '종료 날짜 (YYYY-MM-DD 형식)',
      control: 'text',
    },
    endTime: {
      description: '종료 시간 (HH:mm 형식)',
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

/**
 * 기본 사용 예시입니다.
 * 현재 시간이 기본값으로 설정됩니다.
 */
export const Default: Story = {
  args: {
    label: '투표 진행 예정 시간',
    startDate: '2024-02-03',
    startTime: '09:00',
    endDate: '2024-02-03',
    endTime: '18:00',
    onChange: (type, field, value) => {
      console.log(`Changed ${type} ${field} to: ${value}`);
    },
  },
};

/**
 * 초기값이 설정된 상태입니다.
 */
export const WithInitialValue: Story = {
  args: {
    label: '투표 진행 예정 시간',
    startDate: '2024-02-03',
    startTime: '09:00',
    endDate: '2024-02-03',
    endTime: '18:00',
    onChange: (type, field, value) => {
      console.log(`Changed ${type} ${field} to: ${value}`);
    },
  },
};

/**
 * 비활성화된 상태의 컴포넌트입니다.
 * 값을 변경할 수 없습니다.
 */
export const Disabled: Story = {
  args: {
    label: '투표 진행 예정 시간',
    startDate: '2024-02-03',
    startTime: '09:00',
    endDate: '2024-02-03',
    endTime: '18:00',
    disabled: true,
    onChange: (type, field, value) => {
      console.log(`Changed ${type} ${field} to: ${value}`);
    },
  },
};

export const LongLabel: Story = {
  args: {
    label: '이것은 매우 긴 라벨입니다. 레이아웃이 깨지지 않는지 확인해보세요.',
    startDate: '2024-02-03',
    startTime: '09:00',
    endDate: '2024-02-03',
    endTime: '18:00',
    onChange: (type, field, value) => {
      console.log(`Changed ${type} ${field} to: ${value}`);
    },
  },
};
