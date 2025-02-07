import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import ElectionListItem from '@/components/molecules/ElectionListItem';

const meta = {
  title: 'Molecules/ElectionListItem',
  component: ElectionListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '선거 목록에서 사용되는 아이템 컴포넌트입니다. ',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [withRouter],
  // argTypes을 통해 각 prop의 컨트롤을 정의
  argTypes: {
    id: {
      control: 'number',
      description: '선거의 고유 식별자',
    },
    title: {
      control: 'text',
      description: '선거의 제목',
    },
    startDate: {
      control: 'text',
      description: '선거 시작일',
    },
    endDate: {
      control: 'text',
      description: '선거 종료일',
    },
    status: {
      control: 'radio',
      options: ['participating', 'created'],
      description: '선거의 상태 (참여중/생성됨)',
    },
    isClosed: {
      control: 'boolean',
      description: '선거 마감 여부',
    },
  },
} satisfies Meta<typeof ElectionListItem>;

export default meta;
type Story = StoryObj<typeof ElectionListItem>;

// 기본값 설정
const defaultArgs = {
  id: 1,
  title: '2024년 학생회장 선거',
  startDate: '2025.01.20',
  endDate: '2025.01.25',
  status: 'participating',
  isClosed: false,
} as const;

// 진행중인 선거 (기본)
export const Participating: Story = {
  args: {
    ...defaultArgs,
  },
  parameters: {
    docs: {
      description: {
        story: '진행 중인 선거의 기본적인 표시 형태입니다.',
      },
    },
  },
};

// 마감된 참여 선거
export const ParticipatingClosed: Story = {
  args: {
    ...defaultArgs,
    isClosed: true,
  },
  parameters: {
    docs: {
      description: {
        story: '마감된 선거의 표시 형태입니다. 결과 확인 버튼이 표시됩니다.',
      },
    },
  },
};

// 생성한 선거
export const Created: Story = {
  args: {
    ...defaultArgs,
    status: 'created',
  },
  parameters: {
    docs: {
      description: {
        story:
          '사용자가 생성한 선거의 표시 형태입니다. 관리 메뉴가 제공됩니다.',
      },
    },
  },
};

// 긴 제목의 선거
export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title:
      '2024년 제 10회 학생회장 선거 투표를 시작합니다. 많은 참여 부탁드립니다.',
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴 제목을 가진 선거의 표시 형태입니다. 제목이 자동으로 줄바꿈됩니다.',
      },
    },
  },
};

// 메뉴가 열린 상태의 생성된 선거
export const CreatedWithOpenMenu: Story = {
  args: {
    ...defaultArgs,
    status: 'created',
  },
  parameters: {
    docs: {
      description: {
        story: '관리 메뉴가 열린 상태의 생성된 선거입니다.',
      },
    },
  },
};
