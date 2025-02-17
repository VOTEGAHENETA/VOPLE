import { useMutation, useQuery } from '@tanstack/react-query';
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
  });
};

export const useElectionDetailDelete = () => {
  return useMutation({
    mutationFn: ({ sessionId, voteId }: VoteDeleteParams) =>
      deleteVote(sessionId, voteId),
    onSuccess: (data) => {
      alert('해당 투표가 삭제되었습니다.');
      console.log(data);
    },
    onError: (data) => {
      alert('삭제 도중 오류가 발생했습니다.');
      console.log(data);
    },
  });
};
