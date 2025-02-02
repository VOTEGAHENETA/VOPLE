// ElectionListItem.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ElectionListItem from './index';

const meta = {
  title: 'Molecules/ElectionListItem',
  component: ElectionListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '선거 제목',
    },
    status: {
      // type을 status로 변경
      control: 'radio',
      options: ['participating', 'closed', 'created'],
      description: '선거 상태', // 설명 변경
    },
    onItemClick: { action: 'clicked' },
    onResultClick: { action: 'result clicked' },
    onMenuClick: { action: 'menu clicked' },
  },
} satisfies Meta<typeof ElectionListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Participating: Story = {
  // Default를 Participating으로 변경
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    status: 'participating',
  },
};

export const Closed: Story = {
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    status: 'closed',
  },
};

export const Created: Story = {
  // WithMenu를 Created로 변경
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    status: 'created',
  },
};

export const LongTitle: Story = {
  args: {
    title:
      '제 12대 싸피 중학교 부회장선거 후보자 등록 및 공약 확인을 위한 특별 선거',
    status: 'participating',
  },
};
