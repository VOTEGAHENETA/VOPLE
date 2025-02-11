import sample from '@/assets/sample/sample.png';
import { CandidateSessionData } from '@/types/voteSession';

export const info: CandidateSessionData = {
  sessionId: 12,
  sessionName: '제 12대 싸피 회장선거',
  voteFindDto: [
    {
      voteId: 1,
      voteName: '회장 선거',
      voteTeams: [
        {
          voteTeamId: 1,
          poster: sample,
          candidates: [
            {
              candidateId: 101,
              userId: 1001,
              userName: '홍길동',
            },
          ],
        },
        {
          voteTeamId: 2,
          poster: sample,
          candidates: [
            {
              candidateId: 102,
              userId: 1002,
              userName: '김민희',
            },
          ],
        },
        {
          voteTeamId: 3,
          poster: sample,
          candidates: [
            {
              candidateId: 103,
              userId: 1003,
              userName: '이영희',
            },
          ],
        },
        {
          voteTeamId: 4,
          poster: sample,
          candidates: [
            {
              candidateId: 104,
              userId: 1004,
              userName: '박지훈',
            },
          ],
        },
      ],
    },
    {
      voteId: 2,
      voteName: '부회장 선거',
      voteTeams: [
        {
          voteTeamId: 1,
          poster: sample,
          candidates: [
            {
              candidateId: 201,
              userId: 2001,
              userName: '김준호',
            },
          ],
        },
        {
          voteTeamId: 2,
          poster: sample,
          candidates: [
            {
              candidateId: 202,
              userId: 2002,
              userName: '이수민',
            },
          ],
        },
        {
          voteTeamId: 3,
          poster: sample,
          candidates: [
            {
              candidateId: 203,
              userId: 2003,
              userName: '유지민민',
            },
          ],
        },
        {
          voteTeamId: 4,
          poster: sample,
          candidates: [
            {
              candidateId: 204,
              userId: 2004,
              userName: '박지은',
            },
          ],
        },
      ],
    },
  ],
};
