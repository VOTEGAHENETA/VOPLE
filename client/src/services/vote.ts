import instance from './api';

export const createVote = async (sessionId: number, voteName: string) => {
  const response = await instance.post(`/vote/${sessionId}`, {
    voteName: voteName,
  });
  return response;
};

export const deleteVote = async (sessionId: number, voteId: number) => {
  const response = await instance.delete(`/vote/${sessionId}/${voteId}`);
  return response;
};
