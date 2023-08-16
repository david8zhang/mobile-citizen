import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Notification } from './NotificationListScreen'
import { Save, SaveKeys } from '~/utils/Save'

export class OnScreenNotification {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle
  private appNameText: Phaser.GameObjects.Text
  private notifMsgText: Phaser.GameObjects.Text
  private notification: Notification | null = null

  private dismissBtnDivider!: Phaser.GameObjects.Line
  private dismissBtnText!: Phaser.GameObjects.Text
  private dismissBtnRect!: Phaser.GameObjects.Rectangle

  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.TOP_BAR_HEIGHT + 60,
        Constants.WINDOW_WIDTH - 30,
        95,
        0xffffff
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStrokeStyle(1, 0xaaaaaa)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_UP, () => {
        if (this.notification) {
          this.scene.goBackHome()
          this.scene.renderApp(this.notification.route)
          this.setVisible(false)
          this.removeOnScreenNotification()
        }
      })
    this.appNameText = this.scene.add
      .text(
        this.bgRect.x - this.bgRect.displayWidth / 2 + 15,
        this.bgRect.y - this.bgRect.displayHeight / 2 + 15,
        '',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStroke('#000000', 1)

    this.notifMsgText = this.scene.add
      .text(
        this.bgRect.x - this.bgRect.displayWidth / 2 + 15,
        this.appNameText.y + this.appNameText.displayHeight + 10,
        '',
        {
          fontSize: '15px',
          color: '#777777',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setWordWrapWidth(this.bgRect.displayWidth - 100)
    this.setVisible(false)
  }

  setupDismissButton() {
    if (this.dismissBtnDivider) {
      this.dismissBtnDivider.destroy()
    }
    if (this.dismissBtnRect) {
      this.dismissBtnRect.destroy()
    }
    if (this.dismissBtnText) {
      this.dismissBtnText.destroy()
    }
    const xPos = this.notifMsgText.x + this.notifMsgText.displayWidth + 15
    this.dismissBtnDivider = this.scene.add
      .line(
        0,
        0,
        xPos,
        this.bgRect.y - this.bgRect.displayHeight / 2,
        xPos,
        this.bgRect.y + this.bgRect.displayHeight / 2,
        0xcccccc
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.dismissBtnRect = this.scene.add
      .rectangle(
        xPos,
        this.bgRect.y - this.bgRect.displayHeight / 2,
        this.bgRect.displayWidth - this.notifMsgText.displayWidth - 30,
        this.bgRect.displayHeight
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.setVisible(false)
        this.removeOnScreenNotification()
      })

    this.dismissBtnText = this.scene.add
      .text(
        this.dismissBtnRect.x + this.dismissBtnRect.displayWidth / 2,
        this.dismissBtnRect.y + this.dismissBtnRect.displayHeight / 2,
        'Dismiss',
        {
          fontSize: '15px',
          color: '#777777',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.dismissBtnText.setPosition(
      this.dismissBtnText.x - this.dismissBtnText.displayWidth / 2,
      this.dismissBtnText.y - this.dismissBtnText.displayHeight / 2
    )
  }

  removeOnScreenNotification() {
    if (this.notification) {
      const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
      const newNotifications = notifications.filter((notif) => notif.id !== this.notification!.id)
      Save.setData(SaveKeys.NOTIFICATIONS, newNotifications)
      this.scene.updateTopBarStats()
    }
  }

  showNotification(notification: Notification) {
    this.notification = notification
    this.appNameText.setText(notification.appName)
    this.notifMsgText.setText(notification.message)
    this.setupDismissButton()
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.appNameText.setVisible(isVisible)
    this.notifMsgText.setVisible(isVisible)
    if (this.dismissBtnDivider) {
      this.dismissBtnDivider.setVisible(isVisible)
    }
    if (this.dismissBtnRect) {
      this.dismissBtnRect.setVisible(isVisible)
    }
    if (this.dismissBtnText) {
      this.dismissBtnText.setVisible(isVisible)
    }
  }
}