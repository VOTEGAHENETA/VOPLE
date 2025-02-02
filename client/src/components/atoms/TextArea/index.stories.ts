import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './index';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: '텍스트 영역의 고유 식별자',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
    },
    maxLength: {
      description: '최대 입력 가능 문자 수',
    },
    rows: {
      description: '텍스트 영역의 기본 행 수',
    },
    disabled: {
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    placeholder: '자신을 자유롭게 소개해보세요!',
    value: '',
  },
};

export const WithMaxLength: Story = {
  args: {
    id: 'with-max-length',
    placeholder: '최대 100자까지 입력 가능합니다',
    maxLength: 100,
    value: '',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    placeholder: '비활성화된 상태',
    disabled: true,
    value: '',
  },
};
