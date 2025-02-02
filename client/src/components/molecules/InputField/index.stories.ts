// src/components/molecules/input-field/InputField.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './index';

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
    label: '칭호',
    placeholder: '칭호를 입력해주세요.',
    id: 'default-field',
  },
};

export const WithError: Story = {
  args: {
    label: '답변 입력',
    placeholder: '답변을 입력해주세요.',
    id: 'error-field',
    variant: 'error',
    errorMessage: '땡!!! 틀렸습니다.',
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
