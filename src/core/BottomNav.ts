import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { CC_ScreenTypes } from '~/apps/ClikClok/CCScreenTypes'
import { DE_ScreenTypes } from '~/apps/DashEats/DEScreenTypes'
import { FNM_ScreenTypes } from '~/apps/FitNessMonster/FNMScreenTypes'
import { NileScreenTypes } from '~/apps/Nile/NileScreenTypes'
import { BottomNavOption } from './BottomNavOption'
import { FB_ScreenTypes } from '~/apps/FriarBuck/FBscreenTypes'

export interface BottomNavConfig {
  onRoute: Function
  options: {
    navOption: string
    iconTexture: string
    route: FB_ScreenTypes | CC_ScreenTypes | DE_ScreenTypes | FNM_ScreenTypes | NileScreenTypes
  }[]
}

export class BottomNav {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle
  private bottomNavOptions: BottomNavOption[] = []

  constructor(scene: Home, config: BottomNavConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, Constants.WINDOW_HEIGHT - 120, Constants.WINDOW_WIDTH, 75, 0xffffff)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.setupOptions(config)
  }

  setupOptions(config: BottomNavConfig) {
    const optionWidth = Constants.WINDOW_WIDTH / config.options.length
    let x = 0
    config.options.forEach((option) => {
      const bottomNavOption = new BottomNavOption(this.scene, {
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
