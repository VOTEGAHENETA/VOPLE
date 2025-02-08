import { create } from 'zustand';
import { ElectionSection } from '@/types/election';

export const useElectionStore = create((set) => ({
  election: {},
  getElection: () => set((state: ElectionSection) => ({ election: state })),
}));
