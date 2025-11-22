import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load minimal assets here (loading bar, logo)
  }

  create() {
    this.scene.start('MainScene');
  }
}

