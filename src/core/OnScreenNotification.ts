import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Notification } from './NotificationListScreen'

export class OnScreenNotification {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle
  private appNameText: Phaser.GameObjects.Text
  private notifMsgText: Phaser.GameObjects.Text
  private notification: Notification | null = null

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
      .setWordWrapWidth(this.bgRect.displayWidth - 30)
    this.setVisible(false)
  }

  showNotification(notification: Notification) {
    this.notification = notification
    this.appNameText.setText(notification.appName)
    this.notifMsgText.setText(notification.message)
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.appNameText.setVisible(isVisible)
    this.notifMsgText.setVisible(isVisible)
  }
}
