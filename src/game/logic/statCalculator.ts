import type { Card, PlayerStats } from './types';

export const BASE_PLAYER_STATS: PlayerStats = {
  maxHP: 100,
  currentHP: 100,
  strength: 10,
  attackSpeed: 1.0, // 1 attack per second
  moveSpeed: 200,
  defense: 0,
  regen: 0,
  manaRegen: 5, // 5 mana per second default
  critChance: 0, // New
  critMultiplier: 1.5, // New
  dodgeChance: 0, // New
};

export function aggregateStats(baseStats: PlayerStats, cards: Card[]): PlayerStats {
  const finalStats = { ...baseStats };

  for (const card of cards) {
    const multiplier = 1 + (card.level - 1) * 0.2; // 20% stats increase per level
    
    if (card.stats.maxHP) finalStats.maxHP += card.stats.maxHP * multiplier;
    if (card.stats.strength) finalStats.strength += card.stats.strength * multiplier;
    if (card.stats.attackSpeed) finalStats.attackSpeed += card.stats.attackSpeed * multiplier;
    if (card.stats.moveSpeed) finalStats.moveSpeed += card.stats.moveSpeed * multiplier;
    if (card.stats.defense) finalStats.defense += card.stats.defense * multiplier;
    if (card.stats.regen) finalStats.regen += card.stats.regen * multiplier;
    if (card.stats.manaRegen) finalStats.manaRegen += card.stats.manaRegen * multiplier;
    
    // Percentages usually don't scale linearly with level to avoid broken math (100% dodge)
    // Let's scale them slower: 5% per level
    const percentMultiplier = 1 + (card.level - 1) * 0.05;
    if (card.stats.critChance) finalStats.critChance! += card.stats.critChance * percentMultiplier;
    if (card.stats.critMultiplier) finalStats.critMultiplier! += card.stats.critMultiplier * percentMultiplier;
    if (card.stats.dodgeChance) finalStats.dodgeChance! += card.stats.dodgeChance * percentMultiplier;
  }

  // Cap some stats
  if (finalStats.dodgeChance! > 0.75) finalStats.dodgeChance = 0.75; // Cap dodge at 75%

  // We'll reset currentHP to maxHP for the purpose of "Starting Stats"
  finalStats.currentHP = finalStats.maxHP;

  return finalStats;
}
