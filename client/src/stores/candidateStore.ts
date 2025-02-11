import { CandidateList, User } from '@/types/user';
import { create } from 'zustand';

interface CandidateStore {
  sendCandidates: Record<number, CandidateList>;
  activeTeamId: number | null;
  openCandidateModal: { voteId: number; voteName: string } | null;
  setSendCandidates: (candidateList: CandidateList) => void;
  setOpenCandidateModal: (voteId: number, voteName: string) => void;
  setActiveTeamId: (teamId: number) => void;
  addCandidate: (candidate: User) => void;
  removeCandidate: (candidateId: number) => void;
  resetCandidate: () => void;
}

export const useCandidateStore = create<CandidateStore>((set) => ({
  sendCandidates: {},
  activeTeamId: null,
  openCandidateModal: null,

  setSendCandidates: (candidateList) =>
    set(() => {
      const updatedSendCandidates: Record<number, CandidateList> = {};

      Object.entries(candidateList).forEach(([, candidates]) => {
        candidates.forEach((candidate) => {
          const teamId = candidate.voteTeamId;
          const teamKey = String(teamId);

          if (!updatedSendCandidates[teamId]) {
            updatedSendCandidates[teamId] = {};
          }

          if (!updatedSendCandidates[teamId][teamKey]) {
            updatedSendCandidates[teamId][teamKey] = [];
          }

          updatedSendCandidates[teamId][teamKey].push(candidate);
        });
      });

      return { sendCandidates: updatedSendCandidates };
    }),

  setOpenCandidateModal: (voteId, voteName) => {
    if (voteId === -1) {
      return set({ openCandidateModal: null });
    }
    return set({ openCandidateModal: { voteId, voteName } });
  },

  setActiveTeamId: (teamId) => set({ activeTeamId: teamId }),

  addCandidate: (user) =>
    set((state) => {
      const teamId = state.activeTeamId;
      if (teamId === null) return state;

      const teamKey = String(teamId);
      const existingCandidates = state.sendCandidates[teamId]?.[teamKey] || [];

      return {
        sendCandidates: {
          ...state.sendCandidates,
          [teamId]: {
            ...state.sendCandidates[teamId],
            [teamKey]: [
              ...existingCandidates,
              {
                voteTeamId: teamId,
                userId: user.userId,
                username: user.username,
              },
            ],
          },
        },
      };
    }),

  removeCandidate: (candidateId) =>
    set((state) => {
      const teamId = state.activeTeamId;
      if (teamId === null) return state;

      const teamKey = String(teamId);
      const existingCandidates = state.sendCandidates[teamId]?.[teamKey] || [];

      return {
        sendCandidates: {
          ...state.sendCandidates,
          [teamId]: {
            ...state.sendCandidates[teamId],
            [teamKey]: existingCandidates.filter(
              (candidate) => candidate.userId !== candidateId
            ),
          },
        },
      };
    }),

  resetCandidate: () =>
    set((state) => {
      const teamId = state.activeTeamId;
      if (teamId === null) return state;

      const updatedSendCandidates = { ...state.sendCandidates };
      delete updatedSendCandidates[teamId];

      return { sendCandidates: updatedSendCandidates };
    }),
}));
