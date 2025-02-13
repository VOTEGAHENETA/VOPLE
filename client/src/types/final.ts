export interface ElectionResult {
  electionSessionDto: ElectionSessionDto;
  wholeVoterPercent: number;
  voteFinalResults: VoteFinalResult[];
  electedList: Elected[];
}

interface ElectionSessionDto {
  sessionId: number;
  sessionName: string;
  wholeVoter: number;
  votedVoter: number;
  voteStartTime: string; // ISO 8601 형식
  voteEndTime: string;
}

interface VoteFinalResult {
  voteId: number;
  voteName: string;
  teamResults: TeamResult[];
}

interface TeamResult {
  teamId: number;
  prefix: string;
  pollCnt: number;
  voteCandidateDtos: VoteCandidateDto[];
  poster: string;
  candidate_statement: string; // snake_case 유지
  teamVotePercent: number;
}

interface VoteCandidateDto {
  candidateId: number;
  userId: number;
  userName: string;
}

interface Elected {
  voteId: number;
  voteName: string;
  voteTeamId: number;
  prefix: string;
  poster: string;
  candidateResults: CandidateResult[];
}

interface CandidateResult {
  candidateId: number;
  userId: number;
  userName: string;
}
