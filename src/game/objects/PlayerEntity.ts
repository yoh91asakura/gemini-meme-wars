import Phaser from 'phaser';
import type { PlayerStats } from '../logic/types';

export class PlayerEntity extends Phaser.GameObjects.Container {
  private avatar: Phaser.GameObjects.Text;
  private hpBar: Phaser.GameObjects.Graphics;
  private currentStats: PlayerStats;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private isPlayer: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number, stats: PlayerStats, isPlayer: boolean = false) {
    super(scene, x, y);
    this.currentStats = { ...stats }; // Clone stats
    this.isPlayer = isPlayer;

    // Create visual avatar (using Text for now as placeholder for Emoji)
    const emoji = isPlayer ? '🧙‍♂️' : '🤖';
    this.avatar = scene.add.text(0, 0, emoji, { fontSize: '48px' }).setOrigin(0.5);
    this.add(this.avatar);

    // Create HP Bar
    this.hpBar = scene.add.graphics();
    this.updateHealthBar();
    this.add(this.hpBar);

    // Physics
    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setCollideWorldBounds(true);
    body.setSize(40, 40);
    body.setOffset(-20, -20); // Center the physics body

    // Input (only for player)
    if (this.isPlayer && scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
    }

    scene.add.existing(this);
  }

  update(time: number, delta: number) {
    if (this.isPlayer && this.cursors) {
      const speed = this.currentStats.moveSpeed;
      const body = this.body as Phaser.Physics.Arcade.Body;

      body.setVelocity(0);

      if (this.cursors.up.isDown) {
        body.setVelocityY(-speed);
      } else if (this.cursors.down.isDown) {
        body.setVelocityY(speed);
      }
    } else if (!this.isPlayer) {
      // Simple AI: Bob up and down
      const body = this.body as Phaser.Physics.Arcade.Body;
      const speed = this.currentStats.moveSpeed * 0.5;
      // Basic sine wave movement based on time would be better, but using physics velocity for collision consistency
      body.setVelocityY(Math.sin(time / 500) * speed);
    }
    
    this.updateHealthBar();
  }

  takeDamage(amount: number) {
    this.currentStats.currentHP = Math.max(0, this.currentStats.currentHP - amount);
    this.updateHealthBar();
    
    // Flash effect
    this.scene.tweens.add({
      targets: this.avatar,
      alpha: 0.5,
      duration: 50,
      yoyo: true,
      repeat: 1
    });

    if (this.currentStats.currentHP <= 0) {
      // Handle death (emit event or callback)
      // For now just hide/disable
      this.setAlpha(0.5);
    }
  }

  private updateHealthBar() {
    this.hpBar.clear();
    
    const width = 60;
    const height = 10;
    const x = -width / 2;
    const y = -40; // Above head

    // Background
    this.hpBar.fillStyle(0x000000);
    this.hpBar.fillRect(x, y, width, height);

    // Health
    const percent = this.currentStats.currentHP / this.currentStats.maxHP;
    const color = percent > 0.5 ? 0x00ff00 : percent > 0.2 ? 0xffff00 : 0xff0000;
    
    this.hpBar.fillStyle(color);
    this.hpBar.fillRect(x + 1, y + 1, (width - 2) * percent, height - 2);
  }

  public getStats(): PlayerStats {
    return this.currentStats;
  }
}

