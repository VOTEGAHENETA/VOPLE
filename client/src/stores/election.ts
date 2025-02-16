import { create } from 'zustand';
import { ElectionResponse } from '@/types/voteSession';

interface electionStore {
  election: ElectionResponse | null;
  isHost: boolean;
  setElection: (state: ElectionResponse) => void;
  setIsHost: (mine: boolean) => void;
}

export const useElectionStore = create<electionStore>((set) => ({
  election: null,
  isHost: false,
  setElection: (state: ElectionResponse) => set({ election: state }),
  setIsHost: (mine: boolean) => set({ isHost: mine }),
}));
