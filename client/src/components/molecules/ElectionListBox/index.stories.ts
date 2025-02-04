import type { Meta, StoryObj } from '@storybook/react';
import { ElectionListBox } from '@/components/molecules/ElectionListBox';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: 'Molecules/ElectionListBox',
  component: ElectionListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: '선거 목록 타입',
      control: 'radio',
      options: ['created', 'participating'],
    },
    elections: {
      description: '선거 목록 데이터',
    },
  },
  decorators: [withRouter],
} satisfies Meta<typeof ElectionListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Created: Story = {
  args: {
    type: 'created',
    elections: [
      {
        id: 1,
        title: '2024 학생회장 선거',
      },
      {
        id: 2,
        title: '동아리 회장 선거',
      },
    ],
  },
};

export const Participating: Story = {
  args: {
    type: 'participating',
    elections: [
      {
        id: 3,
        title: '기숙사 자치회장 선거',
      },
      {
        id: 4,
        title: '과대표 선거',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    type: 'created',
    elections: [],
  },
};

export const LongTitles: Story = {
  args: {
    type: 'created',
    elections: [
      {
        id: 5,
        title: '2024학년도 제1학기 학생자치위원회 비상대책위원장 선거',
      },
      {
        id: 6,
        title: '제35대 소프트웨어학과 학생회장 및 부학생회장 선거',
      },
    ],
  },
};
