import { info } from '@/types/voteSession';
import { CandidateSessionData } from '@/types/voteSession';
import { create } from 'zustand';

interface VoteState {
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string };
  };
  isModalOpen: boolean;
  voteSession: CandidateSessionData;
  chooseCandidate: (
    voteId: number,
    candidate: { candidateId: number; userName: string }
  ) => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  selectedCandidates: {},
  isModalOpen: false,
  voteSession: info, // mockdata 사용
  chooseCandidate: (voteId, candidate) =>
    set((state) => ({
      selectedCandidates: {
        ...state.selectedCandidates,
        [voteId]: candidate,
      },
    })),
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));
