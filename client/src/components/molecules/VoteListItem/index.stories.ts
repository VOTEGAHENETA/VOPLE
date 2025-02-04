import type { Meta, StoryObj } from '@storybook/react';
import { VoteListItem } from '@/components/molecules/VoteListItem';

const meta = {
  title: 'molecules/VoteListItem',
  component: VoteListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    id: {
      description: '투표 id',
      control: 'number',
    },
    voteName: {
      description: '투표 이름 (예)부회장',
      control: 'text',
    },
    sessionName: {
      description: '선거 이름',
      control: 'text',
    },
    onDelete: {
      description: '부모 컴포넌트로 부터 받은 삭제 메서드',
      control: 'text',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof VoteListItem>;

export default meta;
type Story = StoryObj<typeof VoteListItem>;

export const Default: Story = {
  args: {
    id: 1,
    sessionName: '제 3회 싸피중학교 회장/부회장 선거',
    voteName: '부회장',
    onDelete: (id: number) => {
      console.log(`Vote ${id} deleted`);
    },
  },
};
