import { UserInfoFormData } from '@/types/user';
import { useState } from 'react';

export const useUserInfoFormData = (initialData: UserInfoFormData) => {
  const [userInfoFormData, setUserInfoFormData] = useState<UserInfoFormData>({
    userId: initialData.userId || 0,
    kakaoId: initialData.kakaoId || 0,
    nickname: initialData.nickname || '', // 빈 문자열로 초기화
    username: initialData.username || '', // 빈 문자열로 초기화
  });

  const handleChange = (field: keyof UserInfoFormData, value: string) => {
    setUserInfoFormData((prev) => ({
      ...prev,
      [field]: value || '', // null/undefined 체크
    }));
  };

  return { userInfoFormData, setUserInfoFormData, handleChange };
};
