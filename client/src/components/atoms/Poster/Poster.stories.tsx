import Image from '../../../assets/sample/sample.png';
import { Meta, StoryObj } from '@storybook/react';
import Poster from '.';

const meta: Meta<typeof Poster> = {
  title: 'Components/Poster',
  component: Poster,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 's', 'm', 'lg'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Poster>;

export const Primary: Story = {
  args: {
    size: 'm',
  },
};

export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Poster size='xs' src={Image}></Poster>
      <Poster size='s' src={Image}></Poster>
      <Poster size='m' src={Image}></Poster>
      <Poster size='lg' src={Image}></Poster>
    </div>
  ),
};
