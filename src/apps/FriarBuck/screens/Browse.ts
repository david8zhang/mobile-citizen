import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FriarBuck } from '../FriarBuck'

export class Browse extends SubScreen {
  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
  }

  public renderStockList() {}
  public onRender(data?: any): void {}
  public setVisible(isVisible: boolean): void {}
}
