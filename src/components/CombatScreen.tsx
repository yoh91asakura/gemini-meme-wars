import { useGameStore } from '../stores/useGameStore';
import { Card } from './Card';
import { CARD_POOL } from '../data/cards';

export const CombatScreen = () => {
  const { deck, activeCards, playerHP, playerMaxHP, enemyHP, enemyMaxHP, gameTime, setGameState } = useGameStore();

  // Get actual enemy cards from active game state - use card definitions from pool
  const enemyCards = activeCards.slice(0, 3).map(ac => {
    const cardDef = CARD_POOL.find(c => c.id === ac.cardId) || ac.definition;
    return { ...ac, card: cardDef };
  });
  
  // Player cards are handled directly from deck in JSX

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col" style={{ background: 'transparent' }}>
      {/* Top HUD (Enemy) */}
      <div className="w-full p-4 pointer-events-auto">
        {/* Enemy HP Bar */}
        <div className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl font-bold text-white">Enemy</div>
            <div className="text-sm text-slate-400">
              {enemyHP}/{enemyMaxHP}
            </div>
          </div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
            <div 
              className="h-full bg-red-500 transition-all duration-200"
              style={{ width: `${(enemyHP / enemyMaxHP) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="text-center">
          <div className={`text-2xl font-mono font-bold mb-2 ${
            gameTime <= 10 ? 'text-yellow-400 animate-pulse' : 'text-slate-400'
          }`}>
            {Math.ceil(gameTime)}s
          </div>
          
          {/* Combat Controls */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setGameState('gameover')}
              className="px-4 py-1 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-md text-sm text-slate-300 hover:text-white transition-all duration-150"
            >
              Skip Battle
            </button>
            <button
              onClick={() => setGameState('shop')}
              className="px-4 py-1 bg-slate-700/80 hover:bg-slate-600/80 border border-slate-600 rounded-md text-sm text-slate-300 hover:text-white transition-all duration-150"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Center Arena - Clean for Phaser */}
      <div className="flex-1 relative">
        {/* This space is for Phaser game canvas */}
      </div>

      {/* Bottom Player HUD */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="p-4 pointer-events-auto">
          {/* Player HP Bar */}
          <div className="w-full bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xl font-bold text-white">Player</div>
              <div className="text-sm text-slate-400">
                {playerHP}/{playerMaxHP}
              </div>
            </div>
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
              <div 
                className="h-full bg-green-500 transition-all duration-200"
                style={{ width: `${(playerHP / playerMaxHP) * 100}%` }}
              />
            </div>
          </div>

          {/* Player Hand */}
          <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-lg p-4">
            <div className="text-sm text-slate-300 font-bold mb-3 text-center">Your Cards</div>
            <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide">
              {deck.map((card, index) => {
                const activeCard = activeCards.find(ac => ac.cardId === card.id);
                const manaProgress = activeCard ? (activeCard.currentMana / activeCard.maxMana) : 0;
                const isUltiReady = manaProgress >= 1;
                
                return (
                  <div key={card.id} className="relative flex-shrink-0">
                    <Card 
                      card={card} 
                      size="sm" 
                      showMana={true}
                      manaProgress={manaProgress}
                      state={isUltiReady ? 'ulti-ready' : 'idle'}
                    />
                    <div className="absolute top-1 left-1 bg-slate-700/90 text-white text-xs font-bold rounded px-1 z-40">
                      {index + 1}
                    </div>
                  </div>
                );
              })}
              
              {deck.length === 0 && (
                <div className="text-center text-slate-400 italic py-8">
                  <div className="text-sm mb-1">No cards equipped!</div>
                  <div className="text-xs opacity-70">Visit deck builder to equip cards</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Panels (Desktop only) */}
      <div className="hidden md:block">
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-h-screen overflow-y-auto pointer-events-auto">
          <div className="text-xs text-slate-400 font-bold mb-1 text-center">ENEMY</div>
          {enemyCards.map((enemyCard, index) => {
            if (!enemyCard.card) return null;
            const manaProgress = (enemyCard.currentMana / enemyCard.maxMana) || 0;
            
            return (
              <div key={enemyCard.cardId} className="relative">
                <div className="w-16 h-24 bg-slate-800 border-2 border-red-500 rounded-lg overflow-hidden relative">
                  <Card 
                    card={enemyCard.card} 
                    size="sm"
                  />
                  <div className="absolute inset-0 bg-red-500/20 pointer-events-none"></div>
                  <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded px-1 z-10">
                    {index + 1}
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-700 mt-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-200 ${
                      manaProgress >= 1 ? 'bg-red-500 animate-pulse' : 'bg-red-500/60'
                    }`}
                    style={{ width: `${Math.min(100, manaProgress * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
          
          {enemyCards.filter(ec => ec.card).length === 0 && (
            <div className="text-center text-slate-400 italic text-xs p-2 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>No enemies</div>
              <div className="opacity-70">Waiting...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};