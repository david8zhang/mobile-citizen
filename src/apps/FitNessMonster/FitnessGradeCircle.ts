import { Grade } from '~/core/TopBar'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export interface FitnessGradeCircleConfig {
  fitnessGrade: Grade
  fitnessPoints: number
  progressPct: number
  yPos: number
}

export class FitnessGradeCircle {
  private scene: Home
  private fitnessGradeCircle: Phaser.GameObjects.Arc
  private fitnessGradeProgressCircle: Phaser.GameObjects.Arc
  private fitnessGradeLabel: Phaser.GameObjects.Text
  private fitnessGradePoints: Phaser.GameObjects.Text

  constructor(scene: Home, config: FitnessGradeCircleConfig) {
    this.scene = scene
    this.fitnessGradeCircle = this.scene.add
      .circle(Constants.WINDOW_WIDTH / 2, config.yPos, 100, 0xffffff, 0)
      .setStrokeStyle(5, 0x000000)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.fitnessGradeLabel = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, this.fitnessGradeCircle.y - 25, config.fitnessGrade, {
        fontSize: '80px',
        color: 'black',
        fontFamily: Constants.FONT_BOLD,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.fitnessGradeLabel.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.fitnessGradeLabel.displayWidth / 2,
      this.fitnessGradeCircle.y - this.fitnessGradeLabel.displayHeight / 2 - 25
    )
    this.fitnessGradePoints = this.scene.add
      .text(0, 0, `${config.fitnessPoints}`, {
        fontSize: '40px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessGradePoints.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.fitnessGradePoints.displayWidth / 2,
      this.fitnessGradeLabel.y + this.fitnessGradeLabel.displayHeight + 5
    )

    this.fitnessGradeProgressCircle = this.scene.add
      .circle(Constants.WINDOW_WIDTH / 2, config.yPos, 100, 0xffffff, 0)
      .setStrokeStyle(6, 0x00ff00)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessGradeProgressCircle.setStartAngle(90)
    this.fitnessGradeProgressCircle.setEndAngle(90 + 360 * config.progressPct)
    this.fitnessGradeProgressCircle.setClosePath(false)
  }

  setVisible(isVisible: boolean) {
    this.fitnessGradeCircle.setVisible(isVisible)
    this.fitnessGradeLabel.setVisible(isVisible)
    this.fitnessGradePoints.setVisible(isVisible)
    this.fitnessGradeProgressCircle.setVisible(isVisible)
  }

  get x() {
    return this.fitnessGradeCircle.x
  }

  get y() {
    return this.fitnessGradeCircle.y
  }

  get displayHeight() {
    return this.fitnessGradeCircle.displayHeight
  }

  get displayWidth() {
    return this.fitnessGradeCircle.displayWidth
  }

  updateStats(fitnessGrade: Grade, fitnessPoints: number) {
    this.fitnessGradeLabel.setText(fitnessGrade)
    this.fitnessGradeLabel.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.fitnessGradeLabel.displayWidth / 2,
      this.fitnessGradeCircle.y - this.fitnessGradeLabel.displayHeight / 2 - 25
    )
    this.fitnessGradePoints.setText(`${fitnessPoints}`)
    this.fitnessGradePoints.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.fitnessGradePoints.displayWidth / 2,
      this.fitnessGradeLabel.y + this.fitnessGradeLabel.displayHeight + 5
    )
    const pointsEarnedTowardNextGrade =
      fitnessPoints - Utils.getMinFitnessPointsForGrade(fitnessGrade)
    const totalPointsRequiredForNextFitnessGrade =
      Utils.getMinFitnessPointsForGrade(Utils.getNextGrade(fitnessGrade)) -
      Utils.getMinFitnessPointsForGrade(fitnessGrade)
    this.fitnessGradeProgressCircle.setStartAngle(90)
    this.fitnessGradeProgressCircle.setEndAngle(
      90 + 360 * (pointsEarnedTowardNextGrade / totalPointsRequiredForNextFitnessGrade)
    )
  }

  destroy() {
    this.fitnessGradeCircle.destroy()
    this.fitnessGradeLabel.destroy()
    this.fitnessGradePoints.destroy()
    this.fitnessGradeProgressCircle.destroy()
  }
}
