import { useQuery } from '@tanstack/react-query';
import { getUserList } from '../user';

export const useUserListGet = (
  sessionId: number,
  voteId: number,
  pgno: number
) => {
  return useQuery({
    queryKey: ['pgno', pgno, sessionId, voteId],
    queryFn: async () => await getUserList(sessionId, voteId, pgno),
  });
};
