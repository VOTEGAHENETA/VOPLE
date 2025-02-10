import { useQuery } from '@tanstack/react-query';
import { getElectionDetail } from '../election';

export const useElectionDetail = (electionId: number) => {
  return useQuery({
    queryKey: ['session', electionId],
    queryFn: async () => await getElectionDetail(electionId),
    staleTime: 1000 * 60 * 5,
  });
};
