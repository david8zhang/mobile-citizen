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
    this.load.image('dumbbell-solid', 'icons/dumbbell-solid.svg')
    this.load.image('heart-pulse-solid', 'icons/heart-pulse-solid.svg')
    this.load.image('book-solid', 'icons/book-solid.svg')
    this.load.image('bolt-solid', 'icons/bolt-solid.svg')
    this.load.image('heart-solid', 'icons/heart-solid.svg')
    this.load.image('burger-solid', 'icons/burger-solid.svg')
    this.load.image('caret-up-solid', 'icons/caret-up-solid.svg')
    this.load.image('power-off-solid', 'icons/power-off-solid.svg')
    this.load.image('envelope-solid', 'icons/envelope-solid.svg')
    this.load.image('box-open-solid', 'icons/box-open-solid.svg')
    this.load.image('cart-shopping-solid', 'icons/cart-shopping-solid.svg')
    this.load.image('tags-solid', 'icons/tags-solid.svg')
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
