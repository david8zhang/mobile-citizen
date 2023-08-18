import { Home } from '~/scenes/Home'
import { App } from '../App'
import { DE_ScreenTypes } from './DEScreenTypes'
import { SubScreen } from '~/core/SubScreen'

export class DashEats extends App {
  private screenMappings: {
    [key in DE_ScreenTypes]?: SubScreen
  }
  private currSubscreen: DE_ScreenTypes = DE_ScreenTypes.MENU

  constructor(scene: Home) {
    super(scene)
    this.screenMappings = {}
  }

  public setVisible(isVisible: boolean): void {
    this.bgRect.setVisible(isVisible)
  }

  renderSubscreen(newSubscreen: DE_ScreenTypes, data?: any) {
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
}
