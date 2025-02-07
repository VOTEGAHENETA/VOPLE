interface VoteCandidate {
  candidateId: number;
  userId: number;
  userName: string;
  prefix: string;
}

interface TeamResult {
  teamId: number;
  poster: string;
  teamVotePercent: number;
  pollCnt: number;
  voteCandidateDtos: VoteCandidate[];
}

interface VoteFinalResult {
  voteId: number;
  voteName: string;
  teamResults: TeamResult[];
}

interface ElectionSession {
  sessionId: number;
  sessionName: string;
  wholeVoter: number;
  votedVoter: number;
  voteStartTime: string;
  voteEndTime: string;
}

interface VoteResultResponse {
  httpStatus: number;
  message: string;
  data: {
    electionSessionDto: ElectionSession;
    wholeVoterPercent: number;
    voteFinalResults: VoteFinalResult[];
  };
}

// mockData.ts
const mockData: VoteResultResponse = {
  httpStatus: 200,
  message: '최종 투표 결과 조회 성공',
  data: {
    electionSessionDto: {
      sessionId: 1,
      sessionName: '동아리 회장 선거',
      wholeVoter: 100,
      votedVoter: 85,
      voteStartTime: '2025-02-04T15:45:00',
      voteEndTime: '2025-02-05T15:45:00',
    },
    wholeVoterPercent: 85.0,
    voteFinalResults: [
      {
        voteId: 1,
        voteName: '학생회장 선거',
        teamResults: [
          {
            teamId: 1,
            poster: '1번후보포스터.img',
            teamVotePercent: 99,
            pollCnt: 48,
            voteCandidateDtos: [
              {
                candidateId: 1,
                userId: 1,
                userName: '김선명',
                prefix: '사나이이',
              },
            ],
          },
          {
            teamId: 2,
            poster: '2번후보포스터.img',
            teamVotePercent: 0.9,
            pollCnt: 26,
            voteCandidateDtos: [
              {
                candidateId: 2,
                userId: 2,
                userName: '황연주',
                prefix: 'merge',
              },
            ],
          },
          {
            teamId: 3,
            poster: '3번후보포스터.img',
            teamVotePercent: 0.1,
            pollCnt: 11,
            voteCandidateDtos: [
              {
                candidateId: 3,
                userId: 3,
                userName: '강성엽',
                prefix: '해녀',
              },
            ],
          },
        ],
      },
    ],
  },
};

export default mockData;
