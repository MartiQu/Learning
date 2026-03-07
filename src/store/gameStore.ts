import { create } from 'zustand';
import type { GameSession, Question } from '../types';

interface GameState {
  session: GameSession | null;
  startSession: (systemId: string, levelId: string, levelNumber: number, questions: Question[]) => void;
  submitAnswer: (answer: string | string[] | Record<string, string>) => boolean;
  nextQuestion: () => void;
  finishSession: () => void;
  clearSession: () => void;
}

const XP_PER_CORRECT = 50;
const STREAK_BONUS = 10;

export const useGameStore = create<GameState>()((set, get) => ({
  session: null,

  startSession(systemId, levelId, levelNumber, questions) {
    set({
      session: {
        systemId,
        levelId,
        levelNumber,
        questions,
        currentIndex: 0,
        answers: {},
        score: 0,
        streak: 0,
        xpGained: 0,
        lives: 3,
        lastXpGained: 0,
        finished: false,
      },
    });
  },

  submitAnswer(answer) {
    const { session } = get();
    if (!session) return false;

    const question = session.questions[session.currentIndex];
    if (!question) return false;

    const isCorrect = checkAnswer(answer, question.correctAnswer);
    const newStreak = isCorrect ? session.streak + 1 : 0;
    const baseXp = question.xpReward ?? XP_PER_CORRECT;
    const xpGain = isCorrect ? baseXp + newStreak * STREAK_BONUS : 0;
    const newLives = isCorrect ? session.lives : Math.max(0, session.lives - 1);

    set({
      session: {
        ...session,
        answers: { ...session.answers, [question.id]: answer },
        score: isCorrect ? session.score + 1 : session.score,
        streak: newStreak,
        xpGained: session.xpGained + xpGain,
        lives: newLives,
        lastXpGained: xpGain,
      },
    });

    return isCorrect;
  },

  nextQuestion() {
    const { session } = get();
    if (!session) return;
    set({
      session: {
        ...session,
        currentIndex: session.currentIndex + 1,
      },
    });
  },

  finishSession() {
    const { session } = get();
    if (!session) return;
    set({ session: { ...session, finished: true } });
  },

  clearSession() {
    set({ session: null });
  },
}));

function checkAnswer(
  given: string | string[] | Record<string, string>,
  correct: string | string[] | Record<string, string>
): boolean {
  if (typeof correct === 'string' && typeof given === 'string') {
    return given.trim().toLowerCase() === correct.trim().toLowerCase();
  }
  if (Array.isArray(correct) && Array.isArray(given)) {
    if (given.length !== correct.length) return false;
    return correct.every((v, i) => v === given[i]);
  }
  if (typeof correct === 'object' && !Array.isArray(correct) && typeof given === 'object' && !Array.isArray(given)) {
    const cKeys = Object.keys(correct);
    if (cKeys.length !== Object.keys(given).length) return false;
    return cKeys.every((k) => (correct as Record<string,string>)[k] === (given as Record<string,string>)[k]);
  }
  return false;
}
