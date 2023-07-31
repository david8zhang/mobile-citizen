import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface FNM_BottomNavConfig {
  onRoute: Function
}

export class FNM_BottomNav {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle

  constructor(scene: Home, config: FNM_BottomNavConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, Constants.WINDOW_HEIGHT - 120, Constants.WINDOW_WIDTH, 75, 0xffffff)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
  }
}
