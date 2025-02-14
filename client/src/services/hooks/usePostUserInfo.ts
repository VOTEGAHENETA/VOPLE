import { useMutation } from '@tanstack/react-query';
import { putUserInfo } from '../user';
import { UserInfoRequest } from '@/types/user';

interface UserParams {
  userId: string;
  data: UserInfoRequest;
}

export const usePutUserInfo = () => {
  return useMutation({
    mutationFn: ({ userId, data }: UserParams) => putUserInfo(userId, data),
    onSuccess: (data) => {
      alert('수정이 완료되었습니다.');
      console.log(data);
    },
    onError: (error) => {
      console.error('유저 정보 업데이트 도중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
