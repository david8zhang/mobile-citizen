import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { MenuItemType } from '../DashEatsConstants'
import { DeliveryOptionType } from '../DeliveryOption'
import { Button } from '~/core/Button'
import { Save, SaveKeys } from '~/utils/Save'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { Notification } from '~/core/NotificationListScreen'
import { AppRoute } from '~/utils/AppConfigs'
import { Utils } from '~/utils/Utils'

export class OrderProgress extends SubScreen {
  private timer!: Phaser.Time.TimerEvent
  private headerText!: Phaser.GameObjects.Text
  private countdownTimerText!: Phaser.GameObjects.Text
  private timeRemaining: number = 0
  private button!: Button
  private menuItem!: MenuItemType

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
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      this.headerText.x - this.headerText.displayWidth / 2,
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
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.countdownTimerText.setPosition(
      this.countdownTimerText.x - this.countdownTimerText.displayWidth / 2,
      this.countdownTimerText.y
    )
  }

  processMenuItem() {
    const fullness = Save.getData(SaveKeys.FULLNESS_LEVEL) as number
    const fitness = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    Save.setData(
      SaveKeys.FULLNESS_LEVEL,
      Math.min(Constants.MAX_FULLNESS_LEVEL, fullness + this.menuItem.fullnessBonus)
    )
    Save.setData(SaveKeys.FITNESS_LEVEL, Math.max(0, fitness + this.menuItem.fitnessBonus))
    this.scene.updateTopBarStats()
    const parent = this.parent as DashEats
    parent.renderSubscreen(DE_ScreenTypes.MENU)
  }

  setupOrderButton() {
    this.button = new Button({
      scene: this.scene,
      onClick: () => {
        this.processMenuItem()
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 50,
      x: Constants.WINDOW_WIDTH / 2,
      y: Constants.WINDOW_HEIGHT / 2 + 30,
      strokeWidth: 1,
      text: 'Collect',
      fontSize: '18px',
      fontFamily: 'Arial',
      textColor: 'black',
      backgroundColor: 0xffffff,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  public onRender(data: { menuItem: MenuItemType; deliveryOptionType: DeliveryOptionType }): void {
    if (this.timer) {
      this.timer.destroy()
    }
    this.menuItem = data.menuItem
    this.button.setVisible(false)
    this.timeRemaining = data.deliveryOptionType === DeliveryOptionType.SPEEDY ? 15000 : 30000
    this.countdownTimerText.setText(`${this.timeRemaining / 1000}`)
    this.countdownTimerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.countdownTimerText.displayWidth / 2,
      this.countdownTimerText.y
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
        const orderReadyNotification: Notification = {
          appName: 'DashEats',
          route: AppRoute.DASH_EATS,
          subRoute: DE_ScreenTypes.ORDER_PROGRESS,
          message: 'Your order is ready!',
          id: `dash-eats-order-${Date.now()}`,
        }
        Utils.addNotification(orderReadyNotification)
        this.scene.showOnScreenNotification(orderReadyNotification)
        this.scene.topBar.updateStats()
        this.button.setVisible(true)
      },
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
