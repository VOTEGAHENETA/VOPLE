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
  [key: string]: Candidate[];
}

export interface UserResponse {
  userList: User[];
  candidateList: CandidateList;
}

export interface VoteTeamInfoFormData {
  voteTeamId: number;
  prefix: string;
  candidateStatement: string;
}

export interface VoteTeamInfoRequest {
  voteTeam: {
    voteTeamId: number;
    prefix: string;
    candidateStatement: string;
  };
  pledges: Array<{
    content: string;
  }>;
}

export interface VoteTeamInfoResponse {
  voteTeam: {
    voteTeamId: string;
    poster: string;
    prefix: string;
    candidateStatement: string;
  };
  pledges: Array<{ content: string }>;
}

export interface UserInfoResponse {
  userId: number;
  kakaoId: number;
  nickname: string;
  username: string;
}

export interface UserInfoRequest {
  userId: number;
  kakaoId: number;
  nickname: string;
  username: string;
}
