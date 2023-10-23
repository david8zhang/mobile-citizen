import { SubScreen } from '~/core/SubScreen'
import { EmailApp } from '../EmailApp'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { EmailList } from '../web-ui/EmailList'
import { EmailScreenTypes } from '../EmailScreenTypes'
import { Email } from '../EmailConstants'

export class Inbox extends SubScreen {
  private emailListDom!: Phaser.GameObjects.DOMElement
  private titleText!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: EmailApp) {
    super(scene, parent)
    this.setupTitleText()
    this.setupEmailList()
    this.setVisible(false)
  }

  setupTitleText() {
    this.titleText = this.scene.add
      .text(15, Constants.TOP_BAR_HEIGHT + 15, 'Inbox', {
        fontSize: '40px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setupEmailList() {
    const emails: Email[] = [
      {
        sender: 'Mobile Citizen Mentor',
        subject: 'Welcome to Mobile Citizen!',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: 'Day 1',
      },
      {
        sender: 'Mobile Citizen Mentor',
        subject: 'Welcome to Mobile Citizen!',
        text: 'Placeholder text',
        date: 'Day 1',
      },
      {
        sender: 'Mobile Citizen Mentor',
        subject: 'Welcome to Mobile Citizen!',
        text: 'Placeholder text',
        date: 'Day 1',
      },
      {
        sender: 'Mobile Citizen Mentor',
        subject: 'Welcome to Mobile Citizen!',
        text: 'Placeholder text',
        date: 'Day 1',
      },
      {
        sender: 'Mobile Citizen Mentor',
        subject: 'Welcome to Mobile Citizen!',
        text: 'Placeholder text',
        date: 'Day 1',
      },
    ]
    const emailListComponent = EmailList(emails, Constants.WINDOW_WIDTH, 600, (email) => {
      const parent = this.parent as EmailApp
      parent.renderSubscreen(EmailScreenTypes.MESSAGE, email)
    })
    this.emailListDom = this.scene.add
      .dom(0, this.titleText.y + this.titleText.displayHeight + 15, emailListComponent)
      .setOrigin(0)
  }

  public onRender(data?: any): void {}
  public setVisible(isVisible: boolean): void {
    this.titleText.setVisible(isVisible)
    this.emailListDom.setVisible(isVisible)
  }
}
