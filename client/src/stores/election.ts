import { create } from 'zustand';
import { ElectionResponse } from '@/types/voteSession';

interface electionStore {
  election: ElectionResponse | null;
  setElection: (state: ElectionResponse) => void;
}

export const useElectionStore = create<electionStore>((set) => ({
  election: null,
  setElection: (state: ElectionResponse) => set({ election: state }),
}));
