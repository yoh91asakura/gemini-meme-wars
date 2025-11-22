import Phaser from 'phaser';

export class Projectile extends Phaser.GameObjects.Text {
  public damage: number = 0;
  public ownerId: string = ''; // 'player' or 'enemy'

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, '🔥', { fontSize: '24px' });
    scene.physics.add.existing(this);
    this.setOrigin(0.5);
  }

  fire(x: number, y: number, speed: number, damage: number, ownerId: string, texture: string = '🔥') {
    this.setPosition(x, y);
    this.setText(texture);
    this.setActive(true);
    this.setVisible(true);
    this.damage = damage;
    this.ownerId = ownerId;

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(speed);
    body.enable = true;
  }

  update(time: number, delta: number) {
    if (this.x > this.scene.scale.width + 50 || this.x < -50) {
      this.disable();
    }
  }

  disable() {
    this.setActive(false);
    this.setVisible(false);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.enable = false;
    body.setVelocity(0);
  }
}

export class ProjectileManager {
  private group: Phaser.Physics.Arcade.Group;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.group = scene.physics.add.group({
      classType: Projectile,
      runChildUpdate: true,
      maxSize: 100,
    });
  }

  fireProjectile(x: number, y: number, speed: number, damage: number, ownerId: string, texture: string = '🔥') {
    const projectile = this.group.get() as Projectile;
    if (projectile) {
      projectile.fire(x, y, speed, damage, ownerId, texture);
    }
  }

  getGroup() {
    return this.group;
  }
}

