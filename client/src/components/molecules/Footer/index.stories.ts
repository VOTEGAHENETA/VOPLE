import type { Meta, StoryObj } from '@storybook/react';
import Footer from '.';

const meta = {
  title: 'layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  args: { children: '투표하기' },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: '투표하기',
  },
};
