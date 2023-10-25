import Phaser from 'phaser'
import { Save } from '~/utils/Save'

export class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
    new Save()
    window.addEventListener('keydown', (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault()
      }
    })
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
    this.load.image('list-solid', 'icons/list-solid.svg')
    this.load.image('chart-line-solid', 'icons/chart-line-solid.svg')
    this.load.image('angle-left-solid', 'icons/angle-left-solid.svg')
    this.load.image('angle-right-solid', 'icons/angle-right-solid.svg')
    this.load.image('building-columns-solid', 'icons/building-columns-solid.svg')
    this.load.image('pizza-slice-solid', 'icons/pizza-slice-solid.svg')
    this.load.image('video-solid', 'icons/video-solid.svg')
    this.load.image('football-solid', 'icons/football-solid.svg')
    this.load.image('newspaper-solid', 'icons/newspaper-solid.svg')
    this.load.image('car-solid', 'icons/car-solid.svg')
    this.load.image('arrow-left-solid', 'icons/arrow-left-solid.svg')
    this.load.image('circle-info-solid', 'icons/circle-info-solid.svg')
    this.load.image('lock-solid', 'icons/lock-solid.svg')
    this.load.image('lock-open-solid', 'icons/lock-open-solid.svg')
    this.load.image('background', 'background.png')

    // App icons
    this.load.image('bank', 'icons/apps/bank.png')
    this.load.image('clikclok', 'icons/apps/clikclok.png')
    this.load.image('dasheats', 'icons/apps/dasheats.png')
    this.load.image('fitness-monster', 'icons/apps/fitness-monster.png')
    this.load.image('friar-buck', 'icons/apps/friar-buck.png')
    this.load.image('myhealth', 'icons/apps/myhealth.png')
    this.load.image('nile', 'icons/apps/nile.png')
    this.load.image('email', 'icons/apps/email.png')
  }

  preload() {
    // Clik Clok
    this.load.image('arrow-up', 'clikclok/arrowUp.png')
    this.load.image('arrow-down', 'clikclok/arrowDown.png')
    this.load.image('arrow-left', 'clikclok/arrowLeft.png')
    this.load.image('arrow-right', 'clikclok/arrowRight.png')

    // DashEats
    this.load.image('car-red-horizontal', 'dasheats/cars/dasheats_car_red-horizontal.png')
    this.load.image('car-red-up', 'dasheats/cars/dasheats_car_red-up.png')
    this.load.image('car-red-down', 'dasheats/cars/dasheats_car_red-down.png')
    this.load.image('pizza', 'dasheats/menu-items/pizza.png')
    this.load.image('burger', 'dasheats/menu-items/burger.png')
    this.load.image('burrito', 'dasheats/menu-items/burrito.png')

    // Fitness-Monster
    this.load.image('a-key', 'fitness-monster/a-key.png')

    this.loadTilemaps()
    this.loadIcons()
  }

  loadTilemaps() {
    this.load.tilemapTiledJSON('dasheats-city', 'dasheats/dasheats-city.json')
    this.load.image('tilemap_packed', 'dasheats/tilemap_packed.png')
  }

  create() {
    this.scene.start('start')
  }
}
