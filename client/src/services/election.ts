import instance from './api';
import { TCreateElection } from '@/types/election';

/**
 *
 * @returns 선거 세션 데이터 (GET 요청)
 */
export const getElection = async (sessionId: number) => {
  return await instance.get(`/election/${sessionId}`);
};

export const postElection = async (createData: TCreateElection) => {
  const response = await instance.post('/election', { data: createData });
  return response;
};
