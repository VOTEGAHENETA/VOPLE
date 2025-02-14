import {
  User,
  UserInfoRequest,
  UserResponse,
  UserInfoResponse,
} from '@/types/user';
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

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  return await instance.get('/user');
};

export const putUserInfo = async (
  data: UserInfoRequest
): Promise<UserInfoRequest> => {
  return await instance.put('/user', data);
};
