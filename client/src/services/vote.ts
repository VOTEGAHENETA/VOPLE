import instance from './api';

export const createVote = async (sessionId: number, voteName: string) => {
  const response = await instance.post(`/vote/${sessionId}`, {
    voteName: voteName,
  });
  return response;
};
