import { useState, useMemo } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Card } from './Card';
import type { Card as CardType } from '../game/logic/types';

type SortOption = 'power' | 'rarity' | 'recent' | 'name';
type FilterRarity = 'all' | 'common' | 'rare' | 'epic' | 'legendary';

export const DeckBuilder = () => {
  const { inventory, deck, equipCard, unequipCard, setGameState } = useGameStore();
  
  const [sortBy, setSortBy] = useState<SortOption>('power');
  const [filterRarity, setFilterRarity] = useState<FilterRarity>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // UI Spec Section 5.2 - Filters & Sort Implementation
  const filteredAndSortedInventory = useMemo(() => {
    let filtered = inventory;

    // Apply rarity filter
    if (filterRarity !== 'all') {
      filtered = filtered.filter(card => card.rarity === filterRarity);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(card => 
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'power':
          const powerA = (a.stats.maxHP || 0) + (a.stats.strength || 0);
          const powerB = (b.stats.maxHP || 0) + (b.stats.strength || 0);
          return powerB - powerA;
        case 'rarity':
          const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
          return rarityOrder[b.rarity] - rarityOrder[a.rarity];
        case 'recent':
          return 0; // For now, maintain original order (most recent first)
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [inventory, filterRarity, searchQuery, sortBy]);

  // Calculate aggregated stats (UI Spec Section 5.1)
  const deckStats = useMemo(() => {
    return deck.reduce((acc, card) => {
      acc.totalHP += card.stats.maxHP || 0;
      acc.totalStrength += card.stats.strength || 0;
      acc.avgSpeed += card.stats.attackSpeed || 0;
      return acc;
    }, { totalHP: 0, totalStrength: 0, avgSpeed: 0, count: deck.length });
  }, [deck]);

  const handleCardClick = (card: CardType) => {
    const isInDeck = deck.some(c => c.id === card.id);
    
    if (isInDeck) {
      unequipCard(card.id);
    } else {
      if (deck.length < 5) {
        equipCard(card);
      }
    }
  };

  const rarityFilters: { value: FilterRarity; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: 'bg-slate-800 text-slate-300' },
    { value: 'common', label: 'Common', color: 'bg-slate-500/20 text-slate-400 border-slate-500' },
    { value: 'rare', label: 'Rare', color: 'bg-blue-500/20 text-blue-400 border-blue-500' },
    { value: 'epic', label: 'Epic', color: 'bg-purple-500/20 text-purple-400 border-purple-500' },
    { value: 'legendary', label: 'Legendary', color: 'bg-orange-500/20 text-orange-400 border-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Deck Builder</h1>
          <p className="text-slate-400 text-base">Build your perfect deck for battle</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setGameState('shop')}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-blue-500 transition-all duration-150"
          >
            ← Back to Shop
          </button>
          <button
            onClick={() => setGameState('playing')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={deck.length === 0}
          >
            Start Battle
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Current Deck & Stats */}
        <div className="lg:col-span-1">
          {/* UI Spec Section 5.1 - Deck Display */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Current Deck</h2>
              <span className="text-sm text-slate-400">{deck.length}/5</span>
            </div>

            {/* Deck Slots */}
            <div className="space-y-4 mb-6">
              {Array.from({ length: 5 }, (_, index) => {
                const card = deck[index];
                return (
                  <div 
                    key={index}
                    className={`
                      h-20 border-2 border-dashed rounded-lg flex items-center justify-center
                      ${card ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/50'}
                    `}
                  >
                    {card ? (
                      <div className="flex items-center gap-4 p-2 w-full">
                        <div className="w-12 h-16 flex-shrink-0">
                          <Card 
                            card={card} 
                            size="sm" 
                            onClick={() => handleCardClick(card)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold truncate">{card.name}</div>
                          <div className="text-xs text-slate-400">
                            {card.stats.maxHP}❤️ {card.stats.strength}⚔️ {card.stats.attackSpeed?.toFixed(1)}⚡
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm">Empty Slot {index + 1}</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Deck Stats */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-sm font-bold mb-2 text-slate-400">Deck Statistics</h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-green-500 font-bold">{deckStats.totalHP}</div>
                  <div className="text-slate-400">Total HP</div>
                </div>
                <div>
                  <div className="text-red-500 font-bold">{deckStats.totalStrength}</div>
                  <div className="text-slate-400">Total Attack</div>
                </div>
                <div>
                  <div className="text-yellow-500 font-bold">{(deckStats.avgSpeed / Math.max(1, deckStats.count)).toFixed(1)}</div>
                  <div className="text-slate-400">Avg Speed</div>
                </div>
                <div>
                  <div className="text-blue-500 font-bold">{Math.round(((deckStats.totalHP + deckStats.totalStrength) / Math.max(1, deckStats.count)))}</div>
                  <div className="text-slate-400">Avg Power</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inventory */}
        <div className="lg:col-span-2">
          {/* Search & Filters */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-slate-400 font-bold self-center">Rarity:</span>
              {rarityFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterRarity(filter.value)}
                  className={`
                    px-3 py-1 rounded-md text-xs font-bold border transition-all duration-150
                    ${filterRarity === filter.value 
                      ? filter.color 
                      : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600'
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-400 font-bold self-center">Sort by:</span>
              {[
                { value: 'power' as SortOption, label: 'Power' },
                { value: 'rarity' as SortOption, label: 'Rarity' },
                { value: 'recent' as SortOption, label: 'Recent' },
                { value: 'name' as SortOption, label: 'Name' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`
                    px-3 py-1 rounded-md text-xs font-bold transition-all duration-150
                    ${sortBy === option.value 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-700 text-slate-400 border border-slate-600 hover:bg-slate-600'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inventory Grid */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Collection</h2>
              <span className="text-sm text-slate-400">{filteredAndSortedInventory.length} cards</span>
            </div>

            {/* Cards Grid */}
            {filteredAndSortedInventory.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredAndSortedInventory.map((card) => {
                  const isInDeck = deck.some(c => c.id === card.id);
                  const isDisabled = !isInDeck && deck.length >= 5;
                  
                  return (
                    <div key={card.id} className="relative">
                      <Card 
                        card={card} 
                        size="sm" 
                        onClick={() => handleCardClick(card)}
                        state={isDisabled ? 'disabled' : 'idle'}
                      />
                      
                      {/* Equipped indicator */}
                      {isInDeck && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20">
                          ✓
                        </div>
                      )}
                      
                      {/* Deck full warning */}
                      {isDisabled && (
                        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                          <div className="text-xs text-slate-400 text-center">
                            Deck Full
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl opacity-50 mb-4">🃏</div>
                <div className="text-xl text-slate-400 mb-2">No cards found</div>
                <div className="text-base text-slate-400">
                  {inventory.length === 0 ? 'Roll some cards in the shop!' : 'Try adjusting your filters'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};