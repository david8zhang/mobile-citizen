import { Home } from '~/scenes/Home'
import { App } from './App'
import { Constants } from '~/utils/Constants'

export class Bank extends App {
  constructor(scene: Home) {
    super(scene)
    this.setVisible(false)
  }

  public render(onComplete: Function): void {
    super.render(() => {
      onComplete()
    })
  }

  public onHide(onComplete: Function): void {}

  public setVisible(isVisible: boolean): void {
    this.bgRect.setVisible(isVisible)
  }
}
