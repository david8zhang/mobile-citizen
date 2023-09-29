import { SubScreen } from '~/core/SubScreen'
import { FitNessMonster } from '../FitNessMonster'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { FitNessMonsterConstants } from '../FitNessMonsterConstants'
import { FitnessGradeCircle } from '../FitnessGradeCircle'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'
import { Button } from '~/core/Button'
import { FNM_ScreenTypes } from '../FNMScreenTypes'

export interface WorkoutCompletedData {
  fullnessCost: number
  fitnessGain: number
  energyCost: number
  averageScore: number
}

export class CompletedWorkout extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private workoutGradeText!: Phaser.GameObjects.Text
  private fitnessGradeCircle!: FitnessGradeCircle
  private fitnessPointIncreaseValue!: Phaser.GameObjects.Text
  private fitnessPointIncreaseLabel!: Phaser.GameObjects.Text
  private fitnessPointBonusValue!: Phaser.GameObjects.Text
  private fitnessPointBonusLabel!: Phaser.GameObjects.Text
  private dividerLine!: Phaser.GameObjects.Line
  private totalFitnessPointIncreaseValue!: Phaser.GameObjects.Text
  private totalFitnessPointIncreaseLabel!: Phaser.GameObjects.Text
  private continueButton!: Button

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(0, 0, 'Completed Workout!', {
        fontSize: '30px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 20
    )
    this.setupStaticUIElements()
    this.setVisible(false)
  }

  cleanupPreviousPostWorkoutData() {
    if (this.workoutGradeText) {
      this.workoutGradeText.destroy()
    }
    if (this.fitnessGradeCircle) {
      this.fitnessGradeCircle.destroy()
    }
    if (this.fitnessPointIncreaseValue) {
      this.fitnessPointIncreaseValue.destroy()
    }
    if (this.fitnessPointBonusValue) {
      this.fitnessPointBonusValue.destroy()
    }
    if (this.totalFitnessPointIncreaseValue) {
      this.totalFitnessPointIncreaseValue.destroy()
    }
  }

  setupStaticUIElements() {
    this.fitnessPointIncreaseLabel = this.scene.add
      .text(30, 414, 'Fitness gain', {
        fontSize: '20px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessPointBonusLabel = this.scene.add
      .text(
        30,
        this.fitnessPointIncreaseLabel.y + this.fitnessPointIncreaseLabel.displayHeight + 15,
        'Workout grade bonus',
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.dividerLine = this.scene.add
      .line(
        0,
        0,
        30,
        this.fitnessPointBonusLabel.y + 30,
        Constants.WINDOW_WIDTH - 30,
        this.fitnessPointBonusLabel.y + 30,
        0xcccccc
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.totalFitnessPointIncreaseLabel = this.scene.add
      .text(
        30,
        this.fitnessPointBonusLabel.y + this.fitnessPointBonusLabel.displayHeight + 40,
        'Total Gains: ',
        {
          fontSize: '30px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.continueButton = new Button({
      scene: this.scene,
      x: Constants.WINDOW_WIDTH / 2,
      y:
        this.totalFitnessPointIncreaseLabel.y +
        this.totalFitnessPointIncreaseLabel.displayHeight +
        100,
      width: 300,
      height: 55,
      text: 'Continue',
      onClick: () => {
        const parent = this.parent as FitNessMonster
        parent.renderSubscreen(FNM_ScreenTypes.FITNESS_STATS)
        this.scene.setPreventAction(false)
      },
      backgroundColor: 0xffffff,
      strokeColor: 0x000000,
      strokeWidth: 1,
      depth: Constants.SORT_LAYERS.APP_UI,
      fontSize: '20px',
      fontFamily: Constants.FONT_REGULAR,
    })
  }

  renderPostWorkoutData(data: WorkoutCompletedData) {
    this.cleanupPreviousPostWorkoutData()
    const workoutGradeForScore = FitNessMonsterConstants.getWorkoutGradeForScore(data.averageScore)
    this.workoutGradeText = this.scene.add
      .text(0, 0, `Workout Grade: ${workoutGradeForScore}`, {
        fontSize: '20px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
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

    const pointsEarnedTowardNextGrade =
      newFitnessLevel - Utils.getMinFitnessPointsForGrade(fitnessGrade)
    const totalPointsRequiredForNextFitnessGrade =
      Utils.getMinFitnessPointsForGrade(Utils.getNextGrade(fitnessGrade)) -
      Utils.getMinFitnessPointsForGrade(fitnessGrade)
    this.fitnessGradeCircle = new FitnessGradeCircle(this.scene, {
      fitnessPoints: newFitnessLevel,
      fitnessGrade: fitnessGrade,
      yPos: this.workoutGradeText.y + this.workoutGradeText.displayHeight + 150,
      progressPct: pointsEarnedTowardNextGrade / totalPointsRequiredForNextFitnessGrade,
    })

    // Setup fitness point increase amount text and label
    this.fitnessPointIncreaseValue = this.scene.add.text(0, 0, `+${data.fitnessGain}`, {
      fontSize: '25px',
      color: 'black',
      fontFamily: Constants.FONT_REGULAR,
    })
    this.fitnessPointIncreaseValue
      .setPosition(Constants.WINDOW_WIDTH - 30, Math.round(this.fitnessGradeCircle.y + 140))
      .setOrigin(1, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessPointBonusValue = this.scene.add.text(0, 0, `+${bonusFitnessGain}`, {
      fontSize: '25px',
      color: 'black',
      fontFamily: Constants.FONT_REGULAR,
    })
    this.fitnessPointBonusValue
      .setPosition(
        Constants.WINDOW_WIDTH - 30,
        this.fitnessPointIncreaseValue.y + this.fitnessPointIncreaseValue.displayHeight + 15
      )
      .setOrigin(1, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalFitnessPointIncreaseValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 30,
        this.totalFitnessPointIncreaseLabel.y,
        `+${data.fitnessGain + bonusFitnessGain}`,
        {
          fontSize: '30px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(1, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  public onRender(data: WorkoutCompletedData): void {
    const parent = this.parent as FitNessMonster
    parent.bottomNav.setVisible(false)
    this.renderPostWorkoutData(data)
    this.applyFitnessGain(data)
  }

  applyFitnessGain(data: WorkoutCompletedData) {
    const fullnessLevel = Utils.getFullnessLevel()
    const workoutGradeForScore = FitNessMonsterConstants.getWorkoutGradeForScore(data.averageScore)
    const bonusFitnessGain = Math.round(
      data.fitnessGain * FitNessMonsterConstants.WORKOUT_GRADE_BONUS_PCT[workoutGradeForScore]
    )
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const newFitnessLevel = fitnessLevel + data.fitnessGain + bonusFitnessGain

    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const energyCostForFullness = Math.round(
      FitNessMonsterConstants.fullnessLevelToEnergyCostPct(fullnessLevel!) * data.energyCost
    )
    const fullness = Save.getData(SaveKeys.FULLNESS_LEVEL)
    const newEnergyLevel = energyLevel - energyCostForFullness
    Save.setData(SaveKeys.FITNESS_LEVEL, newFitnessLevel)
    Save.setData(SaveKeys.ENERGY_LEVEL, newEnergyLevel)
    Save.setData(SaveKeys.FULLNESS_LEVEL, Math.max(0, fullness - data.fullnessCost))
    this.scene.topBar.updateStats()
  }

  public onHide() {
    const parent = this.parent as FitNessMonster
    parent.bottomNav.setVisible(true)
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
    if (this.totalFitnessPointIncreaseValue) {
      this.totalFitnessPointIncreaseValue.setVisible(isVisible)
    }
    this.fitnessPointIncreaseLabel.setVisible(isVisible)
    this.fitnessPointBonusLabel.setVisible(isVisible)
    this.dividerLine.setVisible(isVisible)
    this.totalFitnessPointIncreaseLabel.setVisible(isVisible)
    this.continueButton.setVisible(isVisible)
  }
}
