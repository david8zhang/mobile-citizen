import Phaser from 'phaser'
import { Save } from '~/utils/Save'

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
    new Save()
  }

  loadIcons() {
    this.load.image('sack-dollar-solid', 'icons/sack-dollar-solid.svg')
    this.load.image('circle-user-solid', 'icons/circle-user-solid.svg')
    this.load.image('plus-solid', 'icons/plus-solid.svg')
  }

  preload() {
    this.load.image('arrow-up', 'arrowUp.png')
    this.load.image('arrow-down', 'arrowDown.png')
    this.load.image('arrow-left', 'arrowLeft.png')
    this.load.image('arrow-right', 'arrowRight.png')
    this.loadIcons()
  }

  create() {
    this.scene.start('home')
  }
}
