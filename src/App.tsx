import { useState, useEffect } from 'react'
import { GameCanvas } from './components/GameCanvas'
import { useGameStore } from './stores/useGameStore'

function App() {
  const { isGameRunning } = useGameStore()

  return (
    <div className="w-full h-screen bg-slate-900 text-white overflow-hidden">
      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-yellow-400">Gemini Meme Wars</h1>
          {/* Placeholder for HUD */}
        </div>
      </div>

      {/* Game Layer */}
      <div className="w-full h-full">
        <GameCanvas />
      </div>
    </div>
  )
}

export default App
