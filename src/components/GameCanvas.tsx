import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { phaserConfig } from '../game/phaserConfig';

export const GameCanvas: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Initialize Phaser game only once
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(phaserConfig);
    }

    return () => {
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
    />
  );
};

