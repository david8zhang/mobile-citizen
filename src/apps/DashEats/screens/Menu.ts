import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export class Menu extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.headerText = this.scene.add.text(
      Constants.WINDOW_WIDTH / 2,
      Constants.TOP_BAR_HEIGHT + 25,
      'DashEats',
      {
        fontSize: '35px',
        color: 'black',
        fontFamily: 'Arial',
      }
    )
  }
  public onRender(data?: any): void {}
  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
  }
}
