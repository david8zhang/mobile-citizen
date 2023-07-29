import { Home } from '~/scenes/Home'
import { App } from './App'

export class ClikClok extends App {
  constructor(scene: Home) {
    super(scene)
  }

  public onHide(onComplete?: Function | undefined): void {
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public render(onComplete?: Function | undefined): void {
    super.render(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public setVisible(isVisible: boolean): void {
    this.bgRect.setVisible(isVisible)
  }
}
