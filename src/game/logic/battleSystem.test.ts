import { describe, it, expect } from 'vitest';
import { initializeBattleState, tickBattleState } from './battleSystem';
import type { Card, PlayerStats } from './types';
import { BASE_PLAYER_STATS } from './statCalculator';

describe('BattleSystem', () => {
  const mockCard: Card = {
    id: 'test_card',
    name: 'Test',
    description: 'Test',
    rarity: 'common',
    cost: 10,
    level: 1,
    xp: 0,
    stats: {},
    manaMax: 10,
    ultimate: { type: 'damage', value: 10, target: 'enemy' }
  };

  it('should initialize state correctly', () => {
    const state = initializeBattleState([mockCard]);
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0].currentMana).toBe(0);
    expect(state.cards[0].maxMana).toBe(10);
  });

  it('should regenerate mana over time', () => {
    const state = initializeBattleState([mockCard]);
    const playerStats: PlayerStats = { ...BASE_PLAYER_STATS, manaRegen: 1 }; // 1 mana per sec

    const { newState, triggeredEffects } = tickBattleState(state, 1.0, playerStats);
    
    expect(newState.cards[0].currentMana).toBe(1);
    expect(triggeredEffects).toHaveLength(0);
  });

  it('should trigger ultimate when mana full', () => {
    const state = initializeBattleState([mockCard]);
    state.cards[0].currentMana = 9;
    const playerStats: PlayerStats = { ...BASE_PLAYER_STATS, manaRegen: 1 }; // 1 mana per sec

    // Tick 1 sec -> 9 + 1 = 10 -> Trigger
    const { newState, triggeredEffects } = tickBattleState(state, 1.0, playerStats);
    
    expect(triggeredEffects).toHaveLength(1);
    expect(triggeredEffects[0].type).toBe('damage');
    expect(newState.cards[0].currentMana).toBe(0); // Reset
  });
});
