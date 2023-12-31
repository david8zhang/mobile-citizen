import { CC_ScreenTypes } from '~/apps/ClikClok/CCScreenTypes'
import { DE_ScreenTypes } from '~/apps/DashEats/DEScreenTypes'
import { FNM_ScreenTypes } from '~/apps/FitNessMonster/FNMScreenTypes'
import { Home } from '~/scenes/Home'
import { AppRoute } from '~/utils/AppConfigs'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'
import { NotificationList } from '~/core/web-ui/NotificationList'

export interface Notification {
  id: string
  appName: string
  message: string
  route: AppRoute
  day: number
  data?: any
}

export class NotificationListScreen {
  private scene: Home
  private headerText: Phaser.GameObjects.Text
  private bgRect: Phaser.GameObjects.Rectangle
  private notifications!: Notification[]
  private notificationDomElement!: Phaser.GameObjects.DOMElement

  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2 + Constants.TOP_BAR_HEIGHT,
        Constants.WINDOW_WIDTH,
        Constants.WINDOW_HEIGHT,
        0xeeeeee
      )
      .setInteractive()
      .setDepth(Constants.SORT_LAYERS.APP_BG)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 20, 'Notifications', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      this.headerText.y
    )
    this.setVisible(false)
  }

  public onRender() {
    this.updateNotificationList()
    this.scene.homeButton.setStyle({ color: 'black' })
  }

  updateNotificationList() {
    const sortedByDateDescNotifs = (Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]).sort(
      (a, b) => {
        return b.day - a.day
      }
    )
    if (this.notificationDomElement) {
      this.notificationDomElement.destroy()
    }
    const yPos = this.headerText.y + this.headerText.displayHeight + 30
    const notificationList = NotificationList(
      sortedByDateDescNotifs,
      Constants.WINDOW_WIDTH,
      640,
      (notification: Notification, index: number) => {
        this.scene.renderApp(notification.route, notification.data)
        this.removeNotification(index)
        this.setVisible(false)
      },
      (index: number) => {
        this.removeNotification(index)
      }
    )
    this.notificationDomElement = this.scene.add
      .dom(0, yPos, notificationList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('notification-list')
  }

  removeNotification(index: number) {
    const notifications = [...(Save.getData(SaveKeys.NOTIFICATIONS) as Notification[])].sort(
      (a, b) => {
        return b.day - a.day
      }
    )
    notifications.splice(index, 1)
    Save.setData(SaveKeys.NOTIFICATIONS, notifications)
    this.updateNotificationList()
    this.scene.updateTopBarStats()
  }

  public onHide() {
    this.scene.homeButton.setStyle({ color: 'white' })
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
    if (this.notificationDomElement) {
      this.notificationDomElement.setVisible(isVisible)
    }
  }
}
