import { SubScreen } from '~/core/SubScreen'
import { FitNessMonster } from '../FitNessMonster'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { FitNessMonsterConstants } from '../FitNessMonsterConstants'
import { FitnessGradeCircle } from '../FitnessGradeCircle'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'

export interface WorkoutCompletedData {
  fitnessGain: number
  energyCost: number
  averageScore: number
}

export class CompletedWorkout extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private workoutGradeText!: Phaser.GameObjects.Text
  private fitnessGradeCircle!: FitnessGradeCircle
  private fitnessPointIncreaseValue!: Phaser.GameObjects.Text
  private fitnessPointBonusValue!: Phaser.GameObjects.Text
  private fitnessPointIncreaseLabel!: Phaser.GameObjects.Text
  private fitnessPointBonusLabel!: Phaser.GameObjects.Text
  private totalFitnessPointIncreaseText!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(0, 0, 'Completed Workout!', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 20
    )
    this.setVisible(false)
  }

  cleanupPreviousPostWorkoutData() {
    if (this.workoutGradeText) {
      this.workoutGradeText.destroy()
    }
    if (this.fitnessGradeCircle) {
      this.fitnessGradeCircle.destroy()
    }
    if (this.fitnessPointBonusLabel) {
      this.fitnessPointBonusLabel.destroy()
    }
    if (this.fitnessPointIncreaseLabel) {
      this.fitnessPointIncreaseLabel.destroy()
    }
    if (this.fitnessPointBonusValue) {
      this.fitnessPointBonusValue.destroy()
    }
    if (this.fitnessPointIncreaseValue) {
      this.fitnessPointIncreaseValue.destroy()
    }
  }

  renderPostWorkoutData(data: WorkoutCompletedData) {
    this.cleanupPreviousPostWorkoutData()
    const workoutGradeForScore = FitNessMonsterConstants.getWorkoutGradeForScore(data.averageScore)
    this.workoutGradeText = this.scene.add
      .text(0, 0, `Workout Grade: ${workoutGradeForScore}`, {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.workoutGradeText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.workoutGradeText.displayWidth / 2,
      this.headerText.y + this.headerText.displayHeight + 20
    )
    const prevFitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const bonusFitnessGain = Math.round(
      data.fitnessGain * FitNessMonsterConstants.WORKOUT_GRADE_BONUS_PCT[workoutGradeForScore]
    )
    const newFitnessLevel = prevFitnessLevel + data.fitnessGain + bonusFitnessGain
    const fitnessGrade = Utils.convertFitnessLevelToGrade(newFitnessLevel)
    this.fitnessGradeCircle = new FitnessGradeCircle(this.scene, {
      fitnessPoints: newFitnessLevel,
      fitnessGrade: fitnessGrade,
      yPos: this.workoutGradeText.y + this.workoutGradeText.displayHeight + 150,
    })

    // Setup fitness point increase amount text and label
    this.fitnessPointIncreaseValue = this.scene.add.text(0, 0, `+${data.fitnessGain}`, {
      fontSize: '25px',
      color: 'black',
      fontFamily: 'Arial',
    })
    this.fitnessPointIncreaseValue
      .setPosition(Constants.WINDOW_WIDTH - 30, this.fitnessGradeCircle.y + 140)
      .setOrigin(1, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessPointBonusValue = this.scene.add.text(0, 0, `+${bonusFitnessGain}`, {
      fontSize: '25px',
      color: 'black',
      fontFamily: 'Arial',
    })
    this.fitnessPointBonusValue
      .setPosition(
        Constants.WINDOW_WIDTH - 30,
        this.fitnessPointIncreaseValue.y + this.fitnessPointIncreaseValue.displayHeight + 15
      )
      .setOrigin(1, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    // Fitness point increase label
    this.fitnessPointIncreaseLabel = this.scene.add
      .text(30, this.fitnessPointIncreaseValue.y, 'Fitness gain', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessPointBonusLabel = this.scene.add
      .text(30, this.fitnessPointBonusValue.y, 'Workout grade bonus', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  public onRender(data: WorkoutCompletedData): void {
    this.renderPostWorkoutData(data)
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    if (this.workoutGradeText) {
      this.workoutGradeText.setVisible(isVisible)
    }
    if (this.fitnessGradeCircle) {
      this.fitnessGradeCircle.setVisible(isVisible)
    }
    if (this.fitnessPointIncreaseValue) {
      this.fitnessPointIncreaseValue.setVisible(isVisible)
    }
    if (this.fitnessPointBonusValue) {
      this.fitnessPointBonusValue.setVisible(isVisible)
    }
    if (this.totalFitnessPointIncreaseText) {
      this.totalFitnessPointIncreaseText.setVisible(isVisible)
    }
  }
}
