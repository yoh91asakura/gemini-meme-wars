import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { phaserConfig } from '../game/phaserConfig';

export const GameCanvas: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Ensure the DOM element exists before initializing Phaser
    const initPhaser = () => {
      const container = document.getElementById('phaser-container');
      if (container && !gameRef.current) {
        gameRef.current = new Phaser.Game(phaserConfig);
      }
    };

    // Small delay to ensure React has completed rendering the DOM
    const timeoutId = setTimeout(initPhaser, 100);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup on unmount
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="phaser-container"
      className="w-full h-full relative"
      style={{ minHeight: '100vh', minWidth: '100vw' }}
    />
  );
};
