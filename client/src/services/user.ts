import { User, UserInfoRequest, UserResponse, UserInfoResponse } from '@/types/user';
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

export const getUserInfo = async (
  userId: string
): Promise<UserInfoResponse> => {
  return await instance.get(`/user/${userId}`);
};

export const putUserInfo = async (
  userId: string,
  data: UserInfoRequest
): Promise<UserInfoRequest> => {
  try {
    const response = await instance.put(`/user/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('API 에러:', {});
    throw error;
  }
};
