import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { DashEatsConstants, MenuItemType } from '../DashEatsConstants'
import { DeliveryOptionType } from '../DeliveryOption'
import { Button } from '~/core/Button'
import { Save, SaveKeys } from '~/utils/Save'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { Notification } from '~/core/NotificationListScreen'
import { AppRoute } from '~/utils/AppConfigs'
import { Utils } from '~/utils/Utils'

export enum OrderStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
}

export class OrderProgress extends SubScreen {
  private timer!: Phaser.Time.TimerEvent
  private headerText!: Phaser.GameObjects.Text
  private countdownTimerText!: Phaser.GameObjects.Text
  private timeRemaining: number = 0
  private button!: Button
  public cachedMenuItem: MenuItemType | null = null
  private orderStatus: OrderStatus = OrderStatus.NOT_STARTED
  private isShowing: boolean = false

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.setupHeaderText()
    this.setupProgress()
    this.setupOrderButton()
    this.setVisible(false)
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 20, 'Order in Progress', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 20
    )
  }

  setupProgress() {
    this.countdownTimerText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.headerText.y + this.headerText.displayHeight + 20,
        '',
        {
          fontSize: '50px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.countdownTimerText.setPosition(
      this.countdownTimerText.x - this.countdownTimerText.displayWidth / 2,
      this.countdownTimerText.y
    )
  }

  setupOrderButton() {
    this.button = new Button({
      scene: this.scene,
      onClick: () => {
        this.claimOrder()
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 50,
      x: Constants.WINDOW_WIDTH / 2,
      y: Constants.WINDOW_HEIGHT / 2 + 30,
      strokeWidth: 1,
      text: 'Collect',
      fontSize: '22px',
      fontFamily: Constants.FONT_REGULAR,
      textColor: 'black',
      backgroundColor: 0xffffff,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  public onHide() {
    this.isShowing = false
  }

  public onRender(data: any): void {
    this.isShowing = true
    const completedOrderPendingClaim = Save.getData(SaveKeys.PENDING_DASHEATS_ORDER)
    if (
      (this.cachedMenuItem && this.orderStatus === OrderStatus.READY) ||
      completedOrderPendingClaim
    ) {
      this.setupCompletedOrderPendingClaim()
    } else {
      if (!this.cachedMenuItem) {
        this.setupNewOrder(data)
      }
    }
  }

  setupCompletedOrderPendingClaim() {
    this.button.setVisible(true)
    this.headerText.setText('Order complete!')
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.WINDOW_HEIGHT / 2 - 50
    )
    this.countdownTimerText.setVisible(false)
  }

  setupNewOrder(data?: any) {
    if (this.timer) {
      this.timer.destroy()
    }
    this.cachedMenuItem = data.menuItem
    this.button.setVisible(false)
    this.timeRemaining =
      data.deliveryOptionType === DeliveryOptionType.SPEEDY
        ? DashEatsConstants.SPEEDY_DELIVERY_TIME
        : DashEatsConstants.STANDARD_DELIVERY_TIME
    this.countdownTimerText.setText(`${this.timeRemaining / 1000}`).setVisible(true)
    this.countdownTimerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.countdownTimerText.displayWidth / 2,
      this.countdownTimerText.y
    )

    this.headerText.setText('Order in Progress')
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 20
    )

    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining -= 1000
        this.countdownTimerText.setText(`${this.timeRemaining / 1000}`)
        this.countdownTimerText.setPosition(
          Constants.WINDOW_WIDTH / 2 - this.countdownTimerText.displayWidth / 2,
          this.countdownTimerText.y
        )
      },
      repeat: this.timeRemaining / 1000 - 1,
    })
    this.timer = this.scene.time.addEvent({
      delay: this.timeRemaining,
      callback: () => {
        this.onOrderCompleted()
      },
    })
  }

  claimOrder() {
    // Apply fitness/fullness effects from order
    const fullness = Save.getData(SaveKeys.FULLNESS_LEVEL) as number
    const fitness = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const pendingDashEatsOrder = Save.getData(SaveKeys.PENDING_DASHEATS_ORDER)
    Save.setData(
      SaveKeys.FULLNESS_LEVEL,
      Math.min(Constants.MAX_FULLNESS_LEVEL, fullness + pendingDashEatsOrder.menuItem.fullnessBonus)
    )
    Save.setData(
      SaveKeys.FITNESS_LEVEL,
      Math.max(0, fitness + pendingDashEatsOrder.menuItem.fitnessBonus)
    )

    // Navigate back to the menu screen
    const parent = this.parent as DashEats
    parent.renderSubscreen(DE_ScreenTypes.MENU)

    // Remove cached order and update current order status
    Save.setData(SaveKeys.PENDING_DASHEATS_ORDER, null)
    this.cachedMenuItem = null
    this.orderStatus = OrderStatus.NOT_STARTED

    // Clear out the notification related to claiming this order
    const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
    const newNotifications = notifications.filter((notif) => {
      return notif.id !== pendingDashEatsOrder.notifId
    })
    Save.setData(SaveKeys.NOTIFICATIONS, newNotifications)
    this.scene.updateTopBarStats()
  }

  onOrderCompleted() {
    const notifId = `dash-eats-order-${Date.now()}`
    const day = Save.getData(SaveKeys.CURR_DATE) as number
    if (!this.isShowing) {
      const orderReadyNotification: Notification = {
        day,
        appName: 'DashEats',
        route: AppRoute.DASH_EATS,
        message: 'Your order is ready!',
        id: notifId,
      }
      Utils.addNotification(orderReadyNotification)
      this.scene.showOnScreenNotification(orderReadyNotification)
      this.scene.topBar.updateStats()
    } else {
      this.setupCompletedOrderPendingClaim()
    }
    this.orderStatus === OrderStatus.READY
    Save.setData(SaveKeys.PENDING_DASHEATS_ORDER, {
      menuItem: this.cachedMenuItem,
      notifId,
    })
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.countdownTimerText.setVisible(isVisible)
    if (!isVisible) {
      this.button.setVisible(isVisible)
    }
  }
}
