import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { UIValueBar } from './UIValueBar'

export class TopBar {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle

  private fitnessLabel!: Phaser.GameObjects.Text
  private fitnessValueText!: Phaser.GameObjects.Text
  private fullnessLabel!: Phaser.GameObjects.Text
  private fullnessBar!: UIValueBar
  private energyLabel!: Phaser.GameObjects.Text
  private energyValue!: Phaser.GameObjects.Text

  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, 0, Constants.WINDOW_WIDTH, Constants.TOP_BAR_HEIGHT, 0x000000)
      .setOrigin(0)
    this.setupFullnessText()
    this.setupFitnessText()
    this.setupEnergyText()
  }

  setupFullnessText() {
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
    this.fitnessValueText = this.scene.add
      .text(this.fullnessLabel.x - 20, 5, 'A', {
        fontSize: '18px',
        color: 'white',
        strokeThickness: 1,
      })
      .setOrigin(1, 0)
    this.fitnessLabel = this.scene.add
      .text(this.fitnessValueText.x - this.fitnessValueText.displayWidth - 5, 7, '🏃', {
        fontSize: '15px',
        color: 'white',
      })
      .setOrigin(1, 0)
  }

  setupEnergyText() {
    this.energyValue = this.scene.add
      .text(this.fitnessLabel.x - this.fitnessLabel.displayWidth - 15, 5, '100%', {
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
}