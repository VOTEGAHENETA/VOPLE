export interface Candidate {
  candidateId: number;
  userId: number;
  userName: string;
  poster: string;
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
  voteFindDto: Vote[];
}
