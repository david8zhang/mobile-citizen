import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { NileBottomNavOption } from './NileBottomNavOption'
import { NileScreenTypes } from './NileScreenTypes'

export interface NileBottomNavConfig {
  onRoute: Function
}

export class NileBottomNav {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle
  private bottomNavOptions: NileBottomNavOption[] = []

  constructor(scene: Home, config: NileBottomNavConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, Constants.WINDOW_HEIGHT - 120, Constants.WINDOW_WIDTH, 75, 0xffffff)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.setupOptions(config)
  }

  setupOptions(config: NileBottomNavConfig) {
    const options = [
      {
        navOption: 'Browse',
        iconTexture: 'tags-solid',
        route: NileScreenTypes.BROWSE,
      },
      {
        navOption: 'Cart',
        iconTexture: 'cart-shopping-solid',
        route: NileScreenTypes.CART,
      },
      {
        navOption: 'Orders',
        iconTexture: 'box-open-solid',
        route: NileScreenTypes.ORDER_STATUS,
      },
    ]
    const optionWidth = Constants.WINDOW_WIDTH / options.length
    let x = 0
    options.forEach((option) => {
      const bottomNavOption = new NileBottomNavOption(this.scene, {
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
