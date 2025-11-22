import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2, 'Gemini Meme Wars\nBattle Arena Ready', {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    // Debug grid
    this.add.grid(width / 2, height / 2, width, height, 50, 50, 0x000000, 0, 0xffffff, 0.2);
  }

  update(time: number, delta: number) {
    // Game loop
  }
}

