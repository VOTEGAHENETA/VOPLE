import { UserInfoFormData } from '@/types/user';
import { ChangeEvent, useState } from 'react';

export const useUserInfoFormData = (initialData: UserInfoFormData) => {
  const [userInfoFormData, setUserInfoFormData] = useState(initialData);

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    fieldName: keyof typeof userInfoFormData,
    e: ChangeEvent<T>
  ) => {
    setUserInfoFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  return { userInfoFormData, setUserInfoFormData, handleChange };
};
