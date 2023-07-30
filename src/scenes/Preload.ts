import Phaser from 'phaser'
import { Save } from '~/utils/Save'

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
    new Save()
  }

  preload() {
    this.load.image('arrow-up', 'arrowUp.png')
    this.load.image('arrow-down', 'arrowDown.png')
    this.load.image('arrow-left', 'arrowLeft.png')
    this.load.image('arrow-right', 'arrowRight.png')
  }

  create() {
    this.scene.start('home')
  }
}
