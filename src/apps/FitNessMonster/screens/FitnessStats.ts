import { SubScreen } from '~/core/SubScreen'
import { FitNessMonster } from '../FitNessMonster'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'
import { Save, SaveKeys } from '~/utils/Save'

export class FitnessStats extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private fitnessGradeLabel!: Phaser.GameObjects.Text
  private fitnessGradeCircle!: Phaser.GameObjects.Arc
  private fitnessGradePoints!: Phaser.GameObjects.Text

  private totalEnergyLevelLabel!: Phaser.GameObjects.Text
  private totalEnergyLevelValue!: Phaser.GameObjects.Text
  private energyCostLabel!: Phaser.GameObjects.Text
  private energyCostValue!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(0, 0, 'Fitness Grade', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
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
    this.fitnessGradeCircle = this.scene.add
      .circle(
        Constants.WINDOW_WIDTH / 2,
        this.headerText.y + this.headerText.displayHeight + 150,
        100,
        0xffffff,
        0
      )
      .setStrokeStyle(5, 0x000000)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    const fitnessLevel = Save.getData(SaveKeys.FITNESS_GRADE) as number
    this.fitnessGradeLabel = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.fitnessGradeCircle.y - 25,
        `${Utils.convertFitnessLevelToGrade(fitnessLevel)}`,
        {
          fontSize: '80px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStroke('black', 3)

    this.fitnessGradeLabel.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.fitnessGradeLabel.displayWidth / 2,
      this.fitnessGradeCircle.y - this.fitnessGradeLabel.displayHeight / 2 - 25
    )

    this.fitnessGradePoints = this.scene.add
      .text(0, 0, `${fitnessLevel}`, {
        fontSize: '40px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessGradePoints.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.fitnessGradePoints.displayWidth / 2,
      this.fitnessGradeLabel.y + this.fitnessGradeLabel.displayHeight + 5
    )
  }

  setupFitnessStats() {
    const energyValue = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_GRADE) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel)!

    this.totalEnergyLevelLabel = this.scene.add
      .text(
        30,
        this.fitnessGradeCircle.y + this.fitnessGradeCircle.displayHeight / 2 + 40,
        'Total Energy Level',
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalEnergyLevelValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 30,
        this.fitnessGradeCircle.y + this.fitnessGradeCircle.displayHeight / 2 + 40,
        `${energyValue}`,
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)

    this.energyCostLabel = this.scene.add
      .text(
        30,
        this.totalEnergyLevelLabel.y + this.totalEnergyLevelLabel.displayHeight + 15,
        'Energy Cost Bonus',
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.energyCostValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 30,
        this.totalEnergyLevelLabel.y + this.totalEnergyLevelLabel.displayHeight + 15,
        `${Utils.getEnergyCostForFitness(fitnessGrade) * 100}%`,
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)
  }

  public onRender(data?: any): void {}
  public setVisible(isVisible: boolean): void {
    this.fitnessGradeCircle.setVisible(isVisible)
    this.fitnessGradeLabel.setVisible(isVisible)
    this.fitnessGradePoints.setVisible(isVisible)
    this.totalEnergyLevelLabel.setVisible(isVisible)
    this.totalEnergyLevelValue.setVisible(isVisible)
    this.energyCostLabel.setVisible(isVisible)
    this.energyCostValue.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
  }
}
