// src/components/molecules/input-field/InputField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './index';
// import { InputField } from '@components/molecules/input-field/InputField';

const meta = {
  title: 'Molecules/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이메일 입력',
    placeholder: '이메일을 입력하세요',
    id: 'default-field',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일 입력',
    placeholder: '이메일을 입력하세요',
    id: 'error-field',
    variant: 'error',
    errorMessage: '올바른 이메일 형식이 아닙니다.',
  },
};

export const WithSearchIcon: Story = {
  args: {
    placeholder: '후보자의 이름을 입력하세요',
    id: 'search-field',
    variant: 'search',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '아이디 입력',
    placeholder: '아이디를 입력하세요',
    id: 'helper-field',
    helperText: '영문, 숫자 조합 8-20자',
  },
};
