import { SubScreen } from '~/core/SubScreen'
import { Nile } from '../Nile'
import { Home } from '~/scenes/Home'

export class Cart extends SubScreen {
  constructor(scene: Home, parent: Nile) {
    super(scene, parent)
  }

  public onRender(data?: any): void {
    throw new Error('Method not implemented.')
  }
  public setVisible(isVisible: boolean): void {
    throw new Error('Method not implemented.')
  }
}
