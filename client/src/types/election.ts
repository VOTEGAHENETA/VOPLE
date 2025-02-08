export type VoteCandidate = {
  candidateId: number;
  userId: number;
  userName: string;
};

export type TeamResult = {
  teamId: number;
  prefix: string;
  pollCnt: number;
  voteCandidateDtos: VoteCandidate[];
  poster: string;
  candidateStatement: string;
  teamVotePercent: number;
};

export type VoteResult = {
  voteId: number;
  voteName: string;
  teamResults: TeamResult[];
};

export type VoteStatus = 'isBefore' | 'isProgress' | 'isAfter';

export type ElectionSection = {
  sessionId: number;
  sessionName: string;
  voteStatus: VoteStatus;
  voteResults: VoteResult[];
  wholeVoterPercent: number;
};

export type ElectionListDetail = {
  id: number;
  sessionName: string;
  startTime: string;
  endTime: string;
  isClosed: boolean;
};

export type ElectionList = {
  involvedSessions: ElectionListDetail[];
  managedSessions: ElectionListDetail[];
};

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

export type TCreateElection = {
  hostId: number;
  entranceQuestion: string;
  entranceAnswer: string;
  startTime: Date;
  endTime: Date;
  wholeVoter: number;
  sessionName: string;
};
