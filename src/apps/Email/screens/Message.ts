import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { EmailApp } from '../EmailApp'
import { Email } from '../EmailConstants'
import { Constants } from '~/utils/Constants'
import { EmailScreenTypes } from '../EmailScreenTypes'

export class Message extends SubScreen {
  private email!: Email

  private backButton!: Phaser.GameObjects.Sprite
  private subjectText!: Phaser.GameObjects.Text
  private emailText!: Phaser.GameObjects.Text
  private senderText!: Phaser.GameObjects.Text
  private profileIcon!: Phaser.GameObjects.Sprite
  private receiverText!: Phaser.GameObjects.Text
  private dateText!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: EmailApp) {
    super(scene, parent)
    this.setupBackButton()
    this.setupSubject()
    this.setupSenderAndProfileIcon()
    this.setupReceiverText()
    this.setupDateText()
    this.setupEmailText()
    this.setVisible(false)
  }

  setupBackButton() {
    this.backButton = this.scene.add
      .sprite(15, Constants.TOP_BAR_HEIGHT + 15, 'arrow-left-solid')
      .setOrigin(0)
      .setDisplaySize(20, 20)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.backButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.backButton.setAlpha(1)
        const parent = this.parent as EmailApp
        parent.renderSubscreen(EmailScreenTypes.INBOX)
      })
  }

  setupSubject() {
    this.subjectText = this.scene.add
      .text(15, this.backButton.y + this.backButton.displayHeight + 20, '', {
        fontSize: '40px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'black',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStroke('#000000', 1)
  }

  setupSenderAndProfileIcon() {
    this.profileIcon = this.scene.add
      .sprite(15, this.subjectText.y + this.subjectText.displayHeight + 25, 'circle-info-solid')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setDisplaySize(30, 30)
    this.senderText = this.scene.add
      .text(
        this.profileIcon.x + this.profileIcon.displayWidth + 20,
        this.subjectText.y + this.subjectText.displayHeight + 15,
        '',
        {
          fontSize: '28px',
          fontFamily: Constants.FONT_REGULAR,
          color: 'black',
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupReceiverText() {
    this.receiverText = this.scene.add
      .text(this.senderText.x, this.senderText.y + this.senderText.displayHeight, 'To me', {
        fontSize: '25px',
        fontFamily: Constants.FONT_REGULAR,
        color: '#555555',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupDateText() {
    this.dateText = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.profileIcon.y, '', {
        fontSize: '25px',
        fontFamily: Constants.FONT_REGULAR,
        color: '#333333',
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  public setupEmailText() {
    this.emailText = this.scene.add
      .text(20, this.receiverText.y + this.receiverText.displayHeight + 30, '', {
        fontSize: '25px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'black',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setWordWrapWidth(Constants.WINDOW_WIDTH - 20, true)
  }

  public setVisible(isVisible: boolean): void {
    this.backButton.setVisible(isVisible)
    this.senderText.setVisible(isVisible)
    this.subjectText.setVisible(isVisible)
    this.profileIcon.setVisible(isVisible)
    this.receiverText.setVisible(isVisible)
    this.dateText.setVisible(isVisible)
    this.emailText.setVisible(isVisible)
  }

  public onRender(data?: any): void {
    this.email = data
    this.senderText.setText(this.email.sender)
    this.subjectText.setText(this.email.subject)
    this.dateText.setText(this.email.date)
    this.emailText.setText(this.email.text)
  }
}
