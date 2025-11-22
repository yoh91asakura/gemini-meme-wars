import { useState, useEffect } from 'react'
import { GameCanvas } from './components/GameCanvas'
import { useGameStore } from './stores/useGameStore'
import { HUD } from './components/HUD'
import { GameOver } from './components/GameOver'
import { GachaScreen } from './components/GachaScreen'

function App() {
  const { gameState, setGameState } = useGameStore()

  // Redirect lobby to shop for now
  useEffect(() => {
    if (gameState === 'lobby') {
        setGameState('shop');
    }
  }, [gameState, setGameState]);

  return (
    <div className="w-full h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* UI Overlay Layer */}
      {gameState === 'playing' && <HUD />}
      {gameState === 'gameover' && <GameOver />}
      {(gameState === 'shop' || gameState === 'gacha_reveal') && <GachaScreen />}
      
      <div className="absolute inset-0 z-10 pointer-events-none p-4">
          <h1 className="text-sm opacity-50 font-bold text-yellow-400">Gemini Meme Wars v0.1</h1>
      </div>

      {/* Game Layer - only render when playing */}
      {gameState === 'playing' && (
        <div className="w-full h-full absolute inset-0">
          <GameCanvas />
        </div>
      )}
    </div>
  )
}

export default App
