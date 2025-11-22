import type { Card, PlayerStats, CardEffect } from './types';

export interface ActiveCardState {
  cardId: string;
  currentMana: number;
  maxMana: number;
  isReady: boolean;
  definition: Card;
}

export interface BattleState {
  cards: ActiveCardState[];
}

export function initializeBattleState(deck: Card[]): BattleState {
  return {
    cards: deck
      .filter(card => card.manaMax && card.ultimate) // Only cards with ultimates
      .map(card => ({
        cardId: card.id,
        currentMana: 0,
        maxMana: card.manaMax!,
        isReady: false,
        definition: card,
      })),
  };
}

export function tickBattleState(
  state: BattleState, 
  deltaTimeSeconds: number, 
  playerStats: PlayerStats
): { newState: BattleState; triggeredEffects: CardEffect[] } {
  const newState = {
    cards: state.cards.map(card => ({ ...card })),
  };
  const triggeredEffects: CardEffect[] = [];

  const manaGain = playerStats.manaRegen * deltaTimeSeconds;

  for (const card of newState.cards) {
    if (!card.isReady) {
      card.currentMana += manaGain;
      
      if (card.currentMana >= card.maxMana) {
        card.currentMana = 0; // Reset mana immediately (or keep overflow?) Let's reset for simple loop
        card.isReady = true; // Mark as ready to fire
        
        // In this simple auto-battler, we fire immediately
        if (card.definition.ultimate) {
            triggeredEffects.push(card.definition.ultimate);
        }
        card.isReady = false; // Reset ready state after fire
      }
    }
  }

  return { newState, triggeredEffects };
}

