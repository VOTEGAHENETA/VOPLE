import { getUserRole } from '@/services/election';
import { useQuery } from '@tanstack/react-query';

export const useUserRole = (sessionId: number) => {
  return useQuery<string>({
    queryKey: ['userRole', sessionId],
    queryFn: () => getUserRole(sessionId),
  });
};
