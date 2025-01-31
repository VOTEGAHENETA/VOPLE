import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { BASE_BUTTON_STATUS } from '@/constants/ui.constants';
import BaseButton from '.';

const meta = {
  title: 'components/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: {
        type: 'select',
      },
      options: Object.values(BASE_BUTTON_STATUS),
      description: '',
    },
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    status: BASE_BUTTON_STATUS.FILL, // 기본값 설정
    children: '버튼',
    onClick: fn(),
  },
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 기본 버튼 유형 */
export const Primary: Story = {
  args: {
    type: 'submit',
    status: BASE_BUTTON_STATUS.FILL,
    kind: 'base',
    children: '버튼',
  },
};

/** 탭 기능과 유사한 버튼 유형 */
export const Chip: Story = {
  args: {
    type: 'button',
    status: BASE_BUTTON_STATUS.FILL,
    kind: 'chip',
    children: '태그',
  },
};
