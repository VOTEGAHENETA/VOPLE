import { useQuery } from '@tanstack/react-query';
import { getCandidateInfo } from '../candidate';
import { getIsVoter } from '../election';

export const useCandidateInfo = (sessionId: string) => {
  return useQuery({
    queryKey: ['candidateInfo', sessionId],
    queryFn: async () => getCandidateInfo(sessionId),
    enabled: !!sessionId,
  });
};

export const useIsVoter = (sessionId: number) => {
  return useQuery({
    queryKey: ['isvoter', sessionId],
    queryFn: async () => getIsVoter(sessionId),
  });
};
