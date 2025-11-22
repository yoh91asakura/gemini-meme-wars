import { useGameStore } from '../stores/useGameStore';
import { Card } from './Card';
import { CARD_POOL } from '../data/cards';
import { HUD } from './HUD';

export const CombatScreen = () => {
  const { deck, activeCards } = useGameStore();

  // Get actual enemy cards from active game state - use card definitions from pool
  const enemyCards = activeCards.slice(0, 3).map(ac => {
    const cardDef = CARD_POOL.find(c => c.id === ac.cardId) || ac.definition;
    return { ...ac, card: cardDef };
  });

  // Player cards are handled directly from deck in JSX

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col pointer-events-none" style={{ zIndex: 30 }}>
      {/* Top HUD (Global) */}
      <div className="w-full pointer-events-auto z-50">
        <HUD />
      </div>

      {/* Center Arena - Clean for Phaser */}
      <div className="flex-1 w-full relative pointer-events-none">
        {/* This space is for Phaser game canvas - full screen coverage */}
      </div>

      {/* Bottom Player HUD - Thumb Zone */}
      <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-40">
        <div className="pointer-events-auto pb-4 px-2 md:pb-6 md:px-6 flex flex-col items-center justify-end h-[40vh] bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent">

          {/* Player Hand */}
          <div className="w-full max-w-4xl">
            <div className="flex justify-center items-end gap-2 overflow-x-auto scrollbar-hide pb-2 px-4" style={{ minHeight: '160px' }}>
              {deck.map((card, index) => {
                const activeCard = activeCards.find(ac => ac.cardId === card.id);
                const manaProgress = activeCard ? (activeCard.currentMana / activeCard.maxMana) : 0;
                const isUltiReady = manaProgress >= 1;

                return (
                  <div
                    key={card.id}
                    className={`relative flex-shrink-0 transition-all duration-200 hover:-translate-y-4 hover:scale-110 ${isUltiReady ? 'z-10' : 'z-0'}`}
                    style={{
                      transformOrigin: 'bottom center',
                      marginBottom: isUltiReady ? '8px' : '0px'
                    }}
                  >
                    <Card
                      card={card}
                      size="sm"
                      showMana={true}
                      manaProgress={manaProgress}
                      state={isUltiReady ? 'ulti-ready' : 'idle'}
                    />
                    {/* Hotkey/Index Indicator */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white/20 shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                );
              })}

              {deck.length === 0 && (
                <div className="text-center text-slate-400 italic py-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 px-8">
                  <div className="text-sm mb-1 font-bold text-slate-300">Empty Hand</div>
                  <div className="text-xs opacity-70">Equip cards in Deck Builder</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Side Panels (Desktop only) - Enemy Intentions */}
      <div className="hidden lg:block absolute right-4 top-24 bottom-32 w-24 pointer-events-auto z-30 flex flex-col justify-center">
        <div className="flex flex-col gap-3 max-h-full overflow-y-auto scrollbar-hide py-4">
          {enemyCards.map((enemyCard, index) => {
            if (!enemyCard.card) return null;
            const manaProgress = (enemyCard.currentMana / enemyCard.maxMana) || 0;

            return (
              <div key={enemyCard.cardId} className="relative group">
                <div className="w-20 h-28 bg-slate-800 border-2 border-red-500/50 rounded-lg overflow-hidden relative shadow-lg transition-transform group-hover:scale-105">
                  <Card
                    card={enemyCard.card}
                    size="sm"
                  />
                  <div className="absolute inset-0 bg-red-900/30 pointer-events-none"></div>
                  <div className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded px-1 z-10 shadow-sm">
                    E{index + 1}
                  </div>
                </div>
                {/* Enemy Mana Bar */}
                <div className="w-full h-1.5 bg-slate-900 mt-1 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full transition-all duration-200 ${manaProgress >= 1 ? 'bg-red-500 animate-pulse' : 'bg-red-500/80'
                      }`}
                    style={{ width: `${Math.min(100, manaProgress * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};