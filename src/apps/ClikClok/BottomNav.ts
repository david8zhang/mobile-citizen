import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface BottomNavConfig {
  onCreateNew: Function
}

export class BottomNav {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle
  public button!: Phaser.GameObjects.Rectangle

  private static BUTTON_WIDTH = 40
  public static BOTTOM_BAR_HEIGHT = 60

  constructor(scene: Home, config: BottomNavConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        0,
        Constants.WINDOW_HEIGHT - BottomNav.BOTTOM_BAR_HEIGHT - 15,
        Constants.WINDOW_WIDTH,
        BottomNav.BOTTOM_BAR_HEIGHT,
        0xffffff
      )
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.setupCreateButton(config.onCreateNew)
  }

  setupCreateButton(onCreateNew: Function) {
    this.button = this.scene.add
      .rectangle(
        this.bgRect.x + this.bgRect.displayWidth / 2 - BottomNav.BUTTON_WIDTH / 2,
        this.bgRect.y,
        BottomNav.BUTTON_WIDTH,
        BottomNav.BUTTON_WIDTH,
        0xdddddd
      )
      .setInteractive()
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStrokeStyle(2, 0x000000)
      .setOrigin(0, 0.5)
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.button.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        onCreateNew()
        this.button.setAlpha(1)
      })
      .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
        onCreateNew()
        this.button.setAlpha(1)
      })
  }

  setVisible(isVisible: boolean) {
    this.button.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
