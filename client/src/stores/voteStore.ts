import { create } from 'zustand';

interface VoteClientState {
  selectedCandidates: {
    [voteId: number]: { candidateId: number; userName: string };
  };
  isModalOpen: boolean;
  chooseCandidate: (
    voteId: number,
    candidate: { candidateId: number; userName: string }
  ) => void;
  setModalOpen: (isOpen: boolean) => void;
}

export const useVoteStore = create<VoteClientState>((set) => ({
  selectedCandidates: {},
  isModalOpen: false,
  chooseCandidate: (voteId, candidate) =>
    set((state) => ({
      selectedCandidates: {
        ...state.selectedCandidates,
        [voteId]: candidate,
      },
    })),
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));
