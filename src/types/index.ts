export interface Stats {
  health: number;
  maxHealth: number;
  strength: number; // Augmente les dégâts
  defense: number; // Réduit les dégâts subis (armure)
  dodge: number; // Chance d'éviter les dégâts (0-100)
  manaRegen: number; // Mana généré par tick
  critChance: number; // Chance de critique (0-100)
  critDamage: number; // Multiplicateur de dégâts critiques
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CardAbility {
  name: string;
  description: string;
  value: number; // Valeur de base de l'effet
  scaling: number; // Coefficient de scaling (ex: avec la force)
  type: 'damage' | 'heal' | 'buff' | 'debuff' | 'shield' | 'utility';
  target: 'self' | 'enemy' | 'all';
  duration?: number; // Pour les buffs/debuffs
}

export interface Card {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  level: number;
  stars: number; // Duplicatas fusionnés
  image: string; // Emoji ou URL

  // Stats de base fournies par la carte
  baseStats: Partial<Stats>;
  
  // Coût en mana pour déclencher l'ulti
  manaCost: number;

  // Capacités
  passive: CardAbility;
  ultimate: CardAbility;
}

export interface Deck {
  id: string;
  name: string;
  cards: string[]; // Card IDs
}

export interface PlayerProfile {
  id: string;
  username: string;
  gold: number;
  gems: number;
  collection: Record<string, Card>; // Map CardID -> Card Instance
  decks: Deck[];
  activeDeckId: string;
}

export interface GameState {
  player: {
    stats: Stats;
    currentMana: number;
    cards: CardState[];
  };
  opponent: {
    stats: Stats;
    currentMana: number;
    cards: CardState[]; // En multi, on ne voit pas forcément l'état interne exact, mais pour la simu locale oui
  };
  status: 'waiting' | 'playing' | 'victory' | 'defeat';
  timeRemaining: number;
}

export interface CardState {
  instanceId: string; // Unique ID in battle
  cardId: string;
  currentMana: number;
  isOnCooldown: boolean;
}

