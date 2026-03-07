import { describe, it, expect } from 'vitest';
import { useGameStore } from '../store/gameStore';

describe('answer checking', () => {
  it('string comparison is case-insensitive', () => {
    useGameStore.getState().startSession('s', 'l', 1, [{
      id: 'q',
      levelId: 'l',
      type: 'FillBlank',
      prompt: 'p',
      data: { before: '', after: '' },
      correctAnswer: 'Improvement',
    }]);
    const result = useGameStore.getState().submitAnswer('improvement');
    expect(result).toBe(true);
    useGameStore.getState().clearSession();
  });

  it('array comparison checks order', () => {
    useGameStore.getState().startSession('s', 'l', 1, [{
      id: 'q',
      levelId: 'l',
      type: 'DragSort',
      prompt: 'p',
      data: { items: [] },
      correctAnswer: ['a', 'b', 'c'],
    }]);
    expect(useGameStore.getState().submitAnswer(['a', 'b', 'c'])).toBe(true);
    useGameStore.getState().clearSession();
  });

  it('wrong order fails', () => {
    useGameStore.getState().startSession('s', 'l', 1, [{
      id: 'q',
      levelId: 'l',
      type: 'DragSort',
      prompt: 'p',
      data: { items: [] },
      correctAnswer: ['a', 'b', 'c'],
    }]);
    expect(useGameStore.getState().submitAnswer(['a', 'c', 'b'])).toBe(false);
    useGameStore.getState().clearSession();
  });

  it('matching checks all key-value pairs', () => {
    useGameStore.getState().startSession('s', 'l', 1, [{
      id: 'q',
      levelId: 'l',
      type: 'Matching',
      prompt: 'p',
      data: { left: [], right: [] },
      correctAnswer: { l1: 'r1', l2: 'r2' },
    }]);
    expect(useGameStore.getState().submitAnswer({ l1: 'r1', l2: 'r2' })).toBe(true);
    useGameStore.getState().clearSession();
  });
});
