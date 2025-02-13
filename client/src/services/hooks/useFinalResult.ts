import { ElectionResult } from '@/types/final';
import { useQuery } from '@tanstack/react-query';
import { getFinalResult } from '../election';

export const useFinalResult = (sessionId: number) => {
  return useQuery<ElectionResult, Error>({
    queryKey: ['finalResult', sessionId],
    queryFn: () => getFinalResult(sessionId),
    initialData: {
      electionSessionDto: {
        sessionId: 0,
        sessionName: '',
        wholeVoter: 0,
        votedVoter: 0,
        voteStartTime: '',
        voteEndTime: '',
      },
      wholeVoterPercent: 0,
      voteFinalResults: [],
      electedList: [],
    } as ElectionResult,
  });
};
