import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuestion, postQuestion } from '../election';

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

export const useQuestionPost = () => {
  return useMutation({
    mutationFn: ({ sessionId, answer }: QuestionProps) =>
      postQuestion(sessionId, answer),
    onSuccess: (data) => {
      console.log('정답!', data);
      return data;
    },
    onError: (error) => {
      console.log('오답!', error);
    },
  });
};
