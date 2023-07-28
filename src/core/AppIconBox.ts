import { Home } from '~/scenes/Home'

export interface AppBoxConfig {
  position: {
    x: number
    y: number
  }
  width: number
  height: number
  name: string
  onClick: Function
}

export class AppIconBox {
  private scene: Home
  private appRect: Phaser.GameObjects.Rectangle
  private appText: Phaser.GameObjects.Text
  constructor(scene: Home, config: AppBoxConfig) {
    this.scene = scene
    this.appRect = this.scene.add
      .rectangle(config.position.x, config.position.y, config.width, config.height, 0xeeeeee)
      .setOrigin(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.appRect.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.appRect.setAlpha(1)
        config.onClick()
      })
      .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
        this.appRect.setAlpha(1)
        config.onClick()
      })
    this.appText = this.scene.add
      .text(config.position.x, config.position.y, config.name, {
        fontSize: '13px',
        color: 'black',
        align: 'center',
      })
      .setWordWrapWidth(config.width, true)
      .setWordWrapCallback((text) => {
        return text.split(' ')
      })
    this.appText.setPosition(
      this.appText.x + config.width / 2 - this.appText.displayWidth / 2,
      config.position.y + config.width / 2 - this.appText.displayHeight / 2
    )
  }
}
