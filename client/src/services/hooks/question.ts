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
      if (!data.electionFull) {
        setErrMsg('투표할 수 있는 정원이 꽉 찼어요 ㅠㅠ');
      } else {
        if (!data.answerCorrect) {
          navigate(`/elections/${sessionId}`);
        } else {
          setErrMsg('땡! 틀렸어요');
        }
      }
    },
    onError: () => {
      setErrMsg('데이터 처리에 문제가 발생했어요. 잠시 후 다시 시도해주세요.');
    },
  });
};
