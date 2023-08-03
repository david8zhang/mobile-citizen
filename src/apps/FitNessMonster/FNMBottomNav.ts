import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { FNMBottomNavOption } from './FNMBottonNavOption'
import { FNM_ScreenTypes } from './FNMScreenTypes'

export interface FNM_BottomNavConfig {
  onRoute: Function
}

export class FNM_BottomNav {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle
  private bottomNavOptions: FNMBottomNavOption[] = []

  constructor(scene: Home, config: FNM_BottomNavConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, Constants.WINDOW_HEIGHT - 120, Constants.WINDOW_WIDTH, 75, 0xffffff)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.setupOptions(config)
  }

  setupOptions(config: FNM_BottomNavConfig) {
    const optionWidth = Constants.WINDOW_WIDTH / 2
    const options = [
      {
        navOption: 'Workout',
        iconTexture: 'dumbbell-solid',
        route: FNM_ScreenTypes.CHOOSE_WORKOUT,
      },
      {
        navOption: 'Stats',
        iconTexture: 'heart-pulse-solid',
        route: FNM_ScreenTypes.FITNESS_STATS,
      },
    ]
    let x = 0
    options.forEach((option) => {
      const bottomNavOption = new FNMBottomNavOption(this.scene, {
        position: {
          x,
          y: this.bgRect.y,
        },
        width: optionWidth,
        height: this.bgRect.displayHeight,
        iconTexture: option.iconTexture,
        navOption: option.navOption,
        onClick: () => {
          config.onRoute(option.route)
        },
      })
      this.bottomNavOptions.push(bottomNavOption)
      x += optionWidth
    })
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.bottomNavOptions.forEach((option) => {
      option.setVisible(isVisible)
    })
  }
}
