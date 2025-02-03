// ElectionListItem.stories.ts
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
    startDate: {
      control: 'text',
      description: '시작일',
    },
    endDate: {
      control: 'text',
      description: '종료일',
    },
    status: {
      control: 'radio',
      options: ['participating', 'created'],
      description: '선거 상태',
    },
    isClosed: {
      control: 'boolean',
      description: '마감 여부',
    },
    onItemClick: { action: 'clicked' },
    onResultClick: { action: 'result clicked' },
    onMenuClick: { action: 'menu clicked' },
  },
} satisfies Meta<typeof ElectionListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Participating: Story = {
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    startDate: '2025.01.20',
    endDate: '2025.01.25',
    status: 'participating',
    isClosed: false,
  },
};

export const ParticipatingClosed: Story = {
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    startDate: '2025.01.20',
    endDate: '2025.01.25',
    status: 'participating',
    isClosed: true,
  },
};

export const Created: Story = {
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    startDate: '2025.01.20',
    endDate: '2025.01.25',
    status: 'created',
    isClosed: false,
  },
};

export const CreatedClosed: Story = {
  args: {
    title: '제 12대 싸피 중학교 부회장선거',
    startDate: '2025.01.20',
    endDate: '2025.01.25',
    status: 'created',
    isClosed: true,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      '제 12대 싸피 중학교 부회장선거 후보자 등록 및 공약 확인을 위한 특별 선거',
    startDate: '2025.01.20',
    endDate: '2025.01.25',
    status: 'participating',
    isClosed: false,
  },
};
