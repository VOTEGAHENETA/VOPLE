import { useInfiniteQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getUserList } from '../user';

export const useUserListGet = (
  sessionId: number,
  voteId: number,
  pgno: number
) => {
  return useQuery({
    queryKey: ['pgno', pgno, sessionId, voteId],
    queryFn: () => getUserList(sessionId, voteId, pgno),
  });
};

export const useInfiniteUserList = (sessionId: number, voteId: number) => {
  return useInfiniteQuery({
    queryKey: ['userList', sessionId, voteId],
    queryFn: ({ pageParam }) => getUserList(sessionId, voteId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.userList.length) return undefined;
      return pages.length;
    },
  });
};
