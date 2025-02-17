import { useInfiniteQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getUserList, searchUser } from '../user';

export const useUserListGet = (
  sessionId: number,
  voteId: number,
  pgno: number
) => {
  return useQuery({
    queryKey: ['initialUserList', pgno, sessionId, voteId],
    queryFn: () => getUserList(sessionId, voteId, pgno),
  });
};

export const useInfiniteUserList = (
  sessionId: number,
  voteId: number,
  isActive: boolean // 검색어가 있으면 사용안함
) => {
  return useInfiniteQuery({
    queryKey: ['userList', sessionId, voteId],
    queryFn: ({ pageParam }) => getUserList(sessionId, voteId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.userList.length) return undefined;
      return pages.length;
    },
    enabled: isActive,
  });
};

export const useInfiniteSearchUserList = (
  sessionId: number,
  voteId: number,
  keyword: string
) => {
  return useInfiniteQuery({
    queryKey: ['searchUserList', sessionId, voteId, keyword],
    queryFn: ({ pageParam }) =>
      searchUser(sessionId, voteId, keyword, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage?.length) return undefined;
      return pages.length;
    },
    staleTime: 0,
  });
};
