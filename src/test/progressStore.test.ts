import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressStore } from '../store/progressStore';

describe('progressStore', () => {
  beforeEach(() => {
    useProgressStore.getState().reset();
  });

  it('level 1 is always unlocked', () => {
    expect(useProgressStore.getState().isLevelUnlocked('iso9001', 1)).toBe(true);
  });

  it('level 2 is locked until level 1 is completed', () => {
    expect(useProgressStore.getState().isLevelUnlocked('iso9001', 2)).toBe(false);
    useProgressStore.getState().completeLevel('iso9001', 1, 2, 100);
    expect(useProgressStore.getState().isLevelUnlocked('iso9001', 2)).toBe(true);
  });

  it('completeLevel records stars and XP', () => {
    useProgressStore.getState().completeLevel('iso9001', 1, 3, 200);
    const p = useProgressStore.getState().getProgress('iso9001');
    expect(p.completedLevels).toContain(1);
    expect(p.levelStars[1]).toBe(3);
    expect(p.totalXP).toBe(200);
  });

  it('keeps best star count on replay', () => {
    useProgressStore.getState().completeLevel('iso9001', 1, 3, 200);
    useProgressStore.getState().completeLevel('iso9001', 1, 1, 50);
    const p = useProgressStore.getState().getProgress('iso9001');
    expect(p.levelStars[1]).toBe(3); // keeps the higher score
  });

  it('returns default progress for unknown system', () => {
    const p = useProgressStore.getState().getProgress('unknown');
    expect(p.completedLevels).toEqual([]);
    expect(p.totalXP).toBe(0);
  });
});
