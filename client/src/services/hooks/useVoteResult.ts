import { useQuery } from '@tanstack/react-query';
import { getResultCurrent } from '../election';
import { VoteResultsResponse } from '@/types/voteSession';

export const useVoteResult = (sessionId: number) => {
  return useQuery<VoteResultsResponse>({
    queryKey: ['voteResult', sessionId],
    queryFn: () => getResultCurrent(sessionId),
  });
};
