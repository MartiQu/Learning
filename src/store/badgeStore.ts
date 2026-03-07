import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BadgeProgressData {
  totalXP: number;
  totalCompletedLevels: number;
  streakDays: number;
  perfectScoreCount: number;
  threeStarLevelsCount: number;
  systemsFullyCompleted: number;
  systemsStarted: number;
}

export interface BadgeDef {
  id: string;
  label: string;
  description: string;
  icon: string;
  tier: 1 | 2 | 3 | 4 | 'secret';
  color: string;
  secret?: true;
  getProgress?: (data: BadgeProgressData) => { current: number; total: number; unit: string };
}

const T = {
  1: '#4ecdc4',
  2: '#7c6fff',
  3: '#e8c547',
  4: '#ff6b6b',
  secret: '#c084fc',
} as const;

export const BADGE_DEFS: BadgeDef[] = [
  {
    id: 'first_lesson', label: 'Pirmais solis', description: 'Pabeigta pirmā nodarbība!',
    icon: '🎓', tier: 1, color: T[1],
    getProgress: (d) => ({ current: Math.min(d.totalCompletedLevels, 1), total: 1, unit: 'nodarbības' }),
  },
  {
    id: 'xp_100', label: '100 XP', description: 'Nopelnīti 100 XP!',
    icon: '✨', tier: 1, color: T[1],
    getProgress: (d) => ({ current: Math.min(d.totalXP, 100), total: 100, unit: 'XP' }),
  },
  {
    id: 'perfect_lesson', label: 'Ideāls!', description: '100% rezultāts nodarbībā!',
    icon: '⭐', tier: 1, color: T[1],
    getProgress: (d) => ({ current: Math.min(d.perfectScoreCount, 1), total: 1, unit: 'ideālas' }),
  },
  {
    id: 'streak_3', label: '3 dienu sērija', description: '3 dienas pēc kārtas!',
    icon: '🔥', tier: 1, color: T[1],
    getProgress: (d) => ({ current: Math.min(d.streakDays, 3), total: 3, unit: 'dienas' }),
  },
  {
    id: 'lessons_5', label: '5 nodarbības', description: 'Pabeigtas 5 nodarbības!',
    icon: '📚', tier: 2, color: T[2],
    getProgress: (d) => ({ current: Math.min(d.totalCompletedLevels, 5), total: 5, unit: 'nodarbības' }),
  },
  {
    id: 'xp_500', label: '500 XP', description: 'Nopelnīti 500 XP!',
    icon: '💎', tier: 2, color: T[2],
    getProgress: (d) => ({ current: Math.min(d.totalXP, 500), total: 500, unit: 'XP' }),
  },
  {
    id: 'streak_7', label: '7 dienu sērija', description: '7 dienas pēc kārtas!',
    icon: '🌟', tier: 2, color: T[2],
    getProgress: (d) => ({ current: Math.min(d.streakDays, 7), total: 7, unit: 'dienas' }),
  },
  {
    id: 'perfect_3', label: 'Precīzitāte', description: '3 reizes 100% rezultāts!',
    icon: '🎯', tier: 2, color: T[2],
    getProgress: (d) => ({ current: Math.min(d.perfectScoreCount, 3), total: 3, unit: 'ideālas' }),
  },
  {
    id: 'three_stars_5', label: 'Zvaigžņu vācējs', description: '5 līmeņi ar 3 zvaigznēm!',
    icon: '★★★', tier: 2, color: T[2],
    getProgress: (d) => ({ current: Math.min(d.threeStarLevelsCount, 5), total: 5, unit: '3★ līmeņi' }),
  },
  {
    id: 'first_system', label: 'Meistars', description: 'Pilnībā apgūta viena sistēma!',
    icon: '🏆', tier: 3, color: T[3],
    getProgress: (d) => ({ current: Math.min(d.systemsFullyCompleted, 1), total: 1, unit: 'sistēmas' }),
  },
  {
    id: 'xp_1000', label: '1000 XP', description: 'Nopelnīti 1000 XP!',
    icon: '💰', tier: 3, color: T[3],
    getProgress: (d) => ({ current: Math.min(d.totalXP, 1000), total: 1000, unit: 'XP' }),
  },
  {
    id: 'lessons_10', label: '10 nodarbības', description: 'Pabeigtas 10 nodarbības!',
    icon: '🎒', tier: 3, color: T[3],
    getProgress: (d) => ({ current: Math.min(d.totalCompletedLevels, 10), total: 10, unit: 'nodarbības' }),
  },
  {
    id: 'streak_14', label: '2 nedēļu sērija', description: '14 dienas pēc kārtas!',
    icon: '🌙', tier: 3, color: T[3],
    getProgress: (d) => ({ current: Math.min(d.streakDays, 14), total: 14, unit: 'dienas' }),
  },
  {
    id: 'two_systems', label: 'Dubultmeistars', description: 'Divas sistēmas pilnībā apgūtas!',
    icon: '👑', tier: 4, color: T[4],
    getProgress: (d) => ({ current: Math.min(d.systemsFullyCompleted, 2), total: 2, unit: 'sistēmas' }),
  },
  {
    id: 'xp_2000', label: '2000 XP', description: 'Nopelnīti 2000 XP!',
    icon: '🔮', tier: 4, color: T[4],
    getProgress: (d) => ({ current: Math.min(d.totalXP, 2000), total: 2000, unit: 'XP' }),
  },
  {
    id: 'streak_30', label: 'Mēneša sērija', description: '30 dienas pēc kārtas!',
    icon: '⚡', tier: 4, color: T[4],
    getProgress: (d) => ({ current: Math.min(d.streakDays, 30), total: 30, unit: 'dienas' }),
  },
  {
    id: 'explorer', label: 'Pētnieks', description: 'Tu izmēģināji visas 5 mācību sistēmas!',
    icon: '🌌', tier: 'secret', color: T.secret, secret: true,
    getProgress: (d) => ({ current: Math.min(d.systemsStarted, 5), total: 5, unit: 'sistēmas' }),
  },
];

interface CheckParams {
  totalCompletedLevels: number;
  perfectScore: boolean;
  streakDays: number;
  totalXP: number;
  systemsFullyCompleted: number;
  threeStarLevelsCount: number;
  allSystemsStarted: boolean;
}

interface BadgeState {
  earnedBadgeIds: string[];
  perfectScoreCount: number;
  checkAndAward: (params: CheckParams) => string[];
  reset: () => void;
}

export const useBadgeStore = create<BadgeState>()(
  persist(
    (set, get) => ({
      earnedBadgeIds: [],
      perfectScoreCount: 0,

      checkAndAward({ totalCompletedLevels, perfectScore, streakDays, totalXP, systemsFullyCompleted, threeStarLevelsCount, allSystemsStarted }) {
        const state = get();
        const { earnedBadgeIds } = state;
        const perfectScoreCount = state.perfectScoreCount + (perfectScore ? 1 : 0);
        const newlyEarned: string[] = [];

        const tryAward = (id: string, condition: boolean) => {
          if (condition && !earnedBadgeIds.includes(id) && !newlyEarned.includes(id)) {
            newlyEarned.push(id);
          }
        };

        tryAward('first_lesson', totalCompletedLevels >= 1);
        tryAward('xp_100', totalXP >= 100);
        tryAward('perfect_lesson', perfectScoreCount >= 1);
        tryAward('streak_3', streakDays >= 3);
        tryAward('lessons_5', totalCompletedLevels >= 5);
        tryAward('xp_500', totalXP >= 500);
        tryAward('streak_7', streakDays >= 7);
        tryAward('perfect_3', perfectScoreCount >= 3);
        tryAward('three_stars_5', threeStarLevelsCount >= 5);
        tryAward('first_system', systemsFullyCompleted >= 1);
        tryAward('xp_1000', totalXP >= 1000);
        tryAward('lessons_10', totalCompletedLevels >= 10);
        tryAward('streak_14', streakDays >= 14);
        tryAward('two_systems', systemsFullyCompleted >= 2);
        tryAward('xp_2000', totalXP >= 2000);
        tryAward('streak_30', streakDays >= 30);
        tryAward('explorer', allSystemsStarted);

        set((s) => ({
          perfectScoreCount: s.perfectScoreCount + (perfectScore ? 1 : 0),
          earnedBadgeIds: newlyEarned.length > 0 ? [...s.earnedBadgeIds, ...newlyEarned] : s.earnedBadgeIds,
        }));
        return newlyEarned;
      },

      reset() {
        set({ earnedBadgeIds: [], perfectScoreCount: 0 });
      },
    }),
    { name: 'qs-badges' }
  )
);
