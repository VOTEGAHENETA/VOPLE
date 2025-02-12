import { useMutation } from '@tanstack/react-query';
import { postElection } from '../election';
import { useNavigate } from 'react-router-dom';

export const useCreateElection = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postElection,
    onSuccess: (data) => {
      console.log('등록 성공:', data);
      alert('선거 등록 성공!');
      setTimeout(() => {
        navigate(`/elections/${data}/manage`);
      }, 1000);
      return data;
    },
    onError: (error) => {
      console.log('등록 실패:', error);
      alert('선거 등록 실패!');
    },
  });
};
