import { useQuery } from '@tanstack/react-query';
import { getVoteDetail } from '../election';

export const useVoteDetail = (sessionId: number) => {
  return useQuery({
    queryKey: ['voteSession', sessionId],
    queryFn: () => getVoteDetail(sessionId),
  });
};
