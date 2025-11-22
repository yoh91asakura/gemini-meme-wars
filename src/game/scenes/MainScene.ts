import Phaser from 'phaser';
import { PlayerEntity } from '../objects/PlayerEntity';
import { ProjectileManager, Projectile } from '../objects/Projectile';
import { CardEntity } from '../objects/CardEntity';
import { BASE_PLAYER_STATS, aggregateStats } from '../logic/statCalculator';
import { calculateDamage } from '../logic/damageCalculator';
import { useGameStore } from '../../stores/useGameStore';
import { initializeBattleState, tickBattleState } from '../logic/battleSystem';
import { generateEnemyDeck } from '../logic/enemyAI';
import type { BattleState } from '../logic/battleSystem';
import type { CardEffect } from '../logic/types';

export class MainScene extends Phaser.Scene {
  private player!: PlayerEntity;
  private enemy!: PlayerEntity;
  private projectileManager!: ProjectileManager;
  
  // Visual Card Decks
  private playerCards: CardEntity[] = [];
  private enemyCards: CardEntity[] = []; 

  private playerNextFireTime: number = 0;
  private enemyNextFireTime: number = 0;
  private isGameActive: boolean = false;

  private battleState!: BattleState;
  private enemyBattleState!: BattleState; 

  constructor() {
    super('MainScene');
  }

  create() {
    const { width, height } = this.scale;

    // Load State from Store
    const store = useGameStore.getState();

    // Background
    this.add.grid(width / 2, height / 2, width, height, 50, 50, 0x000000, 0, 0xffffff, 0.1);

    // Systems
    this.projectileManager = new ProjectileManager(this);

    // Entities
    // Player on left
    const playerStats = aggregateStats(BASE_PLAYER_STATS, store.deck);
    this.player = new PlayerEntity(this, 100, height / 2, playerStats, true);
    
    // Render Player Deck
    this.playerCards.forEach(c => c.destroy());
    this.playerCards = [];
    store.deck.forEach((card, index) => {
        const cardEntity = new CardEntity(this, 50, 100 + (index * 120), card);
        cardEntity.setScale(0.6);
        this.playerCards.push(cardEntity);
    });

    // Enemy AI Setup
    const difficulty = Math.max(1, store.wins + 1); 
    const enemyDeck = generateEnemyDeck(difficulty);
    const enemyStatsBase = { ...BASE_PLAYER_STATS }; 
    const enemyStats = aggregateStats(enemyStatsBase, enemyDeck);
    
    // Enemy on right
    this.enemy = new PlayerEntity(this, width - 100, height / 2, enemyStats, false);

    // Render Enemy Deck (Right side column)
    this.enemyCards.forEach(c => c.destroy());
    this.enemyCards = [];
    enemyDeck.forEach((card, index) => {
        // Mirrored position on right
        const cardEntity = new CardEntity(this, width - 50, 100 + (index * 120), card);
        cardEntity.setScale(0.6);
        this.enemyCards.push(cardEntity);
    });

    // Initialize Battle Logic States
    this.battleState = initializeBattleState(store.deck);
    this.enemyBattleState = initializeBattleState(enemyDeck);

    // Collisions
    this.physics.add.overlap(
      this.projectileManager.getGroup(),
      this.player,
      this.handleProjectileHitPlayer,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.projectileManager.getGroup(),
      this.enemy,
      this.handleProjectileHitEnemy,
      undefined,
      this
    );
    
    // Start Game
    this.isGameActive = true;
    useGameStore.getState().setGameState('playing');
  }

  update(time: number, delta: number) {
    if (!this.isGameActive) return;

    const deltaSeconds = delta / 1000;

    // --- REGEN TICKS ---
    // We can apply regen simply by adding to HP over time
    // Or we can do it cleanly via a system. Let's do simple here for now.
    this.applyRegen(this.player, deltaSeconds);
    this.applyRegen(this.enemy, deltaSeconds);

    this.player.update(time, delta);
    this.enemy.update(time, delta);

    // --- PLAYER BATTLE TICK ---
    const playerTick = tickBattleState(
        this.battleState, 
        deltaSeconds, 
        this.player.getStats()
    );
    this.battleState = playerTick.newState;

    // Update Player Visuals
    this.battleState.cards.forEach(activeCard => {
        const visualCard = this.playerCards.find(c => (c as any).cardData.id === activeCard.cardId);
        if (visualCard) visualCard.updateMana(activeCard.currentMana, activeCard.maxMana);
    });
    playerTick.triggeredEffects.forEach(effect => this.handleCardEffect(effect, 'player'));


    // --- ENEMY BATTLE TICK ---
    const enemyTick = tickBattleState(
        this.enemyBattleState, 
        deltaSeconds, 
        this.enemy.getStats()
    );
    this.enemyBattleState = enemyTick.newState;

    // Update Enemy Visuals
    this.enemyBattleState.cards.forEach(activeCard => {
        const visualCard = this.enemyCards.find(c => (c as any).cardData.id === activeCard.cardId); 
        if (visualCard) visualCard.updateMana(activeCard.currentMana, activeCard.maxMana);
    });
    enemyTick.triggeredEffects.forEach(effect => this.handleCardEffect(effect, 'enemy'));


    // Player Auto-Fire
    if (time >= this.playerNextFireTime) {
      const stats = this.player.getStats();
      this.projectileManager.fireProjectile(
        this.player.x + 30, 
        this.player.y, 
        400, 
        stats.strength, // Base damage for bullet, updated calculation in hit handler
        'player',
        '🥥'
      );
      this.playerNextFireTime = time + (1000 / stats.attackSpeed);
    }

    // Enemy Auto-Fire
    if (time >= this.enemyNextFireTime) {
      const stats = this.enemy.getStats();
      this.projectileManager.fireProjectile(
        this.enemy.x - 30, 
        this.enemy.y, 
        -400, 
        stats.strength, 
        'enemy',
        '💢'
      );
      this.enemyNextFireTime = time + (1000 / stats.attackSpeed);
    }
    
    this.updateUIStore();
    this.checkGameOver();
  }

  private applyRegen(entity: PlayerEntity, deltaSeconds: number) {
    const stats = entity.getStats();
    if (stats.regen > 0 && stats.currentHP < stats.maxHP) {
        const healAmount = stats.regen * deltaSeconds;
        stats.currentHP = Math.min(stats.maxHP, stats.currentHP + healAmount);
    }
  }

  private handleCardEffect(effect: CardEffect, source: 'player' | 'enemy') {
    let targetEntity: PlayerEntity;
    let sourceEntity: PlayerEntity;
    let sourceCards: CardEntity[];

    if (source === 'player') {
        sourceEntity = this.player;
        targetEntity = (effect.target === 'self') ? this.player : this.enemy;
        sourceCards = this.playerCards;
    } else {
        sourceEntity = this.enemy;
        targetEntity = (effect.target === 'self') ? this.enemy : this.player;
        sourceCards = this.enemyCards;
    }

    // Visual Popup
    const color = source === 'player' ? '#00ffff' : '#ff00ff';
    this.showFloatingText(sourceEntity.x, sourceEntity.y - 80, `ULTIMATE!`, color);

    // Trigger visual pulse on source cards
    sourceCards.forEach(c => c.triggerPulse());

    if (effect.type === 'heal') {
        const stats = targetEntity.getStats();
        const oldHP = stats.currentHP;
        stats.currentHP = Math.min(stats.maxHP, stats.currentHP + effect.value);
        const healed = Math.floor(stats.currentHP - oldHP);
        this.showFloatingText(targetEntity.x, targetEntity.y, `+${healed}`, '#00ff00');
    } else if (effect.type === 'damage') {
        // Apply damage reduction/defense/dodge logic here too? 
        // For ultimates, let's say they are "True Damage" or "Magic Damage" that ignores defense for now?
        // Or just use simple subtraction.
        targetEntity.takeDamage(effect.value);
        this.showFloatingText(targetEntity.x, targetEntity.y, `-${effect.value}`, '#ff0000');
    }
  }

  private showFloatingText(x: number, y: number, message: string, color: string = '#ffffff') {
      const text = this.add.text(x, y, message, { 
          fontSize: '24px', 
          fontStyle: 'bold',
          color: color,
          stroke: '#000000',
          strokeThickness: 4
      }).setOrigin(0.5);

      this.tweens.add({
          targets: text,
          y: y - 50,
          alpha: 0,
          duration: 1000,
          onComplete: () => text.destroy()
      });
  }

  private checkGameOver() {
    const playerDead = this.player.getStats().currentHP <= 0;
    const enemyDead = this.enemy.getStats().currentHP <= 0;

    if (playerDead || enemyDead) {
      this.isGameActive = false;
      this.physics.pause();
      
      const winner = playerDead ? 'enemy' : 'player';
      const store = useGameStore.getState();
      
      if (winner === 'player') {
        store.addGold(50);
        store.incrementWins(); 
      } else {
        store.addGold(10);
      }

      store.setWinner(winner);
      store.setGameState('gameover');
    }
  }

  private handleProjectileHitPlayer(obj1: any, obj2: any) {
    const player = obj1 as PlayerEntity;
    const projectile = obj2 as Projectile;

    if (projectile.ownerId === 'player') return; 

    // Use the updated damage calculator which handles Dodge & Crit
    // Note: Projectile damage is currently just passing "strength". 
    // Ideally, the projectile should carry the full snapshot of attacker stats, 
    // or we calculate damage at fire time.
    // For now, we'll trust the strength passed in projectile.damage as the "Attack Power"
    // BUT we need the attacker's crit chance/multiplier. 
    // Since we don't have the attacker reference easily here without looking it up:
    // Let's assume Projectile carries "AttackerStats" in a real ECS, 
    // but for MVP, we'll fetch the Enemy's current stats.
    const attackerStats = this.enemy.getStats(); // Enemy fired this
    const defenderStats = player.getStats();

    const result = calculateDamage(attackerStats, defenderStats);
    
    if (result.isDodge) {
        this.showFloatingText(player.x, player.y - 30, "DODGE!", "#ffff00");
    } else {
        let damageText = `-${result.damage}`;
        let color = '#ff0000';
        if (result.isCrit) {
            damageText += " CRIT!";
            color = '#ff00ff'; // Purple for crit
        }
        player.takeDamage(result.damage);
        this.showFloatingText(player.x, player.y, damageText, color);
    }

    projectile.disable();
  }

  private handleProjectileHitEnemy(obj1: any, obj2: any) {
    const enemy = obj1 as PlayerEntity;
    const projectile = obj2 as Projectile;

    if (projectile.ownerId === 'enemy') return; 

    const attackerStats = this.player.getStats(); // Player fired this
    const defenderStats = enemy.getStats();

    const result = calculateDamage(attackerStats, defenderStats);

    if (result.isDodge) {
        this.showFloatingText(enemy.x, enemy.y - 30, "DODGE!", "#ffff00");
    } else {
        let damageText = `-${result.damage}`;
        let color = '#ff0000';
        if (result.isCrit) {
            damageText += " CRIT!";
            color = '#ff00ff';
        }
        enemy.takeDamage(result.damage);
        this.showFloatingText(enemy.x, enemy.y, damageText, color);
    }

    projectile.disable();
  }
  
  private updateUIStore() {
    const playerStats = this.player.getStats();
    const enemyStats = this.enemy.getStats();
    
    useGameStore.getState().updateStats(
      playerStats.currentHP,
      playerStats.maxHP,
      enemyStats.currentHP,
      enemyStats.maxHP
    );
    
    if (this.battleState) {
        useGameStore.getState().updateActiveCards(this.battleState.cards);
    }
  }
}
