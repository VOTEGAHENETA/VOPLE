import { UserResponse } from '@/types/user';
import instance from './api';

export const getUserList = async (
  sessionId: number,
  voteId: number,
  pgno: number
): Promise<UserResponse> => {
  return await instance.get(`/vote/${sessionId}/${voteId}`, {
    params: { page: pgno },
  });
};
