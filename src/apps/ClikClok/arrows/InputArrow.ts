import { Arrow } from './Arrow'
import { ClikClokConstants, Direction } from '../ClikClokConstants'
import { Home } from '~/scenes/Home'
import { RecordVideo } from '../screens/RecordVideo'
import { Constants } from '~/utils/Constants'

export interface InputArrowConfig {
  position: {
    x: number
    y: number
  }
  direction: Direction
}

export class InputArrow {
  private scene: Home
  public parent: RecordVideo
  public direction: Direction
  public sprite: Phaser.Physics.Arcade.Sprite

  constructor(scene: Home, parent: RecordVideo, config: InputArrowConfig) {
    this.scene = scene
    this.parent = parent
    this.direction = config.direction

    const { x, y } = config.position
    this.sprite = this.scene.physics.add
      .sprite(x, y, `arrow-${config.direction}`)
      .setTintFill(0xffffff)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  removeOverlappingArrow() {
    const arrowsOnScreen = this.parent.arrowSpawner.getArrows()
    let overlappingArrow: Arrow | null = null
    let overlappingYDiff: number = 0
    arrowsOnScreen.forEach((arrow) => {
      const arrowSprite = arrow.sprite
      let yDiff = Math.abs(this.sprite.y - arrowSprite.y)
      const xDiff = Math.abs(this.sprite.x - arrowSprite.x)
      if (yDiff < ClikClokConstants.ARROW_DIFF_DIST && xDiff == 0 && arrow.sprite.active) {
        overlappingYDiff = yDiff
        overlappingArrow = arrow
      }
    })
    if (overlappingArrow) {
      this.parent.processInputSuperlative(overlappingYDiff)
      this.removeArrow(overlappingArrow)
    } else {
      this.parent.processMiss(this)
    }
  }

  removeArrow(overlappingArrow: Arrow) {
    overlappingArrow.setVelocity(0, 0)
    this.scene.tweens.add({
      targets: [overlappingArrow.sprite],
      alpha: { from: 1, to: 0 },
      ease: 'Linear',
      duration: 100,
    })
    this.scene.tweens.add({
      targets: [overlappingArrow.sprite],
      scale: { from: 1, to: 2 },
      ease: 'Linear',
      duration: 100,
    })
    this.scene.time.delayedCall(150, () => {
      overlappingArrow.sprite.destroy()
    })
  }

  highlight() {
    this.sprite.setTintFill(0xffff00)
  }

  dehighlight() {
    this.sprite.setTintFill(0xffffff)
  }

  setVisible(isVisible: boolean) {
    this.sprite.setVisible(isVisible)
  }
}
