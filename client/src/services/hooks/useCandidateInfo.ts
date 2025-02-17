import { useQuery } from '@tanstack/react-query';
import { getCandidateInfo } from '../candidate';
import { getIsVoter } from '../election';

export const useCandidateInfo = (sessionId: string, userId: string) => {
  return useQuery({
    queryKey: ['candidateInfo', sessionId, userId],
    queryFn: async () => getCandidateInfo(sessionId, userId),
    enabled: !!sessionId && !!userId,
  });
};

export const useIsVoter = (sessionId: number) => {
  return useQuery({
    queryKey: ['isvoter', sessionId],
    queryFn: async () => getIsVoter(sessionId),
  });
};
