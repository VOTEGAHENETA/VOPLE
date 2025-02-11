export interface Candidate {
  candidateId: number;
  userId: number;
  userName: string;
}

export interface VoteTeam {
  voteTeamId: number;
  poster: string; //
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

export type VoteDataProps = {
  data?: CandidateSessionData;
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string } | undefined;
  };
};

// 투표 결과
export interface ElectionSessionDto {
  sessionId: number;
  sessionName: string;
  wholeVoter: number;
  votedVoter: number;
  voteStartTime: string;
  voteEndTime: string;
}

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
  candidate_statement: string;
  teamVotePercent: number;
}

export interface VoteFinalResult {
  voteId: number;
  voteName: string;
  teamResults: TeamResult[];
}

export interface CandidateResult {
  candidateId: number;
  userId: number;
  userName: string;
}

export interface Elected {
  voteId: number;
  voteName: string;
  voteTeamId: number;
  prefix: string;
  poster: string;
  candidateResults: CandidateResult[];
}

export interface VoteResult {
  electionSessionDto: ElectionSessionDto;
  wholeVoterPercent: number; // 전체 유권자 비율
  voteFinalResults: VoteFinalResult[];
  electedList: Elected[];
}
