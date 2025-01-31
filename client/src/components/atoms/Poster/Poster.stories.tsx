import React from 'react';
import xsImage from '../../../assets/sample/xs.png';
import sImage from '../../../assets/sample/s.png';
import mImage from '../../../assets/sample/m.png';
import lgImage from '../../../assets/sample/lg.png';
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
      <Poster size='xs' src={xsImage}>
        Extream Small
      </Poster>
      <Poster size='s' src={sImage}>
        Small
      </Poster>
      <Poster size='m' src={mImage}>
        Medium
      </Poster>
      <Poster size='lg' src={lgImage}>
        Large
      </Poster>
    </div>
  ),
};
