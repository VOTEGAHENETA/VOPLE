import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteElection, getElectionSession, putElection } from '../election';
import { TCreateElection } from '@/types/election';

interface ModifyProps {
  sessionId: number;
  data: TCreateElection;
}

export const useElectionSession = (sessionId: number, isQuery: string) => {
  const entrance = new URLSearchParams(isQuery).has('entrance');
  const query = entrance ? 'entrance' : '';
  return useQuery({
    queryKey: ['session', sessionId, query],
    queryFn: () => getElectionSession(sessionId, query),
    staleTime: 1000 * 60 * 5,
  });
};

export const useElectionDelete = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (sessionId: number) => deleteElection(sessionId),
    onSuccess: () => {
      alert('삭제 성공');
      navigate('/elections/list');
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['session_detail'] });
    },
    onError: () => {
      alert('삭제 실패...');
    },
    retry: 3,
  });
};

export const useElectionModify = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, data }: ModifyProps) =>
      putElection(sessionId, data),
    onSuccess: () => {
      alert('수정 완료!!');
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['session_detail'] });
    },
    onError: () => {
      alert('수정 중 오류...');
    },
  });
};
