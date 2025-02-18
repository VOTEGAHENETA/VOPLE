import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUserInfo } from '../user';
import { UserInfoRequest } from '@/types/user';

export const usePutUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserInfoRequest) => putUserInfo(data),
    onSuccess: () => {
      alert('수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
    onError: (error) => {
      console.error('유저 정보 업데이트 도중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
