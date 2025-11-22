import type { PlayerStats } from './types';

export interface DamageResult {
  damage: number;
  isCrit: boolean;
  isDodge: boolean;
}

export function calculateDamage(attacker: PlayerStats, defender: PlayerStats): DamageResult {
  // 1. Dodge Check
  if (defender.dodgeChance && Math.random() < defender.dodgeChance) {
    return { damage: 0, isCrit: false, isDodge: true };
  }

  // 2. Crit Check
  let isCrit = false;
  let multiplier = 1;
  if (attacker.critChance && Math.random() < attacker.critChance) {
    isCrit = true;
    multiplier = attacker.critMultiplier || 1.5;
  }

  // 3. Damage Formula
  // Damage = (Strength * Multiplier) - Defense
  const rawDamage = (attacker.strength * multiplier) - defender.defense;
  
  return {
    damage: Math.max(1, Math.floor(rawDamage)),
    isCrit,
    isDodge: false
  };
}
