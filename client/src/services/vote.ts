import { CandidateList } from '@/types/user';
import instance from './api';

export const createVote = async (sessionId: number, voteName: string) => {
  const response = await instance.post(`/vote/${sessionId}`, {
    voteName: voteName,
  });
  return response;
};

export const deleteVote = async (sessionId: number, voteId: number) => {
  const response = await instance.delete(`/vote/${sessionId}/${voteId}`);
  return response;
};

export const postVoteTeams = async (
  sessionId: number,
  voteId: number,
  data: Record<number, CandidateList>
) => {
  const transformCandidates = {
    voteTeamList: Object.values(data).map((team) => {
      return Object.values(team)
        .flat()
        .map((candidate) => ({
          userId: candidate.userId, // request에서 userId만 필요한 상태
        }));
    }),
  };
  console.log('최종 데이터:', transformCandidates);

  return await instance.post(
    `/vote/${sessionId}/${voteId}`,
    transformCandidates
  );
};
