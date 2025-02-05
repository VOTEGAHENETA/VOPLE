import { VoteSession } from '@/types/election';
import instance from './api';

/**
 *
 * @returns 선거 세션 데이터 (GET 요청)
 */
export const getElection = async (sessionId: string): Promise<VoteSession> => {
  const data = await instance
    .get(`/election/${sessionId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });

  return data;
};
