import { CandidateInfoFormData } from '@/types/user';
import { ChangeEvent, useState } from 'react';

export const useCandidateInfoFormData = (
  initialData: CandidateInfoFormData
) => {
  const [candidateInfoFormData, setCandidateInfoFormData] =
    useState(initialData);

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    fieldName: keyof typeof candidateInfoFormData,
    e: ChangeEvent<T>
  ) => {
    setCandidateInfoFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  return { candidateInfoFormData, setCandidateInfoFormData, handleChange };
};
