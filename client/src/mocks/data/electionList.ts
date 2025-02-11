import { ElectionList } from '@/types/election';

export const mockElectionList: ElectionList = {
  involvedSessions: [
    {
      id: 1,
      sessionName: '프로젝트 빨리 끝나라',
      startTime: '2025.02.05',
      endTime: '2025.02.05',
      isClosed: true,
    },
    {
      id: 2,
      sessionName: '제2회 전두환찾기기',
      startTime: '2025.02.06',
      endTime: '2025.02.06',
      isClosed: false,
    },
  ],
  managedSessions: [
    {
      id: 3,
      sessionName: '테스테스트세트스세세',
      startTime: '2025.02.07',
      endTime: '2025.02.07',
      isClosed: true,
    },
    {
      id: 4,
      sessionName: '테스테스테세테스스',
      startTime: '2025.02.08',
      endTime: '2025.02.08',
      isClosed: false,
    },
  ],
};
