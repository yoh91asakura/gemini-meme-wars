import type { Card } from './types';
import { rollGacha } from './gachaSystem';
import { CARD_POOL } from '../../data/cards';

export function generateEnemyDeck(difficultyLevel: number): Card[] {
  // Simple scaling: higher difficulty = more cards, higher rarity chance
  // Level 1: 1-2 cards, mostly common
  // Level 5: 4-5 cards, chance for rares/epics
  
  const deckSize = Math.min(5, 1 + Math.floor(difficultyLevel / 2));
  const deck: Card[] = [];
  
  // Adjust rarity weights based on difficulty
  const weights = {
      'common': Math.max(20, 100 - (difficultyLevel * 15)),
      'rare': Math.min(50, 0 + (difficultyLevel * 10)),
      'epic': Math.min(20, 0 + (difficultyLevel * 4)),
      'legendary': Math.min(10, 0 + (difficultyLevel * 1))
  };

  for (let i = 0; i < deckSize; i++) {
    const card = rollGacha(CARD_POOL, weights);
    // Enemy cards also level up with difficulty!
    const leveledCard = { ...card, level: Math.max(1, Math.floor(difficultyLevel / 2)) };
    deck.push(leveledCard);
  }

  return deck;
}

