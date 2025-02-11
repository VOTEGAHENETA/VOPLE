import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

interface CandidateInfoResponse {
  data: {
    user: {
      nickname: string;
      username: string;
    };
    voteTeam: {
      poster: string;
      prefix: string;
      candidateStatement: string;
    };
    pledges: Array<{ content: string }>;
  };
}

export const useGetCandidateInfo = (sessionId: string, userId: string) => {
  return useQuery({
    queryKey: ['candidateInfo', sessionId, userId],
    queryFn: async () => {
      const response = await axios.get<CandidateInfoResponse>(
        `${API_URL}/candidate/${sessionId}/${userId}`
      );
      return response.data;
    },
    enabled: !!sessionId && !!userId,
  });
};
