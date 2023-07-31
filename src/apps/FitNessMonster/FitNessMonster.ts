import { Home } from '~/scenes/Home'
import { App } from '../App'
import { FNM_BottomNav } from './FNMBottomNav'

export class FitNessMonster extends App {
  private bottomNav: FNM_BottomNav

  constructor(scene: Home) {
    super(scene)
    this.bottomNav = new FNM_BottomNav(this.scene, {
      onRoute: () => {},
    })
    this.bgRect.setFillStyle(0xeeeeee)
    this.setVisible(false)
  }

  public setVisible(isVisible: boolean): void {
    this.bgRect.setVisible(isVisible)
    this.bottomNav.setVisible(isVisible)
  }

  public render(onComplete?: Function | undefined): void {
    super.render(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }
}
