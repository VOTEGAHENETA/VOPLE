export interface VoteSelection {
  voteId: number;
  voteTeamId: number;
}

export interface VoteRequest {
  // userId: number;
  voteSelections: VoteSelection[];
}
