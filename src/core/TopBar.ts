import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { UIValueBar } from './UIValueBar'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'

export enum FitnessGrade {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

export class TopBar {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle

  private fitnessLabel!: Phaser.GameObjects.Text
  private fitnessValueText!: Phaser.GameObjects.Text
  private fullnessLabel!: Phaser.GameObjects.Text
  private fullnessBar!: UIValueBar
  private energyLabel!: Phaser.GameObjects.Text
  private energyValue!: Phaser.GameObjects.Text
  private currDateLabel!: Phaser.GameObjects.Text

  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, 0, Constants.WINDOW_WIDTH, Constants.TOP_BAR_HEIGHT, 0x000000)
      .setOrigin(0)
      .setAlpha(0.5)
    this.setupFullnessText()
    this.setupFitnessText()
    this.setupEnergyText()
    this.setupCurrDateLabel()
  }

  setupFullnessText() {
    const fullnessLevel = Save.getData(SaveKeys.FULLNESS_LEVEL) as number
    this.fullnessBar = new UIValueBar(this.scene, {
      width: 40,
      height: 12,
      bgColor: 0x00ff00,
      fillColor: 0x000000,
      maxValue: 100,
      x: Constants.WINDOW_WIDTH - 50,
      y: 8,
      borderWidth: 4,
      showBorder: true,
    })
    this.fullnessBar.setCurrValue(fullnessLevel)

    this.fullnessLabel = this.scene.add.text(
      this.fullnessBar.x - this.fullnessBar.width + 10,
      this.fullnessBar.y,
      '🍗',
      {
        fontSize: '15px',
        color: 'white',
      }
    )
  }

  setupFitnessText() {
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_GRADE) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel) as FitnessGrade

    this.fitnessValueText = this.scene.add
      .text(this.fullnessLabel.x - 20, 5, `${fitnessGrade}`, {
        fontSize: '18px',
        color: 'white',
        strokeThickness: 1,
      })
      .setOrigin(1, 0)
    this.fitnessLabel = this.scene.add
      .text(this.fitnessValueText.x - this.fitnessValueText.displayWidth - 5, 7, '❤️', {
        fontSize: '15px',
        color: 'white',
      })
      .setOrigin(1, 0)
  }

  setupEnergyText() {
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    this.energyValue = this.scene.add
      .text(this.fitnessLabel.x - this.fitnessLabel.displayWidth - 15, 5, `${energyLevel}%`, {
        fontSize: '18px',
        color: 'white',
        strokeThickness: 1,
      })
      .setOrigin(1, 0)
    this.energyLabel = this.scene.add
      .text(this.energyValue.x - this.energyValue.displayWidth - 5, 7, '⚡', {
        fontSize: '15px',
        color: 'white',
      })
      .setOrigin(1, 0)
  }

  setupCurrDateLabel() {
    const currDay = Save.getData(SaveKeys.CURR_DATE) as number
    this.currDateLabel = this.scene.add
      .text(15, 7, `Day ${currDay}`, {
        fontSize: '15px',
        color: 'white',
      })
      .setOrigin(0, 0)
  }

  updateStats() {
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_GRADE) as number
    const fullnessLevel = Save.getData(SaveKeys.FULLNESS_LEVEL) as number

    this.energyValue.setText(`${energyLevel}%`)
    this.energyLabel.setPosition(
      this.energyValue.x - this.energyValue.displayWidth - 5,
      this.energyLabel.y
    )

    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel) as FitnessGrade
    this.fitnessValueText.setText(fitnessGrade)
    this.fitnessLabel.setPosition(
      this.fitnessValueText.x - this.fitnessValueText.displayWidth - 5,
      this.fitnessLabel.y
    )

    this.fullnessBar.setCurrValue(fullnessLevel)
  }
}
