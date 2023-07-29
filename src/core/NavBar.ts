import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface NavbarConfig {
  appName: string
  height: number
  strokeStyle?: {
    color: number
    width: number
  }
  fontStyle?: Phaser.Types.GameObjects.Text.TextStyle
}

export class Navbar {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle
  private navText: Phaser.GameObjects.Text
  private static STROKE_WIDTH = 1

  constructor(scene: Home, config: NavbarConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        Navbar.STROKE_WIDTH,
        Constants.TOP_BAR_HEIGHT,
        Constants.WINDOW_WIDTH - Navbar.STROKE_WIDTH * 2,
        config.height
      )
      .setFillStyle(0xffffff)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    if (config.strokeStyle) {
      this.bgRect.setStrokeStyle(config.strokeStyle.width, config.strokeStyle.color)
    }
    this.navText = this.scene.add
      .text(this.bgRect.x, this.bgRect.y, config.appName)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    if (config.fontStyle) {
      this.navText.setStyle(config.fontStyle)
    }
    this.navText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.navText.displayWidth / 2,
      this.bgRect.y + this.bgRect.displayHeight / 2 - this.navText.displayHeight / 2
    )
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.navText.setVisible(isVisible)
  }
}
