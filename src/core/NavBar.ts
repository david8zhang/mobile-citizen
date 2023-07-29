import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface NavbarConfig {
  appName: string
}

export class Navbar {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle
  private navText: Phaser.GameObjects.Text

  private static NAVBAR_HEIGHT = 60
  private static STROKE_WIDTH = 1

  constructor(scene: Home, config: NavbarConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        Navbar.STROKE_WIDTH,
        Constants.TOP_BAR_HEIGHT,
        Constants.WINDOW_WIDTH - Navbar.STROKE_WIDTH * 2,
        Navbar.NAVBAR_HEIGHT
      )
      .setStrokeStyle(Navbar.STROKE_WIDTH, 0x000000)
      .setFillStyle(0xffffff)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.navText = this.scene.add
      .text(this.bgRect.x, this.bgRect.y, config.appName, {
        fontSize: '22px',
        color: 'black',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
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
