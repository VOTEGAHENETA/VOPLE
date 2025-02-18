export interface Candidate {
  candidateId: number;
  userId: number;
  userName: string;
}

export interface VoteTeam {
  voteTeamId: number;
  poster: string;
  candidates: Candidate[];
}

export interface Vote {
  voteId: number;
  voteName: string;
  voteTeams: VoteTeam[];
}

export interface CandidateSessionData {
  sessionId: number;
  sessionName: string;
  voteFindDtos: Vote[];
}

// 현재 투표 상황 데이터 가져오기

export interface VoteCandidateDto {
  candidateId: number;
  userId: number;
  userName: string;
}

export interface TeamResult {
  teamId: number;
  prefix: string;
  pollCnt: number;
  voteCandidateDtos: VoteCandidateDto[];
  poster: string;
  candidate_statement: string; // 언더스코어 표기 유지
  teamVotePercent: number;
}

export interface VoteResult {
  voteId: number;
  voteName: string;
  teamResults: TeamResult[];
}

export interface VoteResultsResponse {
  sessionName: string;
  wholeVoterPercent: number;
  voteResults: VoteResult[];
}

export interface ElectionResponse {
  sessionId: number;
  hostId: number;
  sessionName: string;
  startTime: Date;
  endTime: Date;
  voteResults: VoteResult[];
  wholeVoterPercent: number;
  isHost: boolean;
  hasVoted: boolean;
}
