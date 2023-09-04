import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface BottomNavOptionConfig {
  width: number
  height: number
  position: {
    x: number
    y: number
  }
  iconTexture: string
  onClick: Function
  navOption: string
}

export class BottomNavOption {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle
  private sprite: Phaser.GameObjects.Sprite
  private navOptionText: Phaser.GameObjects.Text

  constructor(scene: Home, config: BottomNavOptionConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(config.position.x, config.position.y, config.width, config.height, 0xffffff)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.sprite = this.scene.add
      .sprite(
        config.position.x + this.bgRect.displayWidth / 2 - 15,
        config.position.y + this.bgRect.displayHeight / 2 - 30,
        config.iconTexture
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setDisplaySize(30, 30)
    this.bgRect
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.bgRect.setAlpha(0.5)
        this.sprite.setAlpha(0.5)
        this.navOptionText.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.bgRect.setAlpha(1)
        this.sprite.setAlpha(1)
        this.navOptionText.setAlpha(1)
        config.onClick()
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.navOptionText = this.scene.add
      .text(
        config.position.x,
        config.position.y + this.sprite.displayHeight + 15,
        `${config.navOption}`,
        {
          fontSize: '15px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.navOptionText.setPosition(
      config.position.x + this.bgRect.displayWidth / 2 - this.navOptionText.displayWidth / 2,
      this.navOptionText.y
    )
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.sprite.setVisible(isVisible)
    this.navOptionText.setVisible(isVisible)
  }
}
