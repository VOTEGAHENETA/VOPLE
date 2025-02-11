import { useMutation } from '@tanstack/react-query';
import { createVote } from '../vote';

interface VoteParams {
  sessionId: number;
  voteName: string;
}

export const useCreateVote = () => {
  return useMutation({
    mutationFn: async ({ sessionId, voteName }: VoteParams) => {
      console.log(sessionId, voteName);
      return await createVote(sessionId, voteName);
    },
    onSuccess: (data) => {
      console.log('등록 성공:', data);
      alert('투표 등록 성공!');
    },
    onError: (error) => {
      console.log('등록 실패:', error);
      alert('투표 등록 실패!');
    },
  });
};
