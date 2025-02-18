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
  hasVoted: boolean;
};

export type ElectionList = {
  involvedSessions: ElectionListDetail[];
  managedSessions: ElectionListDetail[];
};

export type TCreateElection = {
  hostId: number;
  entranceQuestion: string;
  sessionName: string;
  entranceAnswer: string;
  startTime: Date;
  endTime: Date;
  wholeVoter: number;
};

export type TSession = {
  id: number;
  hostId: number;
  sessionName: string;
  entranceQuestion: string;
  entranceAnswer: string;
  startTime: Date;
  endTime: Date;
  wholeVoter: number;
};

export type TVoteEdit = {
  voteId: number;
  sessionName: string;
  voteName: string;
};

export interface ISessionDetail {
  sessionDto: TSession;
  voteEditInfos: TVoteEdit[];
}

export interface QuestionResponse {
  answerCorrect: boolean;
  electionFull: boolean;
}
