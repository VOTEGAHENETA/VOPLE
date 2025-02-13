import { User, UserResponse } from '@/types/user';
import instance from './api';

export const getUserList = async (
  sessionId: number,
  voteId: number,
  pgno: number
): Promise<UserResponse> => {
  return await instance.get(`/vote/${sessionId}/${voteId}?page=${pgno}`);
};

export const searchUser = async (
  sessionId: number,
  voteId: number,
  keyword: string,
  pgno: number
): Promise<User[]> => {
  return await instance.get(
    `/vote/${sessionId}/${voteId}/search?keyword=${keyword}&page=${pgno}`
  );
};
