import { Home } from '~/scenes/Home'
import { App } from '../App'
import { EmailScreenTypes } from './EmailScreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { Inbox } from './screens/Inbox'
import { Message } from './screens/Message'

export class EmailApp extends App {
  private screenMappings: {
    [key in EmailScreenTypes]?: SubScreen
  }
  private currSubscreen: EmailScreenTypes = EmailScreenTypes.INBOX

  constructor(scene: Home) {
    super(scene)
    this.screenMappings = {
      [EmailScreenTypes.INBOX]: new Inbox(this.scene, this),
      [EmailScreenTypes.MESSAGE]: new Message(this.scene, this),
    }
    this.setVisible(false)
  }

  renderSubscreen(newSubscreen: EmailScreenTypes, data?: any) {
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
      subscreen.onRender(data)
      subscreen.setVisible(true)
    }
  }

  hideSubscreen() {
    const subscreen = this.screenMappings[this.currSubscreen]
    if (subscreen) {
      subscreen.setVisible(false)
    }
  }

  public setVisible(isVisible: boolean): void {
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
      this.renderSubscreen(EmailScreenTypes.INBOX)
      if (onComplete) {
        onComplete()
      }
    })
  }
}
