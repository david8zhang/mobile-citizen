import { Home } from '~/scenes/Home'
import { App } from '../App'
import { Constants } from '~/utils/Constants'
import { NileScreenTypes } from './NileScreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { Browse } from './screens/Browse'
import { Cart } from './screens/Cart'
import { OrderStatus } from './screens/OrderStatus'
import { ItemDrilldown } from './screens/ItemDrilldown'
import { Save, SaveKeys } from '~/utils/Save'
import { PendingOrder, StoreItem } from '~/content/NileStoreItems'
import { Notification } from '~/core/NotificationListScreen'
import { AppRoute } from '~/utils/AppConfigs'
import { Utils } from '~/utils/Utils'
import { BottomNav } from '~/core/BottomNav'

export class Nile extends App {
  private headerText!: Phaser.GameObjects.Text
  private screenMappings: {
    [key in NileScreenTypes]?: SubScreen
  }
  private currSubscreen: NileScreenTypes = NileScreenTypes.BROWSE
  public bottomNav: BottomNav

  constructor(scene: Home) {
    super(scene)
    this.screenMappings = {
      [NileScreenTypes.BROWSE]: new Browse(this.scene, this),
      [NileScreenTypes.CART]: new Cart(this.scene, this),
      [NileScreenTypes.ORDER_STATUS]: new OrderStatus(this.scene, this),
      [NileScreenTypes.ITEM_DRILLDOWN]: new ItemDrilldown(this.scene, this),
    }
    this.bottomNav = new BottomNav(this.scene, {
      options: [
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
      ],
      onRoute: (route) => {
        this.renderSubscreen(route)
      },
    })
    this.setVisible(false)
    this.scene.onProgressDayCallbacks.push(() => {
      this.processDeliveries()
    })
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

  public addToCart(item: StoreItem) {
    const currBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
    const cart = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
    const cartTotal = cart.reduce((acc, curr) => {
      return acc + curr.price
    }, 0)
    if (cartTotal + item.price <= currBalance) {
      const cart = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
      cart.push(item)
      Save.setData(SaveKeys.NILE_CART, cart)
    }
  }

  removeFromCart(itemId: string) {
    const cart = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
    const newCart = cart.filter((item) => item.id !== itemId)
    Save.setData(SaveKeys.NILE_CART, newCart)
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

  processDeliveries() {
    const pendingOrders = Save.getData(SaveKeys.PENDING_NILE_ORDERS) as PendingOrder[]
    let hasOrderBeenDelivered = false
    pendingOrders.forEach((order) => {
      order.daysUntilDelivery = Math.max(0, order.daysUntilDelivery - 1)
      if (order.daysUntilDelivery == 0) {
        hasOrderBeenDelivered = true
      }
    })
    Save.setData(SaveKeys.PENDING_NILE_ORDERS, pendingOrders)
    if (hasOrderBeenDelivered) {
      const orderDeliveredNotif: Notification = {
        message: 'Your order has been delivered',
        appName: 'Nile',
        id: `${Date.now()}-nile-order-delivered`,
        route: AppRoute.NILE,
      }
      Utils.addNotification(orderDeliveredNotif)
    }
  }
}
