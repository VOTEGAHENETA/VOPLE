import { create } from 'zustand';
import { VoteSession } from '@/types/election';

export const useElectionStore = create((set) => ({
  election: {},
  getElection: () => set((state: VoteSession) => ({ election: state })),
}));
