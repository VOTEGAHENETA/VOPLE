import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVoteTeams } from '../vote';
import { CandidateList } from '@/types/user';

interface VoteParams {
  sessionId: number;
  voteId: number;
  data: Record<number, CandidateList>;
}

export const usePostVoteTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, voteId, data }: VoteParams) =>
      postVoteTeams(sessionId, voteId, data),
    onSuccess: (data) => {
      alert('투표 업데이트에 성공했습니다.');
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['initialUserList'] });
    },
    onError: (error) => {
      alert('투표 업데이트 도중 오류가 발생했습니다.');
      console.log(error);
    },
  });
};
