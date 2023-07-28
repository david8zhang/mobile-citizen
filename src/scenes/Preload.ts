import Phaser from 'phaser'

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  create() {
    this.scene.start('home')
  }
}
