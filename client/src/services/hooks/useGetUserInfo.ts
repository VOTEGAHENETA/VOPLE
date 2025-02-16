import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../user';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['useUserInfo'],
    queryFn: () => getUserInfo(),
  });
};
