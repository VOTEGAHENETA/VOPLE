import { VoteTeamInfoFormData } from '@/types/user';
import { ChangeEvent, useState } from 'react';

export const useVoteTeamInfoFormData = (initialData: VoteTeamInfoFormData) => {
  const [voteTeamInfoFormData, setVoteTeamInfoFormData] = useState(initialData);

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    fieldName: keyof typeof voteTeamInfoFormData,
    e: ChangeEvent<T>
  ) => {
    setVoteTeamInfoFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  return { voteTeamInfoFormData, setVoteTeamInfoFormData, handleChange };
};
