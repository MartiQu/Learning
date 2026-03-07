import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../store/gameStore';
import type { Question } from '../types';

const mockQuestions: Question[] = [
  {
    id: 'q1',
    levelId: 'iso9001-1',
    type: 'MultipleChoice',
    prompt: 'Test question 1',
    data: { options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }] },
    correctAnswer: 'a',
  },
  {
    id: 'q2',
    levelId: 'iso9001-1',
    type: 'TrueFalse',
    prompt: 'Test question 2',
    data: { statement: 'Statement' },
    correctAnswer: 'true',
  },
];

describe('gameStore', () => {
  beforeEach(() => {
    useGameStore.getState().clearSession();
  });

  it('starts a session with correct initial state', () => {
    useGameStore.getState().startSession('iso9001', 'iso9001-1', 1, mockQuestions);
    const session = useGameStore.getState().session;
    expect(session).not.toBeNull();
    expect(session?.currentIndex).toBe(0);
    expect(session?.score).toBe(0);
    expect(session?.streak).toBe(0);
    expect(session?.xpGained).toBe(0);
  });

  it('awards XP on correct answer', () => {
    useGameStore.getState().startSession('iso9001', 'iso9001-1', 1, mockQuestions);
    const correct = useGameStore.getState().submitAnswer('a');
    const session = useGameStore.getState().session;
    expect(correct).toBe(true);
    expect(session?.score).toBe(1);
    expect(session?.xpGained).toBeGreaterThan(0);
  });

  it('does not award XP on wrong answer', () => {
    useGameStore.getState().startSession('iso9001', 'iso9001-1', 1, mockQuestions);
    const correct = useGameStore.getState().submitAnswer('b');
    const session = useGameStore.getState().session;
    expect(correct).toBe(false);
    expect(session?.score).toBe(0);
    expect(session?.xpGained).toBe(0);
    expect(session?.streak).toBe(0);
  });

  it('increments streak on consecutive correct answers', () => {
    useGameStore.getState().startSession('iso9001', 'iso9001-1', 1, mockQuestions);
    useGameStore.getState().submitAnswer('a');
    useGameStore.getState().nextQuestion();
    useGameStore.getState().submitAnswer('true');
    const session = useGameStore.getState().session;
    expect(session?.streak).toBe(2);
  });

  it('resets streak on wrong answer', () => {
    useGameStore.getState().startSession('iso9001', 'iso9001-1', 1, mockQuestions);
    useGameStore.getState().submitAnswer('a'); // correct, streak=1
    useGameStore.getState().nextQuestion();
    useGameStore.getState().submitAnswer('false'); // wrong, streak=0
    const session = useGameStore.getState().session;
    expect(session?.streak).toBe(0);
  });

  it('clears session', () => {
    useGameStore.getState().startSession('iso9001', 'iso9001-1', 1, mockQuestions);
    useGameStore.getState().clearSession();
    expect(useGameStore.getState().session).toBeNull();
  });
});
