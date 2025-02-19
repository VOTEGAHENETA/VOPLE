import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVote } from '../vote';

interface VoteParams {
  sessionId: number;
  voteName: string;
}

export const useCreateVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sessionId, voteName }: VoteParams) => {
      console.log(sessionId, voteName);
      return await createVote(sessionId, voteName);
    },
    onSuccess: () => {
      alert('투표 등록 성공!');
      queryClient.invalidateQueries({ queryKey: ['session_detail'] });
    },
    onError: () => {
      alert('투표 등록 실패!');
    },
  });
};
