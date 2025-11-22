import Phaser from 'phaser';
import type { Card } from '../logic/types';

export class CardEntity extends Phaser.GameObjects.Container {
  private background: Phaser.GameObjects.Rectangle;
  private artBackground: Phaser.GameObjects.Rectangle;
  private emoji: Phaser.GameObjects.Text;
  private nameBand: Phaser.GameObjects.Rectangle;
  private nameText: Phaser.GameObjects.Text;
  private manaBarBg: Phaser.GameObjects.Rectangle;
  private manaBarFill: Phaser.GameObjects.Rectangle;
  private levelBadge: Phaser.GameObjects.Container;
  
  private cardData: Card;
  private maxMana: number;
  
  // Dimensions
  private static WIDTH = 100;
  private static HEIGHT = 150;

  constructor(scene: Phaser.Scene, x: number, y: number, card: Card) {
    super(scene, x, y);
    this.cardData = card;
    this.maxMana = card.manaMax || 100;

    // 1. Main Background (Frame)
    const rarityColor = this.getRarityColor(card.rarity);
    this.background = scene.add.rectangle(0, 0, CardEntity.WIDTH, CardEntity.HEIGHT, 0x1e293b);
    this.background.setStrokeStyle(3, rarityColor);
    this.add(this.background);

    // 2. Art Area (Top 75%)
    this.artBackground = scene.add.rectangle(0, -20, CardEntity.WIDTH - 6, CardEntity.HEIGHT * 0.75, 0x0f172a);
    this.add(this.artBackground);

    // 3. Emoji (Art)
    const icon = this.getIcon(card.id);
    this.emoji = scene.add.text(0, -25, icon, { fontSize: '64px' }).setOrigin(0.5);
    this.add(this.emoji);

    // 4. Name Band (Overlay on bottom of Art)
    this.nameBand = scene.add.rectangle(0, 25, CardEntity.WIDTH - 6, 24, 0x000000, 0.6);
    this.add(this.nameBand);

    this.nameText = scene.add.text(0, 25, card.name, { 
        fontSize: '12px', 
        fontFamily: 'Arial',
        fontStyle: 'bold',
        color: '#ffffff' 
    }).setOrigin(0.5);
    this.add(this.nameText);

    // 5. Stats Area (Bottom 25%)
    // Simplified stats visualization
    const statText = this.getStatSummary(card);
    const statsDisplay = scene.add.text(0, 55, statText, {
        fontSize: '10px',
        color: '#94a3b8',
        align: 'center'
    }).setOrigin(0.5);
    this.add(statsDisplay);

    // 6. Mana Bar (Absolute Bottom)
    this.manaBarBg = scene.add.rectangle(0, CardEntity.HEIGHT/2 - 4, CardEntity.WIDTH - 6, 6, 0x334155);
    this.add(this.manaBarBg);

    this.manaBarFill = scene.add.rectangle(- (CardEntity.WIDTH - 6)/2, CardEntity.HEIGHT/2 - 4, 0, 6, 0x3b82f6);
    this.manaBarFill.setOrigin(0, 0.5); // Grow from left
    this.add(this.manaBarFill);

    // 7. Level Badge (Top Right)
    this.levelBadge = this.createLevelBadge(scene, card.level);
    this.levelBadge.setPosition(CardEntity.WIDTH/2 - 15, -CardEntity.HEIGHT/2 + 15);
    this.add(this.levelBadge);

    scene.add.existing(this);
  }

  public updateMana(current: number, max: number) {
    const percent = Math.min(1, Math.max(0, current / max));
    const maxWidth = CardEntity.WIDTH - 6;
    this.manaBarFill.width = maxWidth * percent;
    
    // Visual cue when ready
    if (percent >= 1) {
        this.manaBarFill.setFillStyle(0xfacc15); // Yellow
        this.background.setStrokeStyle(4, 0xfacc15);
    } else {
        this.manaBarFill.setFillStyle(0x3b82f6); // Blue
        this.background.setStrokeStyle(3, this.getRarityColor(this.cardData.rarity));
    }
  }

  public triggerPulse() {
    this.scene.tweens.add({
        targets: this,
        scale: 1.1,
        duration: 100,
        yoyo: true,
        ease: 'Quad.easeInOut'
    });
  }

  private getRarityColor(rarity: string): number {
    switch(rarity) {
        case 'common': return 0x94a3b8;
        case 'rare': return 0x3b82f6;
        case 'epic': return 0xa855f7;
        case 'legendary': return 0xf97316;
        default: return 0x94a3b8;
    }
  }

  private createLevelBadge(scene: Phaser.Scene, level: number): Phaser.GameObjects.Container {
    const container = scene.add.container(0, 0);
    const bg = scene.add.circle(0, 0, 12, 0xfacc15);
    bg.setStrokeStyle(1, 0x000000);
    const text = scene.add.text(0, 0, `${level}`, { 
        fontSize: '12px', 
        color: '#000000', 
        fontStyle: 'bold' 
    }).setOrigin(0.5);
    container.add([bg, text]);
    return container;
  }

  private getStatSummary(card: Card): string {
    const parts = [];
    if (card.stats.strength) parts.push(`⚔️${card.stats.strength}`);
    if (card.stats.maxHP) parts.push(`❤️${card.stats.maxHP}`);
    if (card.stats.attackSpeed) parts.push(`⚡${card.stats.attackSpeed}`);
    return parts.join(' ');
  }

  private getIcon(id: string): string {
    switch(id) {
        case 'c_beefy': return '🥩';
        case 'c_workout': return '💪';
        case 'c_coffee': return '☕';
        case 'c_sneakers': return '👟';
        case 'c_tank': return '🎽';
        case 'c_chad': return '🗿';
        case 'c_wizard': return '🧙';
        case 'c_vamp': return '🧛';
        default: return '🃏';
    }
  }
}
