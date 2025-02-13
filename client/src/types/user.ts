export interface User {
  userId: number;
  nickname: string;
  username: string;
}

export interface UserInfoFormData {
  userId: number;
  kakaoId: number;
  nickname: string;
  username: string;
}

// 후보자 post Form
export interface Candidate {
  voteTeamId: number;
  userId: number;
  username: string;
}

export interface CandidateList {
  [key: string]: Candidate[]; // 동적키
}

// 후보자 post Form
export interface CandidateInfoFormData {
  prefix: string;
  candidateStatement: string;
  voteTeamId: number;
}

export interface UserResponse {
  userList: User[];
  candidateList: CandidateList;
}
