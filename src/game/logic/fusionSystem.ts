import type { Card } from './types';

// Logic:
// 1. Check if card exists in inventory
// 2. If yes, add XP (1 XP per duplicate)
// 3. Check for level up (XP required = currentLevel * 1)
//    Level 1 -> 2 requires 1 duplicate (1 XP)
//    Level 2 -> 3 requires 2 duplicates (2 XP), cumulative? 
//    Let's keep it simple: 
//    XP is cumulative. 
//    Thresholds:
//    Level 2: 1 XP
//    Level 3: 3 XP (1 + 2)
//    Level 4: 6 XP (1 + 2 + 3)
// 4. Return updated card

export function getXpForNextLevel(currentLevel: number): number {
  return currentLevel; 
}

export function fuseCard(existingCard: Card): Card {
  const newCard = { ...existingCard };
  newCard.xp += 1;

  const xpRequired = getXpForNextLevel(newCard.level);
  
  // Check if we have enough XP to level up
  // In this simple model, XP is consumed? Or cumulative total?
  // Let's say XP is "Duplicates count towards next level".
  // So if I am level 1, I have 0/1 XP. Get 1 duplicate -> 1/1 -> Level Up -> 0/2 XP.
  
  if (newCard.xp >= xpRequired) {
    newCard.level += 1;
    newCard.xp -= xpRequired; // Consume XP
  }

  return newCard;
}

