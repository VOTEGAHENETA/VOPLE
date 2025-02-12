import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

interface useUserInfoResponse {
  nickname: string;
  username: string;
}

export const useUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ['useUserInfo', userId],
    queryFn: async () => {
      const response = await axios.get<useUserInfoResponse>(
        `${API_URL}/user/${userId}`
      );
      return response.data;
    },
    enabled: !!userId,
  });
};
