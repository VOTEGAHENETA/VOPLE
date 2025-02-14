import { useQuery } from '@tanstack/react-query';
import { isLogin } from '../user';

export const useLoginCheck = () => {
  return useQuery({
    queryKey: ['login'],
    queryFn: () => isLogin(),
  });
};
