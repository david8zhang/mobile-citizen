import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface AppBoxConfig {
  position: {
    x: number
    y: number
  }
  width: number
  height: number
  name: string
  onClick: Function
  spriteTexture: string
}

export class AppIconBox {
  private scene: Home
  private sprite: Phaser.GameObjects.Sprite
  private appText: Phaser.GameObjects.Text
  constructor(scene: Home, config: AppBoxConfig) {
    this.scene = scene
    this.sprite = this.scene.add
      .sprite(config.position.x + 10, config.position.y + 10, config.spriteTexture)
      .setDisplaySize(config.width - 20, config.height - 20)
      .setTintFill(0xffffff)
      .setOrigin(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.sprite.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.sprite.setAlpha(1)
        config.onClick()
      })
    this.appText = this.scene.add
      .text(config.position.x, config.position.y + this.sprite.displayHeight + 30, config.name, {
        fontSize: '13px',
        color: 'white',
        align: 'center',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setWordWrapWidth(config.width, true)
      .setWordWrapCallback((text) => {
        return text.split(' ')
      })
    this.appText.setPosition(
      this.appText.x + config.width / 2 - this.appText.displayWidth / 2,
      this.appText.y
    )
  }
}
