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
  args: {
    id: 'input',
    value: '기본 입력값',
    onChange: () => {},
    placeholder: 'Input',
    variant: 'default',
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '칭호',
    placeholder: '칭호를 입력해주세요.',
    id: 'default-field',
    value: '기본값',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    label: '답변 입력',
    placeholder: '답변을 입력해주세요.',
    id: 'error-field',
    variant: 'error',
    errorMessage: '땡!!! 틀렸습니다.',
    value: '기본값',
    onChange: () => {},
  },
};

export const WithSearchIcon: Story = {
  args: {
    placeholder: '후보자의 이름을 입력하세요',
    id: 'search-field',
    variant: 'search',
    value: '기본값',
    onChange: () => {},
  },
};

export const WithHelperText: Story = {
  args: {
    label: '아이디 입력',
    placeholder: '아이디를 입력하세요',
    id: 'helper-field',
    helperText: '영문, 숫자 조합 8-20자',
    value: '기본값',
    onChange: () => {},
  },
};
