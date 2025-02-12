import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

// 후보자 정보 응답 데이터
interface CandidateInfoResponse {
  voteTeam: {
    poster: string;
    prefix: string;
    candidateStatement: string;
  };
  pledges: Array<{ content: string }>;
}

export const useCandidateInfo = (sessionId: string, voteTeamId: string) => {
  return useQuery({
    queryKey: ['candidateInfo', sessionId, voteTeamId],
    queryFn: async () => {
      const response = await axios.get<CandidateInfoResponse>(
        `${API_URL}/candidate/${sessionId}/${voteTeamId}`
      );
      console.log(
        'sessionId :' + sessionId + '/' + 'voteTeamId : ' + voteTeamId
      );
      console.log('useCandidateInfo Response : ', response);
      return response.data;
    },
    enabled: !!sessionId && !!voteTeamId,
  });
};
