import { describe, it, expect } from 'vitest';
import { fuseCard } from './fusionSystem';
import type { Card } from './types';

describe('fusionSystem', () => {
  const mockCard: Card = {
    id: 'test',
    name: 'Test',
    description: '',
    rarity: 'common',
    cost: 10,
    level: 1,
    xp: 0,
    stats: {}
  };

  it('should increase XP when fusing', () => {
    // Level 1 requires 1 XP to reach Level 2
    // Fusing 1 duplicate should trigger level up immediately
    const updated = fuseCard(mockCard);
    expect(updated.level).toBe(2);
    expect(updated.xp).toBe(0);
  });

  it('should handle higher level thresholds', () => {
    // Level 2 requires 2 XP to reach Level 3
    const level2Card = { ...mockCard, level: 2, xp: 0 };
    
    // First fuse: 1/2 XP
    const step1 = fuseCard(level2Card);
    expect(step1.level).toBe(2);
    expect(step1.xp).toBe(1);

    // Second fuse: 2/2 XP -> Level Up
    const step2 = fuseCard(step1);
    expect(step2.level).toBe(3);
    expect(step2.xp).toBe(0);
  });
});

