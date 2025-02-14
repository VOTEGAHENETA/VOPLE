import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../user';

export const useGetUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ['useUserInfo', userId],
    queryFn: async () => getUserInfo(userId),
    enabled: !!userId,
  });
};
