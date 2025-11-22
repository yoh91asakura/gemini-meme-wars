import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Card } from '../game/logic/types';
import type { ActiveCardState } from '../game/logic/battleSystem';
import { rollGacha } from '../game/logic/gachaSystem';
import { fuseCard } from '../game/logic/fusionSystem';
import { CARD_POOL } from '../data/cards';

export type GameState = 'lobby' | 'playing' | 'gameover' | 'shop' | 'gacha_reveal' | 'deck_builder';

interface GameStore {
  gameState: GameState;
  setGameState: (state: GameState) => void;

  winner: 'player' | 'enemy' | null;
  setWinner: (winner: 'player' | 'enemy' | null) => void;

  isGameRunning: boolean; // Legacy/Derived
  setGameRunning: (isRunning: boolean) => void;

  playerHP: number;
  playerMaxHP: number;
  enemyHP: number;
  enemyMaxHP: number;
  gameTime: number;

  updateStats: (pHP: number, pMaxHP: number, eHP: number, eMaxHP: number) => void;
  updateGameTime: (time: number) => void;

  activeCards: ActiveCardState[];
  updateActiveCards: (cards: ActiveCardState[]) => void;

  // Meta Game
  inventory: Card[];
  deck: Card[];
  gold: number;
  wins: number; // New: Track total wins for scaling difficulty
  lastRolledCard: Card | null; // For reveal animation
  rollGacha: () => void;
  setDeck: (cards: Card[]) => void;
  equipCard: (card: Card) => void;
  unequipCard: (cardId: string) => void;
  addGold: (amount: number) => void;
  incrementWins: () => void; // New
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: 'lobby',
      setGameState: (state) => set({ gameState: state, isGameRunning: state === 'playing' }),

      winner: null,
      setWinner: (winner) => set({ winner }),

      isGameRunning: false,
      setGameRunning: (isRunning) => set({ isGameRunning: isRunning, gameState: isRunning ? 'playing' : 'lobby' }),

      playerHP: 100,
      playerMaxHP: 100,
      enemyHP: 100,
      enemyMaxHP: 100,
      gameTime: 30,

      updateStats: (pHP, pMaxHP, eHP, eMaxHP) => set({
        playerHP: pHP,
        playerMaxHP: pMaxHP,
        enemyHP: eHP,
        enemyMaxHP: eMaxHP
      }),

      updateGameTime: (time) => set({ gameTime: time }),

      activeCards: [],
      updateActiveCards: (cards) => set({ activeCards: cards }),

      inventory: [],
      deck: [],
      gold: 1000000, // Massive starting gold for testing
      wins: 0,
      lastRolledCard: null,

      rollGacha: () => {
        const state = get();
        const GACHA_COST = 50; // Fixed cost for now

        if (state.gold >= GACHA_COST) {
          const rolledCardBase = rollGacha(CARD_POOL);
          let finalCard = { ...rolledCardBase }; // Clone to avoid mutating pool

          // Check if we have this card
          const existingCardIndex = state.inventory.findIndex(c => c.id === finalCard.id);

          if (existingCardIndex > -1) {
            // FUSION!
            const existingCard = state.inventory[existingCardIndex];
            finalCard = fuseCard(existingCard);

            const newInventory = [...state.inventory];
            newInventory[existingCardIndex] = finalCard;

            // Update deck if this card is equipped
            const newDeck = state.deck.map(c => c.id === finalCard.id ? finalCard : c);

            set({
              gold: state.gold - GACHA_COST,
              inventory: newInventory,
              deck: newDeck,
              lastRolledCard: finalCard,
              gameState: 'gacha_reveal'
            });
          } else {
            // New Card
            set({
              gold: state.gold - GACHA_COST,
              inventory: [...state.inventory, finalCard],
              lastRolledCard: finalCard,
              gameState: 'gacha_reveal'
            });
          }
        }
      },

      setDeck: (deck) => set({ deck }),
      equipCard: (card) => set((state) => {
        if (state.deck.length >= 5) return state;
        // Allow equipping if we own it and it's not already in deck (unique equip for MVP simplicity)
        const inDeck = state.deck.some(c => c.id === card.id);

        if (!inDeck) {
          return { deck: [...state.deck, card] };
        }
        return state;
      }),
      unequipCard: (cardId) => set((state) => {
        return { deck: state.deck.filter(c => c.id !== cardId) };
      }),
      addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
      incrementWins: () => set((state) => ({ wins: state.wins + 1 })),
    }),
    {
      name: 'meme-wars-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        inventory: state.inventory,
        deck: state.deck,
        gold: state.gold,
        wins: state.wins, // Persist win count
      }),
    }
  )
);
