import type { Meta, StoryObj } from '@storybook/react';
import { ElectionListBox } from './index';

const meta: Meta<typeof ElectionListBox> = {
  title: 'Molecules/ElectionListBox',
  component: ElectionListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['created', 'participating'],
      description: '선거 리스트 박스의 타입',
    },
    elections: {
      control: 'object',
      description: '선거 목록 데이터',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ElectionListBox>;

const mockElections = [
  {
    id: '1',
    // id: BigInt(1),
    title: '2024 학생회장 선거',
  },
  {
    id: '2',
    // id: BigInt(2),
    title: '동아리 회장 선출',
  },
  {
    id: '3',
    // id: BigInt(3),
    title: '과대표 선거',
  },
];

// 생성한 선거 목록 - 데이터가 있는 경우
export const CreatedWithData: Story = {
  args: {
    type: 'created',
    elections: mockElections,
  },
};

// 생성한 선거 목록 - 빈 경우
export const CreatedEmpty: Story = {
  args: {
    type: 'created',
    elections: [],
  },
};

// 참여중인 선거 목록 - 데이터가 있는 경우
export const ParticipatingWithData: Story = {
  args: {
    type: 'participating',
    elections: mockElections,
  },
};

// 참여중인 선거 목록 - 빈 경우
export const ParticipatingEmpty: Story = {
  args: {
    type: 'participating',
    elections: [],
  },
};

// 많은 데이터가 있는 경우
export const WithManyItems: Story = {
  args: {
    type: 'created',
    elections: Array(10)
      .fill(null)
      .map((_, index) => ({
        // id: BigInt(index + 1),
        id: `${index + 1}`,
        title: `선거 제목 ${index + 1}`,
      })),
  },
};

// 커스텀 빈 상태 메시지
export const CustomEmptyMessage: Story = {
  args: {
    type: 'created',
    elections: [],
  },
};
