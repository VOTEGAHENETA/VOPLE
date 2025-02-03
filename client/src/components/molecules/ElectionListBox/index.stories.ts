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
    onCreateElection: {
      action: 'clicked',
      description: '선거 만들기 버튼 클릭 핸들러',
    },
    emptyText: {
      control: 'text',
      description: '선거가 없을 때 표시되는 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ElectionListBox>;

const mockElections = [
  {
    id: '1',
    title: '2024 학생회장 선거',
  },
  {
    id: '2',
    title: '동아리 회장 선출',
  },
  {
    id: '3',
    title: '과대표 선거',
  },
];

// 생성한 선거 목록 - 데이터가 있는 경우
export const CreatedWithData: Story = {
  args: {
    type: 'created',
    elections: mockElections,
    emptyText: '현재 만들어낸 선거가 없습니다.',
  },
};

// 생성한 선거 목록 - 빈 경우
export const CreatedEmpty: Story = {
  args: {
    type: 'created',
    elections: [],
    emptyText: '현재 만들어낸 선거가 없습니다.',
    onCreateElection: () => console.log('선거 만들기 버튼 클릭'),
  },
};

// 참여중인 선거 목록 - 데이터가 있는 경우
export const ParticipatingWithData: Story = {
  args: {
    type: 'participating',
    elections: mockElections,
    emptyText: '현재 참여하고 있는 선거가 없습니다.',
  },
};

// 참여중인 선거 목록 - 빈 경우
export const ParticipatingEmpty: Story = {
  args: {
    type: 'participating',
    elections: [],
    emptyText: '현재 참여하고 있는 선거가 없습니다.',
  },
};

// 많은 데이터가 있는 경우
export const WithManyItems: Story = {
  args: {
    type: 'created',
    elections: Array(10)
      .fill(null)
      .map((_, index) => ({
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
    emptyText: '아직 생성된 선거가 없어요! 새로운 선거를 만들어보세요.',
  },
};
