import React from 'react';
import { useGameStore } from '../stores/useGameStore';

export const GameOver = () => {
  const { winner, setGameState } = useGameStore();

  const handleRestart = () => {
    setGameState('shop');
  };

  const isVictory = winner === 'player';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
      {/* Particle effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isVictory ? (
          // Victory confetti effect
          <>
            <div className="absolute top-0 left-1/4 text-6xl animate-bounce" style={{ animationDelay: '0ms' }}>✨</div>
            <div className="absolute top-10 right-1/4 text-6xl animate-bounce" style={{ animationDelay: '200ms' }}>🎉</div>
            <div className="absolute top-5 left-1/3 text-6xl animate-bounce" style={{ animationDelay: '400ms' }}>⭐</div>
            <div className="absolute top-20 right-1/3 text-6xl animate-bounce" style={{ animationDelay: '600ms' }}>🏆</div>
          </>
        ) : (
          // Defeat dark particles
          <>
            <div className="absolute top-1/4 left-1/4 text-6xl opacity-30 animate-pulse-slow">💀</div>
            <div className="absolute bottom-1/4 right-1/4 text-6xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}>👻</div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className={`
        relative bg-gradient-to-br p-12 rounded-2xl border-4 text-center shadow-2xl max-w-lg
        animate-in zoom-in duration-700
        ${isVictory
          ? 'from-yellow-900/90 to-orange-900/90 border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.6)]'
          : 'from-red-950/90 to-gray-900/90 border-red-600 shadow-[0_0_60px_rgba(239,68,68,0.4)]'
        }
        backdrop-blur-xl
      `}>
        {/* Glow effect */}
        <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-50 -z-10 ${isVictory ? 'bg-yellow-500' : 'bg-red-500'}`}></div>

        {/* Main emoji */}
        <div className="text-9xl mb-6 animate-bounce">
          {isVictory ? '🏆' : '💀'}
        </div>

        {/* Title */}
        <h1 className={`
          text-7xl font-black mb-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]
          ${isVictory
            ? 'text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500'
            : 'text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-700'
          }
        `}>
          {isVictory ? 'VICTORY!' : 'DEFEAT'}
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 mb-10 text-2xl font-semibold drop-shadow-md">
          {isVictory
            ? '🎊 You crushed the memes! 🎊'
            : '💔 The memes consumed you... 💔'
          }
        </p>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRestart}
            className={`
              group relative px-10 py-5 font-black text-2xl rounded-xl
              transition-all duration-200 active:scale-95
              shadow-lg hover:shadow-2xl
              ${isVictory
                ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-950 hover:from-yellow-300 hover:to-yellow-500'
                : 'bg-gradient-to-b from-red-500 to-red-700 text-white hover:from-red-400 hover:to-red-600'
              }
            `}
          >
            <span className="relative z-10">Play Again</span>
            {/* Button glow effect */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-lg
              ${isVictory ? 'bg-yellow-400' : 'bg-red-500'}
            `}></div>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 text-5xl animate-spin-slow">
          {isVictory ? '⭐' : '🌑'}
        </div>
        <div className="absolute -bottom-6 -right-6 text-5xl animate-spin-slow" style={{ animationDirection: 'reverse' }}>
          {isVictory ? '✨' : '💨'}
        </div>
      </div>
    </div>
  );
};
