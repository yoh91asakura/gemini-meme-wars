import type { Card } from './types';

export interface LootTableEntry {
  cardId: string;
  weight: number;
}

export function rollGacha(pool: Card[], rarityWeights: Record<string, number> = {
  'common': 60,
  'rare': 30,
  'epic': 8,
  'legendary': 2
}): Card {
  // 1. Determine Rarity
  const totalWeight = Object.values(rarityWeights).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  let selectedRarity = 'common';

  for (const [rarity, weight] of Object.entries(rarityWeights)) {
    random -= weight;
    if (random <= 0) {
      selectedRarity = rarity;
      break;
    }
  }

  // 2. Filter pool by rarity
  const rarityPool = pool.filter(c => c.rarity === selectedRarity);
  
  // Fallback if pool is empty for that rarity (should not happen in prod)
  const finalPool = rarityPool.length > 0 ? rarityPool : pool;

  // 3. Pick random card from that rarity
  const randomIndex = Math.floor(Math.random() * finalPool.length);
  return finalPool[randomIndex];
}
