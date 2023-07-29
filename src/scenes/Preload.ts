import Phaser from 'phaser'
import { Save } from '~/utils/Save'

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
    new Save()
  }

  create() {
    this.scene.start('home')
  }
}
