export interface User {
  userId: number;
  nickname: string;
  username: string;
}

export interface Candidate {
  voteTeamId: number;
  userId: number;
  username: string;
}

export interface CandidateList {
  [key: string]: Candidate[]; // 동적키
}

export interface UserResponse {
  userList: User[];
  candidateList: CandidateList;
}
