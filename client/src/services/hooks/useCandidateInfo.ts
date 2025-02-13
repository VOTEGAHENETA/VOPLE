import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

// 후보자 정보 응답 데이터
interface CandidateInfoResponse {
  data: {
    voteTeam: {
      voteTeamId: string;
      poster: string;
      prefix: string;
      candidateStatement: string;
    };
    pledges: Array<{ content: string }>;
  };
}

export const useCandidateInfo = (sessionId: string, userId: string) => {
  console.log('**************', sessionId, userId);
  return useQuery({
    queryKey: ['candidateInfo', sessionId, userId],
    queryFn: async () => {
      const response = await axios.get<CandidateInfoResponse>(
        `${API_URL}/candidate/${sessionId}/${userId}`
      );
      console.log('sessionId :' + sessionId + '/' + 'userId : ' + userId);
      console.log(
        'useCandidateInfo response.data.voteTeam : ',
        response.data.data.voteTeam
      );
      console.log(
        'useCandidateInfo response.data.voteTeam.voteTeamId : ',
        response.data.data.voteTeam.voteTeamId
      );
      return response.data.data;
    },
    enabled: !!sessionId && !!userId,
  });
};
