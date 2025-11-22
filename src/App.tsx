import { useEffect } from 'react'
import { GameCanvas } from './components/GameCanvas'
import { useGameStore } from './stores/useGameStore'
import { GameOver } from './components/GameOver'
import { GachaScreen } from './components/GachaScreen'
import { CombatScreen } from './components/CombatScreen'
import { DeckBuilder } from './components/DeckBuilder'

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
      {/* Skip Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Game Layer - render first (background) */}
      {gameState === 'playing' && (
        <div className="w-full h-full absolute inset-0 z-0" aria-label="Game battlefield">
          <GameCanvas />
        </div>
      )}

      {/* UI Overlay Layer */}
      <main id="main-content" className="w-full h-full relative z-20">
        {gameState === 'playing' && <CombatScreen />}
        {gameState === 'gameover' && <GameOver />}
        {(gameState === 'shop' || gameState === 'gacha_reveal') && <GachaScreen />}
        {gameState === 'deck_builder' && <DeckBuilder />}
      </main>
      
      <div className="absolute inset-0 z-10 pointer-events-none p-4" aria-hidden="true">
          <h1 className="text-sm opacity-50 font-bold text-yellow-400">Gemini Meme Wars v0.1</h1>
      </div>

      {/* Live Region for Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="announcements"
      ></div>
    </div>
  )
}

export default App
