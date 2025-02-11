import { User } from '@/types/user';
import { create } from 'zustand';

interface CandidateStore {
  selectedCandidates: Record<number, User[]>;
  activeTeamId: number | null;
  openCandidateModal: { voteId: number; voteName: string } | null;
  setOpenCandidateModal: (voteId: number, voteName: string) => void;
  setActiveTeamId: (teamId: number) => void;
  addCandidate: (teamId: number, candidate: User) => void;
  removeCandidate: (teamId: number, candidateId: number) => void;
  resetCandidates: () => void;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
  selectedCandidates: {},
  activeTeamId: null,
  openCandidateModal: null,

  setOpenCandidateModal: (voteId, voteName) => {
    if (voteId === -1) {
      return set({ openCandidateModal: null });
    }
    return set({ openCandidateModal: { voteId: voteId, voteName: voteName } });
  },

  setActiveTeamId: (teamId) => set({ activeTeamId: teamId }),

  addCandidate: (teamId, candidate) =>
    set((state) => {
      const existingTeam = state.selectedCandidates[teamId] || [];
      if (existingTeam.find((user) => user.userId === candidate.userId)) {
        alert('이미 선택된 후보입니다.');
        return state;
      }
      return {
        selectedCandidates: {
          ...state.selectedCandidates,
          [teamId]: [...existingTeam, candidate],
        },
      };
    }),

  removeCandidate: (teamId, candidateId) =>
    set((state) => {
      if (!window.confirm('정말로 이 후보를 삭제하시겠습니까?')) {
        return state;
      }
      const existingTeam = state.selectedCandidates[teamId] || [];
      return {
        selectedCandidates: {
          ...state.selectedCandidates,
          [teamId]: existingTeam.filter((user) => user.userId !== candidateId),
        },
      };
    }),

  resetCandidates: () => set({ selectedCandidates: {}, activeTeamId: null }),
}));
