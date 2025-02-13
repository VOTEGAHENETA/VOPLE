import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteElection, getElectionSession, putElection } from '../election';
import { TCreateElection } from '@/types/election';

interface ModifyProps {
  sessionId: number;
  data: TCreateElection;
}

export const useElectionSession = (sessionId: number) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => getElectionSession(sessionId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useElectionDelete = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (sessionId: number) => deleteElection(sessionId),
    onSuccess: (data) => {
      alert('삭제 성공');
      navigate('/elections/list');
      console.log(data);
    },
    onError: (error) => {
      alert('삭제 실패...');
      console.log('삭제 실패', error);
    },
    retry: 3,
  });
};

export const useElectionModify = () => {
  return useMutation({
    mutationFn: ({ sessionId, data }: ModifyProps) =>
      putElection(sessionId, data),
    onSuccess: (data) => {
      alert('수정 완료!!');
      console.log(data);
    },
    onError: (error) => {
      alert('수정 실패...');
      console.log('수정 실패', error);
    },
  });
};
