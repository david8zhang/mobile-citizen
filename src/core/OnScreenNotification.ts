import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Notification } from './NotificationListScreen'
import { Save, SaveKeys } from '~/utils/Save'
import { OnScreenNotif } from './web-ui/OnScreenNotif'

export class OnScreenNotification {
  private scene: Home
  private dismissBtnDivider!: Phaser.GameObjects.Line
  private dismissBtnText!: Phaser.GameObjects.Text
  private dismissBtnRect!: Phaser.GameObjects.Rectangle

  private notification: Notification | null = null
  private notificationElem!: Phaser.GameObjects.DOMElement
  private notificationBgRect!: Phaser.GameObjects.Rectangle

  constructor(scene: Home) {
    this.scene = scene
    this.setVisible(false)
  }

  setupNotificationElem(notification: Notification) {
    if (this.notificationElem) {
      this.notificationElem.destroy()
      this.notificationBgRect.destroy()
    }

    const onScreenNotif = OnScreenNotif(
      notification,
      () => {
        this.scene.goBackHome()
        this.scene.renderApp(notification.route, notification.data)
        this.setVisible(false)
        this.removeOnScreenNotification()
      },
      () => {
        this.setVisible(false)
      }
    )
    this.notificationElem = this.scene.add
      .dom(10, Constants.TOP_BAR_HEIGHT + 10, onScreenNotif)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setInteractive()
      .setOrigin(0)
    this.notificationBgRect = this.scene.add
      .rectangle(13, Constants.TOP_BAR_HEIGHT + 13, Constants.WINDOW_WIDTH - 20, 100, 0xffffff)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setInteractive()
      .setScale(0.95)
  }

  removeOnScreenNotification() {
    if (this.notification) {
      const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
      const newNotifications = notifications.filter((notif) => notif.id !== this.notification!.id)
      Save.setData(SaveKeys.NOTIFICATIONS, newNotifications)
      this.scene.updateTopBarStats()
      this.setVisible(false)
    }
  }

  showNotification(notification: Notification) {
    this.notification = notification
    this.setupNotificationElem(notification)
    this.setVisible(true)
  }

  setVisible(isVisible: boolean) {
    if (this.notificationElem) {
      this.notificationElem.setVisible(isVisible)
    }
    if (this.notificationBgRect) {
      this.notificationBgRect.setVisible(isVisible)
    }
  }
}
