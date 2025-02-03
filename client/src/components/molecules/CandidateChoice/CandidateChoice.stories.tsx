import { Meta, StoryObj } from '@storybook/react';
import CandidateChoice from '.';

const meta: Meta<typeof CandidateChoice> = {
  title: 'Components/CandidateChoice',
  component: CandidateChoice,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CandidateChoice>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};
