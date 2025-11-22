import React from 'react';
import { useGameStore } from '../stores/useGameStore';

export const GameOver = () => {
  const { winner, setGameState } = useGameStore();

  const handleRestart = () => {
    setGameState('shop');
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 p-8 rounded-xl border-4 border-yellow-500 text-center shadow-2xl">
        <h1 className={`text-6xl font-black mb-4 ${winner === 'player' ? 'text-green-400' : 'text-red-500'}`}>
          {winner === 'player' ? 'VICTORY!' : 'DEFEAT'}
        </h1>
        <p className="text-gray-300 mb-8 text-xl">
          {winner === 'player' ? 'You crushed the memes!' : 'The memes consumed you...'}
        </p>
        
        <button
          onClick={handleRestart}
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-xl rounded-lg transition-transform hover:scale-105 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

