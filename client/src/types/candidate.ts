export interface UserInfoFormData {
  nickname: string;
  username: string;
  prefix: string;
  candidateStatement: string;
}

export interface ProfileResponse {
  httpStatus: number;
  message: string;
  data: {
    user: {
      userId: number;
      nickname: string;
      username: string;
    };
    voteTeam: {
      poster: string;
      prefix: string;
      candidateStatement: string;
    };
    pledges: Array<{
      content: string;
    }>;
  };
}

export interface CandidateUpdateRequest {
  user: {
    userId: number;
    username: string;
  };
  voteTeam: {
    poster: string;
    prefix: string;
    candidateStatement: string;
  };
  pledges: Array<{
    content: string;
  }>;
}
