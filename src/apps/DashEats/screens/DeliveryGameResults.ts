import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'

export class DeliveryGameResults extends SubScreen {
  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.setVisible(false)
  }

  public onRender(data?: any): void {}
  public setVisible(isVisible: boolean): void {}
}
