import { describe, it, expect } from 'vitest';
import { calculateDamage } from './damageCalculator';
import type { PlayerStats } from './types';
import { BASE_PLAYER_STATS } from './statCalculator';

describe('damageCalculator', () => {
  it('should calculate damage correctly based on strength and defense', () => {
    const attacker: PlayerStats = { ...BASE_PLAYER_STATS, strength: 20 };
    const defender: PlayerStats = { ...BASE_PLAYER_STATS, defense: 5 };

    const result = calculateDamage(attacker, defender);
    expect(result.damage).toBe(15);
    expect(result.isCrit).toBe(false);
    expect(result.isDodge).toBe(false);
  });

  it('should return at least 1 damage even if defense is high', () => {
    const attacker: PlayerStats = { ...BASE_PLAYER_STATS, strength: 10 };
    const defender: PlayerStats = { ...BASE_PLAYER_STATS, defense: 50 };

    const result = calculateDamage(attacker, defender);
    expect(result.damage).toBe(1);
    expect(result.isCrit).toBe(false);
    expect(result.isDodge).toBe(false);
  });

  it('should handle zero defense', () => {
    const attacker: PlayerStats = { ...BASE_PLAYER_STATS, strength: 15 };
    const defender: PlayerStats = { ...BASE_PLAYER_STATS, defense: 0 };

    const result = calculateDamage(attacker, defender);
    expect(result.damage).toBe(15);
    expect(result.isCrit).toBe(false);
    expect(result.isDodge).toBe(false);
  });
});

