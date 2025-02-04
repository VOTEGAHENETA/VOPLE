import type { Meta, StoryObj } from '@storybook/react';
import { ElectionListBox } from './index';
import { withRouter } from 'storybook-addon-react-router-v6';

/**
 * ElectionListBox는 선거 목록을 보여주는 컨테이너 컴포넌트입니다.
 * '내가 만든 선거'와 '참여하고 있는 선거' 두 가지 타입을 지원합니다.
 */
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

/**
 * 내가 만든 선거 목록을 보여주는 예시입니다.
 */
export const Created: Story = {
  args: {
    type: 'created',
    elections: [
      {
        id: BigInt(1),
        title: '2024 학생회장 선거',
      },
      {
        id: BigInt(2),
        title: '동아리 회장 선거',
      },
    ],
  },
};

/**
 * 참여하고 있는 선거 목록을 보여주는 예시입니다.
 */
export const Participating: Story = {
  args: {
    type: 'participating',
    elections: [
      {
        id: BigInt(3),
        title: '기숙사 자치회장 선거',
      },
      {
        id: BigInt(4),
        title: '과대표 선거',
      },
    ],
  },
};

/**
 * 선거 목록이 비어있는 상태를 보여주는 예시입니다.
 */
export const Empty: Story = {
  args: {
    type: 'created',
    elections: [],
  },
};

/**
 * 긴 제목을 가진 선거 목록을 보여주는 예시입니다.
 */
export const LongTitles: Story = {
  args: {
    type: 'created',
    elections: [
      {
        id: BigInt(5),
        title: '2024학년도 제1학기 학생자치위원회 비상대책위원장 선거',
      },
      {
        id: BigInt(6),
        title: '제35대 소프트웨어학과 학생회장 및 부학생회장 선거',
      },
    ],
  },
};
