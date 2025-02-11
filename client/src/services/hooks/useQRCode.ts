import { useQuery } from '@tanstack/react-query';
import { getQRCode } from '../election';

export const useQRCode = (sessionId: number) => {
  return useQuery({
    queryKey: ['qr', sessionId],
    queryFn: () => getQRCode(sessionId),
  });
};
