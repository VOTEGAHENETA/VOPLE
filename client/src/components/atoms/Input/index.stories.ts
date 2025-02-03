import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    id: 'input',
    value: '기본 입력값',
    placeholder: 'Input',
    variant: 'default',
    filled: false,
    onChange: () => {},
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default-input',
    placeholder: '기본 입력',
    variant: 'default',
  },
};

export const WithError: Story = {
  args: {
    id: 'error-input',
    placeholder: '에러 상태 입력',
    variant: 'error',
  },
};

export const WithWarning: Story = {
  args: {
    id: 'warning-input',
    placeholder: '경고 상태 입력',
    variant: 'warning',
  },
};

export const SearchInput: Story = {
  args: {
    id: 'search-input',
    placeholder: '검색어를 입력하세요',
    variant: 'search',
  },
};

export const FilledInput: Story = {
  args: {
    id: 'search-input',
    placeholder: '검색어를 입력하세요',
    variant: 'search',
    filled: true,
  },
};
