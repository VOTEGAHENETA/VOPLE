import React from 'react';
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
    children: '기본 포스터 사이즈 m',
    size: 'm',
  },
};

export const Size: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Poster size='xs' src={Image}>
        Extream Small
      </Poster>
      <Poster size='s' src={Image}>
        Small
      </Poster>
      <Poster size='m' src={Image}>
        Medium
      </Poster>
      <Poster size='lg' src={Image}>
        Large
      </Poster>
    </div>
  ),
};
