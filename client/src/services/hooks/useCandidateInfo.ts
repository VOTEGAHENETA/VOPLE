import { useQuery } from '@tanstack/react-query';
import { getCandidateInfo } from '../candidate';

export const useCandidateInfo = (sessionId: string, userId: string) => {
  return useQuery({
    queryKey: ['candidateInfo', sessionId, userId],
    queryFn: async () => getCandidateInfo(sessionId, userId),
    enabled: !!sessionId && !!userId,
  });
};
