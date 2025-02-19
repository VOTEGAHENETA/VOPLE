import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getElectionDetail } from '../election';
import { deleteVote } from '../vote';

interface VoteDeleteParams {
  sessionId: number;
  voteId: number;
}

export const useElectionDetailGet = (electionId: number) => {
  return useQuery({
    queryKey: ['session_detail', electionId],
    queryFn: () => getElectionDetail(electionId),
    staleTime: 0,
  });
};

export const useElectionDetailDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, voteId }: VoteDeleteParams) =>
      deleteVote(sessionId, voteId),
    onSuccess: () => {
      alert('해당 투표가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['session_detail'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
    onError: () => {
      alert('삭제 도중 오류가 발생했습니다.');
    },
  });
};
