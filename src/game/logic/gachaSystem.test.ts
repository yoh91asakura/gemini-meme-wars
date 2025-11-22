import { describe, it, expect } from 'vitest';
import { rollGacha } from './gachaSystem';
import type { Card } from './types';

describe('gachaSystem', () => {
  const mockPool: Card[] = [
    { id: 'common1', rarity: 'common' } as any,
    { id: 'common2', rarity: 'common' } as any,
    { id: 'rare1', rarity: 'rare' } as any,
    { id: 'legendary1', rarity: 'legendary' } as any,
  ];

  it('should return a card from the pool', () => {
    const card = rollGacha(mockPool);
    expect(mockPool).toContain(card);
  });

  it('should respect forced rarity weights (100% common)', () => {
    // 100% chance for common
    const weights = { 'common': 100, 'rare': 0, 'legendary': 0 };
    
    for (let i = 0; i < 10; i++) {
        const card = rollGacha(mockPool, weights);
        expect(card.rarity).toBe('common');
    }
  });

  it('should respect forced rarity weights (100% legendary)', () => {
    const weights = { 'common': 0, 'rare': 0, 'legendary': 100 };
    const card = rollGacha(mockPool, weights);
    expect(card.rarity).toBe('legendary');
  });
});

