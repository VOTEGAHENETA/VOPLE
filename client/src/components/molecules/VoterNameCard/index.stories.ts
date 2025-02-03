import type { Meta, StoryObj } from '@storybook/react';
import VoterNameCard from '.';

const meta = {
  title: 'molecules/VoterNameCard',
  component: VoterNameCard,
  parameters: {
    layout: '',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'boolean',
    },
    kakaoNickname: {
      control: 'text',
    },
    nickname: {
      control: 'text',
    },
  },
  args: {
    status: false,
    kakaoNickname: '엽성강',
    nickname: '칠한 칡',
  },
} satisfies Meta<typeof VoterNameCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
