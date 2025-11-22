import type { Card } from '../game/logic/types';

export const CARD_POOL: Card[] = [
  {
    id: 'c_beefy',
    name: 'Beefy',
    description: 'Adds raw HP.',
    rarity: 'common',
    cost: 10,
    level: 1,
    xp: 0,
    stats: { maxHP: 50 },
  },
  {
    id: 'c_workout',
    name: 'Gym Rat',
    description: 'Increases Strength.',
    rarity: 'common',
    cost: 10,
    level: 1,
    xp: 0,
    stats: { strength: 5 },
  },
  {
    id: 'c_coffee',
    name: 'Espresso',
    description: 'Attacks faster.',
    rarity: 'rare',
    cost: 25,
    level: 1,
    xp: 0,
    stats: { attackSpeed: 0.5 },
  },
  {
    id: 'c_sneakers',
    name: 'Jordans',
    description: 'Move faster & Dodge.',
    rarity: 'common',
    cost: 15,
    level: 1,
    xp: 0,
    stats: { moveSpeed: 50, dodgeChance: 0.05 }, // 5% dodge
  },
  {
    id: 'c_tank',
    name: 'Tank Top',
    description: 'More defense but slower.',
    rarity: 'rare',
    cost: 30,
    level: 1,
    xp: 0,
    stats: { defense: 5, moveSpeed: -20 },
  },
  {
    id: 'c_glasses',
    name: 'Deal With It',
    description: 'Critical Hit Chance.',
    rarity: 'epic',
    cost: 60,
    level: 1,
    xp: 0,
    stats: { critChance: 0.15, critMultiplier: 0.5 }, // +15% Crit, +50% Crit Dmg
  },
  {
    id: 'c_chad',
    name: 'Giga Chad',
    description: 'Massive stats boost. ULT: Full Heal',
    rarity: 'legendary',
    cost: 100,
    level: 1,
    xp: 0,
    stats: { maxHP: 100, strength: 20, defense: 10, critChance: 0.1 },
    manaMax: 100,
    ultimate: {
      type: 'heal',
      value: 9999,
      target: 'self',
    }
  },
  {
    id: 'c_wizard',
    name: 'Wizard Hat',
    description: 'Regen Mana. ULT: Fireball',
    rarity: 'rare',
    cost: 50,
    level: 1,
    xp: 0,
    stats: { manaRegen: 5 },
    manaMax: 30,
    ultimate: {
      type: 'damage',
      value: 50,
      target: 'enemy',
    }
  },
  {
    id: 'c_vamp',
    name: 'Vampire Teeth',
    description: 'Lifesteal (Regen). ULT: Drain Life',
    rarity: 'epic',
    cost: 75,
    level: 1,
    xp: 0,
    stats: { regen: 5, strength: 2 },
    manaMax: 40,
    ultimate: {
      type: 'heal',
      value: 30,
      target: 'self',
    }
  },
  {
    id: 'c_dodge',
    name: 'Matrix Coat',
    description: 'High Dodge Chance.',
    rarity: 'legendary',
    cost: 90,
    level: 1,
    xp: 0,
    stats: { dodgeChance: 0.25, moveSpeed: 20 },
    manaMax: 50,
    ultimate: {
        type: 'buff_speed',
        value: 100, // Placeholder, buff logic not fully impl in MainScene yet but consistent with types
        target: 'self'
    }
  }
];
