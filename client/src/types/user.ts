// 일반 사용자
export interface User {
  userId: number;
  kakaoId: number;
  nickname: string;
  username: string;
}

export interface UserResponse {
  userList: User[];
  candidateList: CandidateList;
}

export interface UserInfo {
  userId: number;
  kakaoId: number;
  nickname: string;
  username: string;
}

export type UserInfoRequest = UserInfo;
export type UserInfoResponse = UserInfo;
export type UserInfoFormData = UserInfo;

// 후보자 or 후보자 그룹
export interface Candidate {
  voteTeamId: number;
  userId: number;
  username: string;
}

export interface CandidateList {
  [key: string]: Candidate[];
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

export interface LiveTeamInfoResponse {
  poster: 'string';
  pledges: Array<{ content: string }>;
}
