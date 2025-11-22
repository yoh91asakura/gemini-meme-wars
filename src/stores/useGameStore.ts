import { create } from 'zustand';

interface GameStore {
  isGameRunning: boolean;
  setGameRunning: (isRunning: boolean) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  isGameRunning: false,
  setGameRunning: (isRunning) => set({ isGameRunning: isRunning }),
}));

