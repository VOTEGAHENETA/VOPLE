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
