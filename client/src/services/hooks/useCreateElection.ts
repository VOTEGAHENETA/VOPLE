// src/hooks/usePostElection.ts
import { useMutation } from '@tanstack/react-query';
import { postElection } from '../election';

export const useCreateElection = () => {
  return useMutation({
    mutationFn: postElection,
    onSuccess: (data) => {
      console.log('등록 성공:', data);
      alert('선거 등록 성공!');
    },
    onError: (error) => {
      console.log('등록 실패:', error);
      alert('선거 등록 실패!');
    },
  });
};
