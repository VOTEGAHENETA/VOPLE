import { useQuery } from '@tanstack/react-query';
import { getElectionSession } from '../election';

export const useElectionSession = (sessionId: number) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getElectionSession(sessionId),
    staleTime: 1000 * 60 * 5,
  });
};
