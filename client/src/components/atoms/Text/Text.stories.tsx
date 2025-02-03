import type { Meta, StoryObj } from '@storybook/react';
import Text from '.';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 's', 'm', 'lg'],
      },
    },
    weight: {
      control: {
        type: 'select',
        options: ['normal', 'bold'],
      },
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// 기본 스토리에서 모든 props를 제어할 수 있도록 수정
export const Primary: Story = {
  args: {
    children: '기본 텍스트',
    size: 'm',
    weight: 'normal',
    color: '#000000',
  },
};

// 크기 변경을 실시간으로 확인할 수 있는 스토리
export const Sizes: Story = {
  args: {
    children: '크기 조절 가능한 텍스트',
    size: 'm',
  },
};

// 폰트 두께 변경을 실시간으로 확인할 수 있는 스토리
export const Weights: Story = {
  args: {
    children: '폰트 두께 조절 가능한 텍스트',
    weight: 'normal',
  },
};

// 색상 변경을 실시간으로 확인할 수 있는 스토리
export const CustomColor: Story = {
  args: {
    children: '색상 변경 가능한 텍스트',
    color: '#0000FF',
  },
};

// 클래스 이름 변경을 실시간으로 확인할 수 있는 스토리
export const CustomClassName: Story = {
  args: {
    children: '클래스 변경 가능한 텍스트',
    className: 'custom-text-class',
  },
};
