import { SubScreen } from '~/core/SubScreen'
import { FitNessMonster } from '../FitNessMonster'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { WorkoutList } from '~/apps/FitNessMonster/web-ui/WorkoutList'
import { FitNessMonsterConstants, Workout } from '../FitNessMonsterConstants'
import { Utils } from '~/utils/Utils'
import { FNM_ScreenTypes } from '../FNMScreenTypes'
import { Save, SaveKeys } from '~/utils/Save'

export class WorkoutSelect extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private workoutListDomElement!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'Choose Workout', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 30
    )
    this.setupWorkoutList()
    this.setVisible(false)
  }

  public setupWorkoutList() {
    if (this.workoutListDomElement) {
      this.workoutListDomElement.destroy()
    }
    const fitnessGrade = Utils.getFitnessGrade()
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const props = {
      workouts: FitNessMonsterConstants.WORKOUT_LIST,
      fitnessGrade: fitnessGrade,
      fullnessLevel: Utils.getFullnessLevel(),
      energyLevel,
      width: Constants.WINDOW_WIDTH,
      height: 520,
      onClick: (workout: Workout) => {
        const parent = this.parent as FitNessMonster
        parent.renderSubscreen(FNM_ScreenTypes.WORKOUT_GAME, workout)
      },
    }
    const workoutList = WorkoutList(props)
    const yPos = this.headerText.y + this.headerText.displayHeight + 30
    this.workoutListDomElement = this.scene.add
      .dom(0, yPos, workoutList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('workout-list')
  }

  public onRender(data?: any): void {
    this.setupWorkoutList()
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.workoutListDomElement.setVisible(isVisible)
  }
}
