import { SubScreen } from '~/core/SubScreen'
import { FitNessMonster } from '../FitNessMonster'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'
import { Save, SaveKeys } from '~/utils/Save'
import { FitnessGradeCircle } from '../FitnessGradeCircle'

export class FitnessStats extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private fitnessGradeCircle!: FitnessGradeCircle

  private totalEnergyLevelLabel!: Phaser.GameObjects.Text
  private totalEnergyLevelValue!: Phaser.GameObjects.Text
  private energyCostLabel!: Phaser.GameObjects.Text
  private energyCostValue!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(0, 0, 'Fitness Grade', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 25
    )
    this.setupFitnessGradeCircle()
    this.setupFitnessStats()
    this.setVisible(false)
  }

  setupFitnessGradeCircle() {
    const fitnessPoints = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessPoints)
    const pointsEarnedTowardNextGrade =
      fitnessPoints - Utils.getMinFitnessPointsForGrade(fitnessGrade)
    const totalPointsRequiredForNextFitnessGrade =
      Utils.getMinFitnessPointsForGrade(Utils.getNextGrade(fitnessGrade)) -
      Utils.getMinFitnessPointsForGrade(fitnessGrade)

    this.fitnessGradeCircle = new FitnessGradeCircle(this.scene, {
      fitnessGrade: fitnessGrade,
      fitnessPoints: fitnessPoints,
      yPos: this.headerText.y + this.headerText.displayHeight + 150,
      progressPct: pointsEarnedTowardNextGrade / totalPointsRequiredForNextFitnessGrade,
    })
  }

  setupFitnessStats() {
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel)!
    const totalEnergyLevel = Utils.getMaxEnergyForFitness(fitnessGrade)
    const yPos = Math.round(this.fitnessGradeCircle.y + this.fitnessGradeCircle.displayHeight / 2)
    this.totalEnergyLevelLabel = this.scene.add
      .text(30, yPos + 40, 'Total Energy Level', {
        fontSize: '28px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalEnergyLevelValue = this.scene.add
      .text(Constants.WINDOW_WIDTH - 30, yPos + 40, `${totalEnergyLevel}`, {
        fontSize: '28px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)

    this.energyCostLabel = this.scene.add
      .text(
        30,
        this.totalEnergyLevelLabel.y + this.totalEnergyLevelLabel.displayHeight + 15,
        'Energy Cost Impact',
        {
          fontSize: '28px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.energyCostValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 30,
        this.totalEnergyLevelLabel.y + this.totalEnergyLevelLabel.displayHeight + 15,
        `${Utils.getEnergyCostForFitness(fitnessGrade) * 100}%`,
        {
          fontSize: '28px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)
  }

  public onRender(data?: any): void {
    const fitnessPoints = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessPoints)!
    this.fitnessGradeCircle.updateStats(fitnessGrade, fitnessPoints)
    const totalEnergyLevel = Utils.getMaxEnergyForFitness(fitnessGrade)
    this.totalEnergyLevelValue.setText(`${totalEnergyLevel}`)
    this.energyCostValue.setText(`${Utils.getEnergyCostForFitness(fitnessGrade) * 100}%`)
  }

  public setVisible(isVisible: boolean): void {
    this.fitnessGradeCircle.setVisible(isVisible)
    this.totalEnergyLevelLabel.setVisible(isVisible)
    this.totalEnergyLevelValue.setVisible(isVisible)
    this.energyCostLabel.setVisible(isVisible)
    this.energyCostValue.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
  }
}
