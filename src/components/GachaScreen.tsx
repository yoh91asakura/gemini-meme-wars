import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Card } from './Card';

export const GachaScreen = () => {
  const {
    gold,
    rollGacha,
    lastRolledCard,
    setGameState,
    gameState,
    inventory,
    deck,
    equipCard,
    unequipCard,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'summon' | 'deck'>('summon');

  const handleRoll = () => {
    if (gold >= 50) {
      rollGacha();
    } else {
      alert('Not enough gold! Need 50.');
    }
  };

  const handleCloseReveal = () => {
    setGameState('shop');
  };

  const handleFight = () => {
    if (deck.length === 0) {
      alert('You need at least 1 card in your deck!');
      return;
    }
    setGameState('playing');
  };

  // Reveal overlay with rarity‑based effects
  if (gameState === 'gacha_reveal' && lastRolledCard) {
    const rarityEffects = {
      common: {
        bg: 'from-slate-800/95 to-slate-900/95',
        glow: 'shadow-[0_0_100px_rgba(148,163,184,0.3)]',
        text: 'from-slate-300 to-slate-500',
        particles: '✨',
        title: 'NEW MEME!',
      },
      rare: {
        bg: 'from-blue-900/95 to-slate-900/95',
        glow: 'shadow-[0_0_150px_rgba(59,130,246,0.6)]',
        text: 'from-blue-300 to-blue-600',
        particles: '💎',
        title: 'RARE MEME!',
      },
      epic: {
        bg: 'from-purple-900/95 to-slate-900/95',
        glow: 'shadow-[0_0_200px_rgba(168,85,247,0.8)]',
        text: 'from-purple-300 to-purple-700',
        particles: '⚡',
        title: 'EPIC MEME!!',
      },
      legendary: {
        bg: 'from-orange-900/95 to-yellow-900/95',
        glow: 'shadow-[0_0_250px_rgba(249,115,22,1)] animate-pulse',
        text: 'from-yellow-200 to-orange-600',
        particles: '🌟',
        title: '✨ LEGENDARY MEME! ✨',
      },
    };
    const effect = rarityEffects[lastRolledCard.rarity];
    return (
      <div className={`absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br ${effect.bg} backdrop-blur-xl animate-in fade-in duration-500`}>
        {/* Particle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(lastRolledCard.rarity === 'legendary' ? 20 : lastRolledCard.rarity === 'epic' ? 12 : 8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-float opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {effect.particles}
            </div>
          ))}
        </div>
        {/* Main content */}
        <div className="flex flex-col items-center gap-8 relative z-10">
          <h1 className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${effect.text} animate-bounce drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]`}>{effect.title}</h1>
          <div className={`animate-in zoom-in duration-700 ${effect.glow}`}>
            <div className="relative">
              {lastRolledCard.rarity === 'legendary' && (
                <div className="absolute inset-0 -z-10">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-transparent to-yellow-400/50"
                      style={{
                        transform: `rotate(${i * 30}deg) translateY(-50%)`,
                        transformOrigin: 'center',
                        animation: 'spin 10s linear infinite',
                      }}
                    />
                  ))}
                </div>
              )}
              <Card card={lastRolledCard} size="lg" />
            </div>
          </div>
          <div className="flex gap-4 animate-in slide-in-from-bottom duration-700" style={{ animationDelay: '500ms' }}>
            <button onClick={handleCloseReveal} className="px-10 py-4 bg-gradient-to-b from-white to-slate-200 text-game-bg font-black text-lg rounded-xl hover:from-slate-100 hover:to-slate-300 transition-all hover:scale-105 shadow-lg active:scale-95">
              CONTINUE
            </button>
            <button onClick={() => { handleCloseReveal(); handleRoll(); }} disabled={gold < 50} className="px-10 py-4 bg-gradient-to-b from-game-accent to-yellow-600 text-game-bg font-black text-lg rounded-xl hover:from-yellow-300 hover:to-yellow-500 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 shadow-lg active:scale-95">
              🎲 ROLL AGAIN (50g)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="absolute inset-0 z-40 bg-game-bg flex flex-col text-white font-sans p-4 overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-game-panel border-b border-slate-700 shadow-lg z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black text-game-accent italic tracking-tighter">GEMINI MEME WARS</h1>
          <nav className="flex bg-slate-900 rounded-lg p-1 gap-1">
            <button onClick={() => setActiveTab('summon')} className={`px-4 py-1 rounded-md text-sm font-bold transition-colors ${activeTab === 'summon' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>SUMMON</button>
            <button onClick={() => setActiveTab('deck')} className={`px-4 py-1 rounded-md text-sm font-bold transition-colors ${activeTab === 'deck' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}>DECK</button>
          </nav>
        </div>
        <div className="flex items-center gap-6 mt-2 sm:mt-0">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-xl">💰</span>
            <span className="text-lg font-mono font-bold text-game-accent">{gold}</span>
          </div>
          <button onClick={handleFight} className="px-8 py-2 bg-game-danger hover:bg-red-500 rounded-lg font-black text-white transition-transform active:scale-95 shadow-[0_4px_0_rgb(153,27,27)] hover:shadow-[0_2px_0_rgb(153,27,27)] translate-y-[-2px] hover:translate-y-0">
            FIGHT!
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* SUMMON TAB */}
        {activeTab === 'summon' && (
          <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 animate-pulse-slow" />
            <div className="z-10 text-center mb-12">
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-game-accent to-orange-600 drop-shadow-sm">MEME SUMMON</h2>
              <p className="text-slate-400 mt-4 text-lg">Summon pure chaos. Duplicates fuse automatically.</p>
            </div>
            <button onClick={handleRoll} disabled={gold < 50} className={`group relative w-64 h-64 rounded-full flex flex-col items-center justify-center border-8 transition-all transform active:scale-95 ${gold >= 50 ? 'bg-game-panel border-game-accent hover:bg-slate-800 shadow-[0_0_50px_rgba(250,204,21,0.3)] cursor-pointer' : 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'}`}>
              <span className="text-8xl mb-4 group-hover:rotate-12 transition-transform duration-300">🎲</span>
              <span className="text-3xl font-black text-white">ROLL</span>
              <div className="absolute -bottom-6 bg-game-accent text-black font-bold px-6 py-2 rounded-full border-4 border-game-bg">50 G</div>
            </button>
          </div>
        )}

        {/* DECK TAB */}
        {activeTab === 'deck' && (
          <div className="h-full flex flex-col p-8 gap-8 overflow-hidden">
            {/* Active Deck */}
            <div className="flex-shrink-0">
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-2xl font-bold text-white">Active Deck <span className="text-slate-500 text-lg ml-2">{deck.length}/5</span></h2>
                <div className="text-sm text-slate-400">Tap to unequip</div>
              </div>
              <div className="flex gap-4 h-64 items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                {deck.length === 0 && <div className="w-full text-center text-slate-500 italic">Drag or tap cards from inventory to equip</div>}
                {deck.map(card => (
                  <Card key={card.id} card={card} size="md" onClick={() => unequipCard(card.id)} />
                ))}
                {Array.from({ length: Math.max(0, 5 - deck.length) }).map((_, i) => (
                  <div key={i} className="w-40 h-60 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-700 font-bold text-2xl opacity-50">
                    {i + 1 + deck.length}
                  </div>
                ))}
              </div>
            </div>
            {/* Inventory */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <h2 className="text-xl font-bold text-slate-300 mb-4">Collection</h2>
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-20">
                  {inventory.map(card => {
                    const inDeck = deck.some(c => c.id === card.id);
                    return (
                      <div key={card.id} className={`relative ${inDeck ? 'opacity-50 grayscale' : ''}`}>
                        <Card card={card} size="sm" onClick={() => !inDeck && equipCard(card)} />
                        {inDeck && (
                          <div className="absolute inset-0 flex items-center justify-center font-bold text-game-success bg-black/50 rounded-xl">EQUIPPED</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
