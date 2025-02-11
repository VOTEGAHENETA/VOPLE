import type { Meta, StoryObj } from '@storybook/react';
import { ElectionListBox } from '@/components/molecules/ElectionListBox';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ElectionListDetail } from '@/types/election';

const meta = {
  title: 'Molecules/ElectionListBox',
  component: ElectionListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      description: '선거 목록의 유형 (내가 만든 선거 또는 참여 중인 선거)',
      control: 'radio',
      options: ['created', 'participating'],
      table: {
        type: { summary: "'created' | 'participating'" },
      },
    },
    elections: {
      description: '선거 목록 데이터 배열',
      control: 'object',
      table: {
        type: { summary: 'ElectionListDetail[]' },
      },
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof ElectionListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleElectionData: ElectionListDetail[] = [
  {
    id: 1,
    sessionName: '2024 학생회장 선거',
    startTime: '2024-03-01T09:00:00',
    endTime: '2024-03-07T18:00:00',
    isClosed: false,
  },
  {
    id: 2,
    sessionName: '동아리 회장 선거',
    startTime: '2024-03-15T09:00:00',
    endTime: '2024-03-20T18:00:00',
    isClosed: false,
  },
];

// 내가 만든 선거 목록 예시
export const Created: Story = {
  args: {
    status: 'created',
    elections: sampleElectionData,
  },
};

// 참여 중인 선거 목록 예시
export const Participating: Story = {
  args: {
    status: 'participating',
    elections: [
      {
        id: 3,
        sessionName: '기숙사 자치회장 선거',
        startTime: '2024-02-20T09:00:00',
        endTime: '2024-02-25T18:00:00',
        isClosed: true,
      },
      {
        id: 4,
        sessionName: '과대표 선거',
        startTime: '2024-03-10T09:00:00',
        endTime: '2024-03-15T18:00:00',
        isClosed: false,
      },
    ],
  },
};

// 선거가 없는 경우 예시
export const Empty: Story = {
  args: {
    status: 'created',
    elections: [],
  },
};

// 긴 제목을 가진 선거 목록 예시
export const LongTitles: Story = {
  args: {
    status: 'created',
    elections: [
      {
        id: 5,
        sessionName: '2024학년도 제1학기 학생자치위원회 비상대책위원장 선거',
        startTime: '2024-04-01T09:00:00',
        endTime: '2024-04-07T18:00:00',
        isClosed: false,
      },
      {
        id: 6,
        sessionName: '제35대 소프트웨어학과 학생회장 및 부학생회장 선거',
        startTime: '2024-04-15T09:00:00',
        endTime: '2024-04-20T18:00:00',
        isClosed: false,
      },
    ],
  },
};
