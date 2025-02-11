import { ProfileResponse } from '@/types/candidate';

export const mockCandidateData: ProfileResponse = {
  httpStatus: 200,
  message: 'Success',
  data: {
    user: {
      userId: 1,
      nickname: '모범적인 후보',
      username: '김모범',
    },
    voteTeam: {
      poster: 'https://placeholder.com/300x400',
      prefix: '정직한',
      candidateStatement: '모두가 행복한 학교를 만들겠습니다.',
    },
    pledges: [
      {
        content: '급식 메뉴 투표 시스템 도입',
      },
      {
        content: '교내 동아리 활동 지원 확대',
      },
      {
        content: '학생회 건의사항 수렴 창구 개설',
      },
    ],
  },
};
