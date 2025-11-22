import { describe, it, expect } from 'vitest';
import { aggregateStats, BASE_PLAYER_STATS } from './statCalculator';
import type { Card } from './types';

describe('statCalculator', () => {
  it('should return base stats when no cards are provided', () => {
    const stats = aggregateStats(BASE_PLAYER_STATS, []);
    expect(stats).toEqual(BASE_PLAYER_STATS);
  });

  it('should correctly sum up stats from cards', () => {
    const cards: Card[] = [
      {
        id: '1',
        name: 'Beefy',
        description: 'More HP',
        cost: 1,
        rarity: 'common',
        level: 1,
        xp: 0,
        stats: { maxHP: 50, strength: 5 },
      },
      {
        id: '2',
        name: 'Speedy',
        description: 'Faster',
        cost: 1,
        rarity: 'common',
        level: 1,
        xp: 0,
        stats: { attackSpeed: 0.5, moveSpeed: 50 },
      },
    ];

    const stats = aggregateStats(BASE_PLAYER_STATS, cards);

    expect(stats.maxHP).toBe(BASE_PLAYER_STATS.maxHP + 50);
    expect(stats.strength).toBe(BASE_PLAYER_STATS.strength + 5);
    expect(stats.attackSpeed).toBe(BASE_PLAYER_STATS.attackSpeed + 0.5);
    expect(stats.moveSpeed).toBe(BASE_PLAYER_STATS.moveSpeed + 50);
    expect(stats.currentHP).toBe(stats.maxHP);
  });

  it('should handle negative stats (debuff cards or trade-offs)', () => {
    const cards: Card[] = [
      {
        id: '3',
        name: 'Heavy Armor',
        description: 'More Defense, Less Speed',
        cost: 1,
        rarity: 'rare',
        level: 1,
        xp: 0,
        stats: { defense: 10, moveSpeed: -50 },
      },
    ];

    const stats = aggregateStats(BASE_PLAYER_STATS, cards);

    expect(stats.defense).toBe(BASE_PLAYER_STATS.defense + 10);
    expect(stats.moveSpeed).toBe(BASE_PLAYER_STATS.moveSpeed - 50);
  });

  it('should scale stats with level', () => {
    const cards: Card[] = [
      {
        id: '1',
        name: 'Beefy Level 2',
        description: 'More HP',
        cost: 1,
        rarity: 'common',
        level: 2, // Level 2 = 20% increase -> 1.2 multiplier
        xp: 0,
        stats: { maxHP: 100 },
      },
    ];

    const stats = aggregateStats(BASE_PLAYER_STATS, cards);

    // 100 (base) + 100 * 1.2 = 220
    expect(stats.maxHP).toBe(220);
  });
});
