import type { Meta, StoryObj } from '@storybook/react';
import { VoteListItem } from '@/components/molecules/VoteListItem';

const meta = {
  title: 'Components/VoteListItem',
  component: VoteListItem,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof VoteListItem>;

export default meta;
type Story = StoryObj<typeof VoteListItem>;

export const Default: Story = {
  args: {
    title: '제 3회 싸피중학교 회장/부회장 선거',
    position: '부회장',
  },
};
