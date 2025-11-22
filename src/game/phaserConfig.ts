import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { MainScene } from './scenes/MainScene';

export const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#1e293b', // slate-800 matching Tailwind
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%',
    height: '100%',
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true, // Set to false in production
    },
  },
  scene: [BootScene, MainScene],
};

