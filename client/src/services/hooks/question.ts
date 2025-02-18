import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuestion, postQuestion } from '../election';
import { useNavigate } from 'react-router-dom';

interface QuestionProps {
  sessionId: number;
  answer: string;
}

export const useQuestionGet = (sessionId: number) => {
  return useQuery({
    queryKey: ['qeustion', sessionId],
    queryFn: () => getQuestion(sessionId),
  });
};

export const useQuestionPost = (
  sessionId: number,
  setErrMsg: (msg: string) => void
) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ sessionId, answer }: QuestionProps) =>
      postQuestion(sessionId, answer),
    onSuccess: (data) => {
      console.log('정답!', data);
      if (!data.answerCorrect) {
        setErrMsg('땡! 틀렸어요');
      } else {
        if (!data.electionFull) {
          navigate(`/elections/${sessionId}`);
        } else {
          setErrMsg('투표할 수 있는 정원이 꽉 찼어요 ㅠㅠ');
        }
      }
    },
    onError: (error) => {
      console.log('오류', error);
      setErrMsg('데이터 처리에 문제가 발생했어요. 잠시 후 다시 시도해주세요.');
    },
  });
};
