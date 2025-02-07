import { TCreateElection, VoteSession } from '@/types/election';
import instance from './api';

type TResponse = {
  httpStatus: number;
  message: string;
  data: number;
};

/**
 *
 * @returns 선거 세션 데이터 (GET 요청)
 */
export const getElection = async (sessionId: number): Promise<VoteSession> => {
  return await instance.get(`/election/${sessionId}`);
};

export const postElection = async (
  createData: TCreateElection
): Promise<TResponse> => {
  return await instance.post('/election', { data: createData });
};
