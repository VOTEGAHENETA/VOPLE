import { Meta, StoryObj } from '@storybook/react';
import RoleNameTag from '.';

const meta: Meta<typeof RoleNameTag> = {
  title: 'Components/RoleNameTag',
  component: RoleNameTag,
  argTypes: {
    voteId: {
      control: { type: 'number' },
      description:
        '역할에 따른 아이콘 표시 (1: crown, 2: silverCrown, 3이하 모두 medal)',
      defaultValue: 1,
    },
    voteName: {
      control: { type: 'text' },
      description: '직책명',
      defaultValue: '회장',
    },
    username: {
      control: { type: 'text' },
      description: '사용자 이름',
      defaultValue: '김선명',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoleNameTag>;

export const Primary: Story = {
  args: {
    voteId: 1,
    voteName: '회장',
    username: '김선명',
  },
};

export const VicePresident: Story = {
  args: {
    voteId: 2,
    voteName: '부회장',
    username: '황연주주',
  },
};

export const ETC: Story = {
  args: {
    voteId: 3,
    voteName: '제주부장',
    username: '강성엽엽',
  },
};
