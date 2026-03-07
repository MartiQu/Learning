import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress } from '../types';

interface ProgressState {
  progress: Record<string, UserProgress>; // keyed by systemId
  streakDays: number;
  lastActivityDate: string; // 'YYYY-MM-DD'
  addXP: (systemId: string, xp: number) => void;
  completeLevel: (systemId: string, levelNumber: number, stars: number, xp: number) => void;
  isLevelUnlocked: (systemId: string, levelNumber: number) => boolean;
  getProgress: (systemId: string) => UserProgress;
  reset: () => void;
}

const defaultProgress = (systemId: string): UserProgress => ({
  systemId,
  completedLevels: [],
  levelStars: {},
  totalXP: 0,
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      streakDays: 0,
      lastActivityDate: '',

      getProgress(systemId) {
        return get().progress[systemId] ?? defaultProgress(systemId);
      },

      isLevelUnlocked(systemId, levelNumber) {
        if (levelNumber === 1) return true;
        const p = get().progress[systemId];
        if (!p) return false;
        return p.completedLevels.includes(levelNumber - 1);
      },

      addXP(systemId, xp) {
        set((state) => {
          const current = state.progress[systemId] ?? defaultProgress(systemId);
          return {
            progress: {
              ...state.progress,
              [systemId]: { ...current, totalXP: current.totalXP + xp },
            },
          };
        });
      },

      completeLevel(systemId, levelNumber, stars, xp) {
        const today = new Date().toISOString().split('T')[0];
        const { lastActivityDate, streakDays } = get();
        let newStreak = streakDays;
        if (lastActivityDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          newStreak = lastActivityDate === yesterday ? streakDays + 1 : 1;
        }
        set((state) => {
          const current = state.progress[systemId] ?? defaultProgress(systemId);
          const alreadyCompleted = current.completedLevels.includes(levelNumber);
          const existingStars = current.levelStars[levelNumber] ?? 0;
          return {
            streakDays: newStreak,
            lastActivityDate: today,
            progress: {
              ...state.progress,
              [systemId]: {
                ...current,
                completedLevels: alreadyCompleted
                  ? current.completedLevels
                  : [...current.completedLevels, levelNumber],
                levelStars: {
                  ...current.levelStars,
                  [levelNumber]: Math.max(existingStars, stars),
                },
                totalXP: current.totalXP + xp,
              },
            },
          };
        });
      },

      reset() {
        set({ progress: {}, streakDays: 0, lastActivityDate: '' });
      },
    }),
    { name: 'qs-progress' }
  )
);
