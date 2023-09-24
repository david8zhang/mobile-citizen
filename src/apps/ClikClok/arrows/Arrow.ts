import { Home } from '~/scenes/Home'
import { Direction } from '../ClikClokConstants'
import { Constants } from '~/utils/Constants'

export interface ArrowConfig {
  position: { x: number; y: number }
  direction: Direction
}

export class Arrow {
  public scene: Home
  public direction: Direction
  public sprite: Phaser.Physics.Arcade.Sprite

  constructor(scene: Home, config: ArrowConfig) {
    this.scene = scene
    this.direction = config.direction

    const { x, y } = config.position
    this.sprite = this.scene.physics.add.sprite(x, y, `arrow-${config.direction}`)
    this.sprite.setDepth(Constants.SORT_LAYERS.APP_UI)
    this.sprite.body.setSize(this.sprite.width, this.sprite.height)

    const spriteBody = this.sprite.body as Phaser.Physics.Arcade.Body
    spriteBody.setCollideWorldBounds(true)
    spriteBody.onWorldBounds = true
  }

  setVelocity(x: number, y: number) {
    this.sprite.setVelocity(x, y)
  }
}
