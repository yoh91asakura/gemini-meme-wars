import { useState, useEffect } from 'react';
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
  const [autoRoll, setAutoRoll] = useState(false);

  // Auto-roll au démarrage si pas d'inventaire
  useEffect(() => {
    if (inventory.length === 0 && gold >= 50) {
      // Auto-roll plusieurs cartes au démarrage
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          if (useGameStore.getState().gold >= 50) {
            rollGacha();
          }
        }, i * 100);
      }
    }
  }, []);

  // Auto-roll continu
  useEffect(() => {
    let interval: number;
    
    if (autoRoll) {
      interval = setInterval(() => {
        const currentState = useGameStore.getState();
        if (currentState.gold >= 50) {
          rollGacha();
        }
      }, 200); // Roll toutes les 200ms quand auto-roll activé
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRoll, rollGacha]);

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
          <div className="flex gap-4" style={{ animationDelay: '500ms' }}>
            <button 
              onClick={handleCloseReveal} 
              className="px-6 py-3 bg-slate-800 text-white font-bold text-xl rounded-lg border border-slate-700 hover:bg-slate-700 transition-all duration-150 shadow-lg"
            >
              CONTINUE
            </button>
            <button 
              onClick={() => { handleCloseReveal(); handleRoll(); }} 
              disabled={gold < 50} 
              className="px-6 py-3 bg-blue-500 text-white font-bold text-xl rounded-lg hover:bg-blue-400 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              🎲 ROLL AGAIN (50g)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="absolute inset-0 z-40 bg-slate-900 flex flex-col text-white font-sans p-6 overflow-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-6 bg-slate-800 border-b border-slate-700 shadow-lg z-10 rounded-lg mb-6">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-black text-yellow-400 italic tracking-tighter">GEMINI MEME WARS</h1>
          <nav className="flex bg-slate-700 rounded-lg p-1 gap-1">
            <button onClick={() => setActiveTab('summon')} className={`px-4 py-1 rounded-md text-sm font-bold transition-all duration-150 ${activeTab === 'summon' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>SUMMON</button>
            <button onClick={() => setActiveTab('deck')} className={`px-4 py-1 rounded-md text-sm font-bold transition-all duration-150 ${activeTab === 'deck' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>DECK</button>
            <button onClick={() => setGameState('deck_builder')} className="px-4 py-1 rounded-md text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-150">BUILDER</button>
          </nav>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <div className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-full border border-slate-600">
            <span className="text-xl">💰</span>
            <span className="text-base font-mono font-bold text-yellow-400">{gold.toLocaleString()}</span>
          </div>
          {autoRoll && (
            <div className="flex items-center gap-1 bg-red-900/50 px-2 py-1 rounded-full border border-red-600 animate-pulse">
              <span className="text-red-400 text-sm">🔄</span>
              <span className="text-red-300 text-xs font-bold">AUTO</span>
            </div>
          )}
          <button onClick={handleFight} className="px-4 md:px-8 py-2 bg-game-danger hover:bg-red-500 rounded-lg font-black text-white transition-transform active:scale-95 shadow-[0_4px_0_rgb(153,27,27)] hover:shadow-[0_2px_0_rgb(153,27,27)] translate-y-[-2px] hover:translate-y-0 text-sm md:text-base">
            FIGHT!
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {/* SUMMON TAB - Mobile-first design */}
        {activeTab === 'summon' && (
          <div className="h-full flex flex-col items-center justify-center relative overflow-hidden px-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 animate-pulse-slow" />
            <div className="z-10 text-center mb-8 md:mb-12">
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-game-accent to-orange-600 drop-shadow-sm">MEME SUMMON</h2>
              <p className="text-slate-400 mt-2 md:mt-4 text-base md:text-lg px-4">Summon pure chaos. Duplicates fuse automatically.</p>
            </div>
            
            {/* Auto-roll toggle button */}
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => setAutoRoll(!autoRoll)}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all transform active:scale-95 touch-manipulation ${
                  autoRoll 
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)]'
                }`}
              >
                {autoRoll ? '⏹️ STOP AUTO-ROLL' : '▶️ START AUTO-ROLL'}
              </button>
              
              {/* Enhanced roll button with better mobile UX */}
              <button 
                onClick={handleRoll} 
                disabled={gold < 50} 
                className={`group relative w-48 h-48 md:w-64 md:h-64 rounded-full flex flex-col items-center justify-center border-8 transition-all transform active:scale-95 touch-manipulation ${
                  gold >= 50 
                    ? 'bg-game-panel border-game-accent hover:bg-slate-800 shadow-[0_0_50px_rgba(250,204,21,0.3)] cursor-pointer' 
                    : 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
                } ${autoRoll ? 'animate-pulse' : ''}`}
              >
                <span className="text-6xl md:text-8xl mb-2 md:mb-4 group-hover:rotate-12 transition-transform duration-300">🎲</span>
                <span className="text-2xl md:text-3xl font-black text-white">ROLL</span>
                <div className="absolute -bottom-4 md:-bottom-6 bg-game-accent text-black font-bold px-4 py-1 md:px-6 md:py-2 rounded-full border-4 border-game-bg text-sm md:text-base">50 G</div>
              </button>
            </div>
          </div>
        )}

        {/* DECK TAB - Mobile-optimized */}
        {activeTab === 'deck' && (
          <div className="h-full flex flex-col p-4 md:p-8 gap-4 md:gap-8 overflow-hidden">
            {/* Active Deck - Mobile-first layout */}
            <div className="flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-white">Active Deck <span className="text-slate-500 text-base md:text-lg ml-2">{deck.length}/5</span></h2>
                <div className="text-xs md:text-sm text-slate-400">Tap to unequip</div>
              </div>
              
              {/* Deck slots - horizontal scroll on mobile, grid on desktop */}
              <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-800">
                <div className="flex md:grid md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                  {deck.length === 0 && (
                    <div className="col-span-5 text-center text-slate-500 italic py-8 text-sm md:text-base">
                      Tap cards from collection to equip
                    </div>
                  )}
                  {deck.map(card => (
                    <div key={card.id} className="flex-shrink-0">
                      <Card card={card} size="sm" onClick={() => unequipCard(card.id)} />
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 5 - deck.length) }).map((_, i) => (
                    <div key={i} className="flex-shrink-0 w-24 h-36 md:w-40 md:h-60 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-700 font-bold text-lg md:text-2xl opacity-50">
                      {i + 1 + deck.length}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Inventory - Mobile-optimized grid */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <h2 className="text-lg md:text-xl font-bold text-slate-300 mb-3 md:mb-4">Collection</h2>
              <div className="flex-1 overflow-y-auto pr-1 md:pr-2">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 pb-20">
                  {inventory.map(card => {
                    const inDeck = deck.some(c => c.id === card.id);
                    return (
                      <div key={card.id} className={`relative touch-manipulation ${inDeck ? 'opacity-50 grayscale' : ''}`}>
                        <Card card={card} size="sm" onClick={() => !inDeck && equipCard(card)} />
                        {inDeck && (
                          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs md:text-sm text-game-success bg-black/50 rounded-xl">EQUIPPED</div>
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
