import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCandidateInfo } from '../candidate';
import { UpdateCandidateParams } from '../candidate';
import axios from 'axios';

export const useUpdateCandidateInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateCandidateParams) => updateCandidateInfo(params),
    onSuccess: (_, variables) => {
      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['candidateInfo', variables.sessionId],
      });
      alert('수정이 완료되었습니다.');
    },
    onError: (error) => {
      console.error('후보자 정보 업데이트 실패:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          '요청이 실패했습니다.';
        alert(`수정 실패: ${errorMessage}`);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
};
