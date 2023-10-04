import { Home } from '~/scenes/Home'
import { App } from '../App'
import { DE_ScreenTypes } from './DEScreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { Menu } from './screens/Menu'
import { MenuItem } from './screens/MenuItem'
import { OrderProgress } from './screens/OrderProgress'
import { Save, SaveKeys } from '~/utils/Save'
import { OrderConfirm } from './screens/OrderConfirm'
import { BottomNav } from '~/core/BottomNav'
import { DeliveryGame } from './screens/DeliveryGame'
import { SelectDeliveryJob } from './screens/SelectDeliveryJob'

export class DashEats extends App {
  private screenMappings: {
    [key in DE_ScreenTypes]?: SubScreen
  }
  private currSubscreen: DE_ScreenTypes = DE_ScreenTypes.MENU
  public bottomNav: BottomNav

  constructor(scene: Home) {
    super(scene)
    this.screenMappings = {
      [DE_ScreenTypes.MENU]: new Menu(this.scene, this),
      [DE_ScreenTypes.MENU_ITEM]: new MenuItem(this.scene, this),
      [DE_ScreenTypes.CONFIRM_ORDER]: new OrderConfirm(this.scene, this),
      [DE_ScreenTypes.ORDER_PROGRESS]: new OrderProgress(this.scene, this),
      [DE_ScreenTypes.DELIVERY_GAME]: new DeliveryGame(this.scene, this),
      [DE_ScreenTypes.SELECT_DELIVERY_JOB]: new SelectDeliveryJob(this.scene, this),
    }
    this.bottomNav = new BottomNav(this.scene, {
      options: [
        {
          navOption: 'Order',
          iconTexture: 'burger-solid',
          route: DE_ScreenTypes.MENU,
        },
        {
          navOption: 'Deliver',
          iconTexture: 'car-solid',
          route: DE_ScreenTypes.SELECT_DELIVERY_JOB,
        },
      ],
      onRoute: (route: DE_ScreenTypes) => {
        this.renderSubscreen(route)
      },
    })
    this.setVisible(false)
  }

  public setVisible(isVisible: boolean): void {
    this.bgRect.setVisible(isVisible)
    this.bottomNav.setVisible(isVisible)
  }

  renderSubscreen(newSubscreen: DE_ScreenTypes, data?: any) {
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
      subscreen.onHide()
      subscreen.setVisible(false)
    }
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
      const orderProgress = this.screenMappings[DE_ScreenTypes.ORDER_PROGRESS] as OrderProgress
      const completedOrderPendingClaim = Save.getData(SaveKeys.PENDING_DASHEATS_ORDER)
      if (orderProgress.cachedMenuItem || completedOrderPendingClaim) {
        this.renderSubscreen(DE_ScreenTypes.ORDER_PROGRESS)
      } else {
        this.renderSubscreen(DE_ScreenTypes.MENU)
      }
      if (onComplete) {
        onComplete()
      }
    })
  }
}
