export interface PlayerStats {
  maxHP: number;
  currentHP: number;
  strength: number; // Increases damage
  attackSpeed: number; // Attacks per second
  moveSpeed: number; // Pixels per second
  defense: number; // Damage reduction (flat)
  regen: number; // HP per second
  manaRegen: number; // Mana per second
  critChance?: number; // 0-1
  critMultiplier?: number; // e.g., 1.5x
  dodgeChance?: number; // 0-1
}

export type EffectType = 'heal' | 'damage' | 'buff_strength' | 'buff_speed';

export interface CardEffect {
  type: EffectType;
  value: number;
  duration?: number; // For buffs/debuffs
  target: 'self' | 'enemy';
}

export interface Card {
  id: string;
  name: string;
  description: string;
  stats: Partial<Omit<PlayerStats, 'currentHP'>>; // Cards boost max stats
  cost: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  
  // Leveling
  level: number;
  xp: number; // For now, 1 duplicate = 1 XP. Level up cost increases.
  
  // Battle Logic
  manaMax?: number; // Mana required to trigger ultimate. If undefined, passive only.
  ultimate?: CardEffect;
}

export interface Deck {
  id: string;
  cards: Card[];
}

// Ensure the file is treated as a module with value exports
export const TYPES_VERSION = '1.3.0';
