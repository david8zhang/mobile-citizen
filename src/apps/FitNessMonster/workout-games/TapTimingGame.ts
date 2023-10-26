import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'
import { WorkoutMinigame } from './WorkoutMinigame'
import { HoldAndReleaseGameConfig } from './HoldAndReleaseGame'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'
import { FitNessMonsterConstants, RepQuality, Workout } from '../FitNessMonsterConstants'
import { UINumber } from '~/apps/ClikClok/UINumber'
import { WorkoutCompletedData } from '../screens/CompletedWorkout'
import { FNM_ScreenTypes } from '../FNMScreenTypes'

export interface TapTimingGameConfig {
  headerText: string
}

export class TapTimingGame extends WorkoutMinigame {
  private headerText: Phaser.GameObjects.Text
  private subtitleText: Phaser.GameObjects.Text
  private timerText: Phaser.GameObjects.Text

  // Timing Bar
  private timingBar!: Phaser.GameObjects.Rectangle
  private goodTimingZone!: Phaser.GameObjects.Rectangle
  private averageTimingZone!: Phaser.GameObjects.Rectangle
  private markerMovementTween: Phaser.Tweens.Tween | null = null
  private marker!: Phaser.GameObjects.Sprite
  private isHandlingRep: boolean = false
  private isShowing: boolean = false
  private timeRemainingSeconds: number = 20
  private maxPossibleScore: number = 0
  private totalScore: number = 0
  private workoutCompleted: boolean = false

  private scoreMapping = {
    [RepQuality.GOOD]: 100,
    [RepQuality.AVERAGE]: 80,
    [RepQuality.BAD]: 50,
  }

  // Workout Metadata
  private workoutMetadata!: {
    fullnessCost: number
    fitnessGain: number
    energyCost: number
  }

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, '', {
        fontSize: '40px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'black',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.subtitleText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.headerText.y + this.headerText.displayHeight + 15,
        'Tap "A" when the pointer gets to the middle!',
        {
          fontSize: '28px',
          color: '#555555',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setWordWrapWidth(Constants.WINDOW_WIDTH - 30, true)
      .setAlign('center')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.timerText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.subtitleText.y + this.subtitleText.displayHeight + 30,
        '',
        {
          fontSize: '40px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.headerText)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.subtitleText)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.timerText)

    this.setupKeyListener()
    this.setupTimingBar()
    this.setupMarker()
    this.setVisible(false)
  }

  setupKeyListener() {
    this.scene.input.keyboard.on('keydown-A', (e) => {
      if (this.goodTimingZone && this.averageTimingZone && !this.isHandlingRep && this.isShowing) {
        const markerXPos = this.marker.x
        if (
          markerXPos >= this.goodTimingZone.x - this.goodTimingZone.displayWidth / 2 &&
          markerXPos <= this.goodTimingZone.x + this.goodTimingZone.displayWidth / 2
        ) {
          this.handleRep(RepQuality.GOOD)
        } else if (
          markerXPos >= this.averageTimingZone.x - this.averageTimingZone.displayWidth / 2 &&
          markerXPos <= this.averageTimingZone.x + this.averageTimingZone.displayWidth / 2
        ) {
          this.handleRep(RepQuality.AVERAGE)
        } else {
          this.handleRep(RepQuality.BAD)
        }
      }
    })
  }

  handleRep(repQuality: RepQuality) {
    // Prevent double-taps
    this.isHandlingRep = true
    const rect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        this.timingBar.y,
        this.timingBar.displayWidth,
        this.timingBar.displayHeight,
        FitNessMonsterConstants.REP_QUALITY_COLOR[repQuality]
      )
      .setDepth(this.goodTimingZone.depth + 1)

    const alphaTween = this.scene.add.tween({
      targets: rect,
      alpha: {
        from: 1,
        to: 0,
      },
      delay: 250,
      duration: 250,
      ease: Phaser.Math.Easing.Sine.InOut,
      onComplete: () => {
        this.isHandlingRep = false
        alphaTween.remove()
        rect.destroy()
      },
    })
    UINumber.createNumber(
      `${repQuality}!`,
      this.scene,
      Constants.WINDOW_WIDTH / 2,
      this.timingBar.y - this.timingBar.displayHeight / 2,
      'black',
      '28px',
      () => {
        if (this.workoutCompleted) {
          this.completeWorkout()
        }
      }
    )
    this.totalScore += this.scoreMapping[repQuality]
  }

  setupTimingBar() {
    const barHeight = 25
    this.timingBar = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2,
        Constants.WINDOW_WIDTH - 50,
        barHeight
      )
      .setFillStyle(0x000000)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.averageTimingZone = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2,
        this.timingBar.displayWidth * 0.3,
        barHeight,
        FitNessMonsterConstants.REP_QUALITY_COLOR[RepQuality.AVERAGE]
      )
      .setDepth(this.timingBar.depth + 1)
    this.goodTimingZone = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2,
        this.timingBar.displayWidth * 0.075,
        barHeight,
        FitNessMonsterConstants.REP_QUALITY_COLOR[RepQuality.GOOD]
      )
      .setDepth(this.averageTimingZone.depth + 1)
  }

  setupMarker() {
    this.marker = this.scene.add
      .sprite(30, Constants.WINDOW_HEIGHT / 2 + 30, 'caret-up-solid')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setDisplaySize(20, 20)
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.subtitleText.setVisible(isVisible)
    this.timerText.setVisible(isVisible)
    this.timingBar.setVisible(isVisible)
    this.averageTimingZone.setVisible(isVisible)
    this.goodTimingZone.setVisible(isVisible)
    this.marker.setVisible(isVisible)
  }

  public initialize(data: TapTimingGameConfig, workout: Workout): void {
    this.isShowing = true
    const fitnessGrade = Utils.getFitnessGrade()
    this.workoutMetadata = {
      fullnessCost: workout.fullnessCost,
      fitnessGain: workout.fitnessLevelToGainMappings[fitnessGrade].fitnessGain,
      energyCost: workout.fitnessLevelToGainMappings[fitnessGrade].energyCost,
    }
    this.headerText.setText(data.headerText)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.headerText)

    // Set up tween for movement marker
    if (this.markerMovementTween) {
      this.markerMovementTween.remove()
    }
    this.markerMovementTween = this.scene.tweens.add({
      targets: this.marker,
      duration: 1750,
      yoyo: true,
      x: {
        from: this.timingBar.x - this.timingBar.displayWidth / 2,
        to: this.timingBar.x + this.timingBar.displayWidth / 2,
      },
      onYoyo: () => {
        this.maxPossibleScore += this.scoreMapping[RepQuality.GOOD]
      },
      onRepeat: () => {
        this.maxPossibleScore += this.scoreMapping[RepQuality.GOOD]
      },
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
    })
    this.timeRemainingSeconds =
      workout.fitnessLevelToGainMappings[fitnessGrade].requiredCompletionValue

    console.log(this.timeRemainingSeconds)

    // Set up timer
    this.scene.time.addEvent({
      repeat: this.timeRemainingSeconds,
      delay: 1000,
      startAt: 1000,
      callback: () => {
        const minutes = Math.floor(this.timeRemainingSeconds / 60)
        const seconds = this.timeRemainingSeconds % 60
        this.timerText.setText(`${minutes}:${seconds.toString().padStart(2, '0')}`)
        Utils.centerText(Constants.WINDOW_WIDTH / 2, this.timerText)
        this.timeRemainingSeconds--
        if (this.timeRemainingSeconds == 0) {
          this.workoutCompleted = true
        }
      },
    })

    this.setVisible(true)
  }

  completeWorkout() {
    const averageScore = Math.round((this.totalScore / this.maxPossibleScore) * 100)
    const workoutCompletedData: WorkoutCompletedData = {
      fullnessCost: this.workoutMetadata.fullnessCost,
      fitnessGain: this.workoutMetadata.fitnessGain,
      energyCost: this.workoutMetadata.energyCost,
      averageScore,
    }
    this.isShowing = false
    this.workoutCompleted = false
    this.maxPossibleScore = 0
    this.parent.renderSubscreen(FNM_ScreenTypes.COMPLETED_WORKOUT, workoutCompletedData)
  }
}
