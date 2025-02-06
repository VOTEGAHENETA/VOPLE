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

export type VoteSession = {
  sessionId: number;
  sessionName: string;
  voteStatus: VoteStatus;
  voteResults: VoteResult[];
  wholeVoterPercent: number;
};

export interface ElectionListProps {
  id: number;
  title: string;
  startDate?: string;
  endDate?: string;
  status?: 'participating' | 'created';
  isClosed?: boolean;
  onMenuClick?: () => void;
}
