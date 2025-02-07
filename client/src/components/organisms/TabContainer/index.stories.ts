import type { Meta, StoryObj } from '@storybook/react';
import TabContainer from './index';

const meta = {
  title: 'organisms/TabContainer',
  component: TabContainer,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
  },
} satisfies Meta<typeof TabContainer>;

export default meta;
type Story = StoryObj<typeof TabContainer>;

export const Default: Story = {
  args: {
    chatComponent: `<div>채팅 컴포넌트</div>`,
    noticeComponent: `<div>공지사항 컴포넌트</div>`,
    posterComponent: `<div>포스터 컴포넌트</div>`,
  },
};
