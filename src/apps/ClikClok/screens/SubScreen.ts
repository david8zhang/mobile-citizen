import { Home } from '~/scenes/Home'
import { ClikClok } from '../ClikClok'
import { App } from '~/apps/App'

export abstract class SubScreen {
  protected scene: Home
  protected parent: App
  constructor(scene: Home, parent: ClikClok) {
    this.scene = scene
    this.parent = parent
  }

  public abstract onRender(data?: any): void
  public abstract setVisible(isVisible: boolean): void
}
