import { useQuery } from '@tanstack/react-query';
import { getQRCode } from '../election';

export const useQRCode = (param: string) => {
  return useQuery({
    queryKey: ['qr', param],
    queryFn: async () => await getQRCode(param),
  });
};
