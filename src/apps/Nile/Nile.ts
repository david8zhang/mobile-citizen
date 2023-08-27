import { Home } from '~/scenes/Home'
import { App } from '../App'
import { Constants } from '~/utils/Constants'
import { NileScreenTypes } from './NileScreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { Browse } from './screens/Browse'
import { Cart } from './screens/Cart'
import { OrderStatus } from './screens/OrderStatus'
import { NileBottomNav } from './NileBottomNav'

export class Nile extends App {
  private headerText!: Phaser.GameObjects.Text
  private screenMappings: {
    [key in NileScreenTypes]?: SubScreen
  }
  private currSubscreen: NileScreenTypes = NileScreenTypes.BROWSE
  private bottomNav: NileBottomNav

  constructor(scene: Home) {
    super(scene)
    this.screenMappings = {
      [NileScreenTypes.BROWSE]: new Browse(this.scene, this),
      [NileScreenTypes.CART]: new Cart(this.scene, this),
      [NileScreenTypes.ORDER_STATUS]: new OrderStatus(this.scene, this),
    }
    this.bottomNav = new NileBottomNav(this.scene, {
      onRoute: () => {},
    })
    this.setVisible(false)
  }

  renderSubscreen(newSubscreen: NileScreenTypes, data?: any) {
    if (this.currSubscreen !== newSubscreen) {
      const prevSubscreen = this.screenMappings[this.currSubscreen]
      if (prevSubscreen) {
        prevSubscreen.onHide()
        prevSubscreen.setVisible(false)
      }
    }
    this.currSubscreen = newSubscreen
    const subscreen = this.screenMappings[newSubscreen]
    if (subscreen) {
      subscreen.setVisible(true)
      subscreen.onRender(data)
    }
  }

  hideSubscreen() {
    const subscreen = this.screenMappings[this.currSubscreen]
    if (subscreen) {
      subscreen.setVisible(false)
    }
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'Nile', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 30
    )
  }

  public setVisible(isVisible: boolean): void {
    this.bottomNav.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }

  public onHide(onComplete?: Function | undefined): void {
    this.hideSubscreen()
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public render(onComplete?: Function | undefined): void {
    super.render(() => {
      this.renderSubscreen(NileScreenTypes.BROWSE)
      if (onComplete) {
        onComplete()
      }
    })
  }
}
