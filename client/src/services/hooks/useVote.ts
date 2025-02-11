import { useMutation } from '@tanstack/react-query';
import { postVote } from '../election';
import { VoteRequest, VoteSelection } from '@/types/vote';
import { CandidateSessionData } from '@/types/voteSession';

interface UseVoteMutationProps {
  voteSession: CandidateSessionData;
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string };
  };
  voteComplete?: () => void;
}

export const useVoteMutation = ({
  voteSession,
  selectedCandidates,
  voteComplete,
}: UseVoteMutationProps) => {
  const createVotePayload = (): { sessionId: number; payload: VoteRequest } => {
    const voteSelections: VoteSelection[] = Object.entries(
      selectedCandidates
    ).map(([voteId, candidate]) => {
      const vote = voteSession.voteFindDtos.find(
        (v) => v.voteId === Number(voteId)
      );
      const team = vote?.voteTeams.find((team) =>
        team.candidates.some((c) => c.candidateId === candidate.candidateId)
      );

      return {
        voteId: Number(voteId),
        voteTeamId: team?.voteTeamId || 0,
      };
    });

    return {
      sessionId: voteSession.sessionId,
      payload: {
        userId: 0, // 실제 userId로 대체 필요
        voteSelections,
      },
    };
  };

  return useMutation({
    mutationFn: () => {
      const voteData = createVotePayload();
      return postVote(voteData);
    },
    onSuccess: () => {
      setTimeout(() => {
        voteComplete?.();
      }, 3000);
    },
  });
};
