import { Meta, StoryObj } from '@storybook/react';
import CandidateChoice from '.';
import poster from '@/assets/sample/sample.png';

const meta: Meta<typeof CandidateChoice> = {
  title: 'Components/CandidateChoice',
  component: CandidateChoice,
};

export default meta;

type Story = StoryObj<typeof CandidateChoice>;

export const Primary: Story = {
  args: {
    username: '홍길동',
    poster: poster,
    selected: false,
    onClick: () => console.log('Candidate clicked'),
  },
};

export const Selected: Story = {
  args: {
    username: '홍길동',
    poster: poster,
    selected: true,
    onClick: () => console.log('Candidate clicked'),
  },
};
