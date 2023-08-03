import { SubScreen } from '~/core/SubScreen'
import { FitNessMonster } from '../FitNessMonster'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export class WorkoutSelect extends SubScreen {
  private headerText: Phaser.GameObjects.Text

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'Choose Workout', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 30
    )
    this.setVisible(false)
  }

  public onRender(data?: any): void {}
  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
  }
}
