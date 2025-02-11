import { useQuery } from '@tanstack/react-query';
import { getQRCode } from '../election';

export const useQRCode = (param: number) => {
  return useQuery({
    queryKey: ['qr', param],
    queryFn: () => getQRCode(param),
  });
};
