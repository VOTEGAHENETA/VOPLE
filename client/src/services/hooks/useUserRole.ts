import { getUserRole } from '@/services/election';
import { UserRoleResponse } from '@/types/election';
import { useQuery } from '@tanstack/react-query';

export const useUserRole = (sessionId: string) => {
  return useQuery<UserRoleResponse>({
    queryKey: ['userRole', sessionId],
    queryFn: () => getUserRole(sessionId),
  });
};
