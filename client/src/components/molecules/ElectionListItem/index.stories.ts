import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import ElectionListItem from '@/components/molecules/ElectionListItem';

const meta: Meta<typeof ElectionListItem> = {
  title: 'Molecules/ElectionListItem',
  component: ElectionListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof ElectionListItem>;

// 기본 진행중인 선거
export const Participating: Story = {
  args: {
    id: 1,
    title: '2024년 학생회장 선거',
    startDate: '2025.01.20',
    endDate: '2025.01.25',
    status: 'participating',
    isClosed: false,
  },
};

// 마감된 참여 선거
export const ParticipatingClosed: Story = {
  args: {
    ...Participating.args,
    isClosed: true,
  },
};

// 생성한 선거
export const Created: Story = {
  args: {
    ...Participating.args,
    status: 'created',
  },
};

// 긴 제목의 선거
export const LongTitle: Story = {
  args: {
    ...Participating.args,
    title:
      '2024년 제 10회 학생회장 선거 투표를 시작합니다. 많은 참여 부탁드립니다.',
  },
};

// 커스텀 라우트를 가진 스토리
export const WithCustomRoute: Story = {
  args: {
    ...Participating.args,
  },
};

// 메뉴가 열린 상태
export const WithOpenMenu: Story = {
  args: {
    ...Created.args,
  },
  parameters: {
    docs: {
      description: {
        story: '메뉴 버튼이 클릭된 상태를 보여줍니다.',
      },
    },
  },
};
