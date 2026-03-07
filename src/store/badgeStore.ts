import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BadgeDef {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: 'first_lesson', label: 'Pirmā nodarbība', description: 'Pabeigta pirmā nodarbība!', icon: '🎓' },
  { id: 'perfect_lesson', label: 'Ideāls rezultāts', description: '100% rezultāts nodarbībā!', icon: '⭐' },
  { id: 'streak_3', label: '3 dienu sērija', description: '3 dienas pēc kārtas!', icon: '🔥' },
  { id: 'streak_7', label: '7 dienu sērija', description: '7 dienas pēc kārtas!', icon: '🌟' },
  { id: 'xp_100', label: '100 XP', description: 'Nopelnīti 100 XP!', icon: '💫' },
  { id: 'xp_500', label: '500 XP', description: 'Nopelnīti 500 XP!', icon: '💎' },
  { id: 'lessons_5', label: '5 nodarbības', description: 'Pabeigtas 5 nodarbības!', icon: '📚' },
  { id: 'first_system', label: 'Meistars', description: 'Pilnībā apgūta viena sistēma!', icon: '🏆' },
];

interface CheckParams {
  totalCompletedLevels: number;
  perfectScore: boolean;
  streakDays: number;
  totalXP: number;
  systemCompleted: boolean;
}

interface BadgeState {
  earnedBadgeIds: string[];
  checkAndAward: (params: CheckParams) => string[];
  reset: () => void;
}

export const useBadgeStore = create<BadgeState>()(
  persist(
    (set, get) => ({
      earnedBadgeIds: [],

      checkAndAward({ totalCompletedLevels, perfectScore, streakDays, totalXP, systemCompleted }) {
        const { earnedBadgeIds } = get();
        const newlyEarned: string[] = [];

        const tryAward = (id: string, condition: boolean) => {
          if (condition && !earnedBadgeIds.includes(id) && !newlyEarned.includes(id)) {
            newlyEarned.push(id);
          }
        };

        tryAward('first_lesson', totalCompletedLevels >= 1);
        tryAward('perfect_lesson', perfectScore);
        tryAward('streak_3', streakDays >= 3);
        tryAward('streak_7', streakDays >= 7);
        tryAward('xp_100', totalXP >= 100);
        tryAward('xp_500', totalXP >= 500);
        tryAward('lessons_5', totalCompletedLevels >= 5);
        tryAward('first_system', systemCompleted);

        if (newlyEarned.length > 0) {
          set((s) => ({ earnedBadgeIds: [...s.earnedBadgeIds, ...newlyEarned] }));
        }
        return newlyEarned;
      },

      reset() {
        set({ earnedBadgeIds: [] });
      },
    }),
    { name: 'qs-badges' }
  )
);
