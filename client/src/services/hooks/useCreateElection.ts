import { useMutation } from '@tanstack/react-query';
import { postElection } from '../election';
import { useNavigate } from 'react-router-dom';
import { TCreateElection } from '@/types/election';

export const useCreateElection = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (createData: TCreateElection) => postElection(createData),
    onSuccess: (data) => {
      console.log('등록 성공:', data);
      alert('선거 등록 성공!');
      setTimeout(() => {
        navigate(`/elections/${data}/manage`);
      }, 100);
      return data;
    },
    onError: (error) => {
      console.log('등록 실패:', error);
      alert('선거 등록 실패!');
    },
  });
};
