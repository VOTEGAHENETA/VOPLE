import { UserInfoFormData } from '@/types/candidate';
import { ChangeEvent, useState } from 'react';

export const useUserInfoFormData = (initialData: UserInfoFormData) => {
  const [UserInfoFormData, setUserInfoFormData] = useState(initialData);

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    fieldName: keyof typeof UserInfoFormData,
    e: ChangeEvent<T>
  ) => {
    setUserInfoFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  return { UserInfoFormData, setUserInfoFormData, handleChange };
};
