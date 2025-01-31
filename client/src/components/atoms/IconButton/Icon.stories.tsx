import { Meta, StoryObj } from '@storybook/react';
import mypage from '../../../assets/icons/mypage.svg';
import doodleback from '../../../assets/icons/doodleback.svg';
import home from '../../../assets/icons/home.svg';
import heart from '../../../assets/icons/heart.svg';
import send from '../../../assets/icons/send.svg';
import back from '../../../assets/icons/back.svg';
import bigger from '../../../assets/icons/bigger.svg';
import orangebigger from '../../../assets/icons/orangebigger.svg';
import dots from '../../../assets/icons/dots.svg';
import left from '../../../assets/icons/left.svg';
import React from 'react';
import Icon from '.';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    description: '기능 별 아이콘',
    name: {
      control: {
        type: 'select',
        options: [
          'mypage',
          'doodleback',
          'home',
          'heart',
          'send',
          'back',
          'bigger',
          'orangebigger',
          'dots',
          'left',
        ],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    name: 'mypage',
  }
} 

export const Mypage: Story = {
  render: () => (
    <div>
      <Icon name='mypage' src={mypage}>
        mypage Icon
      </Icon>
    </div>
  )
}

export const DoodleBack: Story = {
  render: () => (
    <div>
      <Icon name='doodleback' src={doodleback}>
        doodleback Icon
      </Icon>
    </div>
  )
}

export const Home: Story = {
  render: () => (
    <div>
      <Icon name='home' src={home}>
        home Icon
      </Icon>
    </div>
  )
}

export const Heart: Story = {
  render: () => (
    <div>
      <Icon name='heart' src={heart}>
        heart Icon
      </Icon>
    </div>
  )
}

export const Send: Story = {
  render: () => (
    <div>
      <Icon name='send' src={send}>
        send Icon
      </Icon>
    </div>
  )
}

export const Back: Story = {
  render: () => (
    <div>
      <Icon name='back' src={back}>
        back Icon
      </Icon>
    </div>
  )
}

export const Bigger: Story = {
  render: () => (
    <div>
      <Icon name='bigger' src={bigger}>
        bigger Icon
      </Icon>
    </div>
  )
}

export const OrangeBigger: Story = {
  render: () => (
    <div>
      <Icon name='orangebigger' src={orangebigger}>
        orangebigger Icon
      </Icon>
    </div>
  )
}

export const Dots: Story = {
  render: () => (
    <div>
      <Icon name='dots' src={dots}>
        dots Icon
      </Icon>
    </div>
  )
}

export const Left: Story = {
  render: () => (
    <div>
      <Icon name='left' src={left}>
        left Icon
      </Icon>
    </div>
  )
}
