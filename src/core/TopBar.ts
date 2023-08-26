import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { UIValueBar } from './UIValueBar'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'

export enum Grade {
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

  private knowledgeLabel!: Phaser.GameObjects.Sprite
  private knowledgeValueText!: Phaser.GameObjects.Text
  private fitnessLabel!: Phaser.GameObjects.Sprite
  private fitnessValueText!: Phaser.GameObjects.Text
  private fullnessLabel!: Phaser.GameObjects.Sprite
  private fullnessBar!: UIValueBar
  private energyIcon!: Phaser.GameObjects.Sprite
  private energyValue!: Phaser.GameObjects.Text
  private currDateLabel!: Phaser.GameObjects.Text
  private powerButton!: Phaser.GameObjects.Sprite

  private numNotificationsText!: Phaser.GameObjects.Text
  private envelopeButton!: Phaser.GameObjects.Sprite

  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(0, 0, Constants.WINDOW_WIDTH, Constants.TOP_BAR_HEIGHT, 0x000000)
      .setOrigin(0)
      .setAlpha(0.5)
    this.setupFullnessText()
    this.setupKnowledgeText()
    this.setupFitnessText()
    this.setupEnergyText()
    this.setupPowerButton()
    this.setupCurrDateLabel()
    this.setupNotifications()
  }

  setupFullnessText() {
    const fullnessLevel = Save.getData(SaveKeys.FULLNESS_LEVEL) as number
    this.fullnessBar = new UIValueBar(this.scene, {
      width: 15,
      height: 20,
      bgColor: 0x888888,
      maxValue: 100,
      x: Constants.WINDOW_WIDTH - 30,
      y: 5,
      borderWidth: 0,
      showBorder: false,
      hideBg: false,
      changeColorBasedOnPct: true,
      isVertical: true,
    })
    this.fullnessBar.setCurrValue(fullnessLevel)
    this.fullnessLabel = this.scene.add
      .sprite(this.fullnessBar.x - 10, 7, 'burger-solid')
      .setDisplaySize(15, 15)
      .setOrigin(1, 0)
      .setTintFill(0xffffff)
  }

  setupKnowledgeText() {
    const knowledgeLevel = Save.getData(SaveKeys.KNOWLEDGE_LEVEL) as number
    const knowledgeGrade = Utils.convertKnowledgeLevelToGrade(knowledgeLevel) as Grade
    this.knowledgeValueText = this.scene.add
      .text(this.fullnessLabel.x - 30, 5, `${knowledgeGrade}`, {
        fontSize: '18px',
        color: 'white',
        strokeThickness: 1,
      })
      .setOrigin(1, 0)
    this.knowledgeLabel = this.scene.add
      .sprite(this.knowledgeValueText.x - this.knowledgeValueText.displayWidth - 5, 7, 'book-solid')
      .setDisplaySize(15, 15)
      .setOrigin(1, 0)
      .setTintFill(0xffffff)
  }

  setupFitnessText() {
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel) as Grade

    this.fitnessValueText = this.scene.add
      .text(this.knowledgeLabel.x - 30, 5, `${fitnessGrade}`, {
        fontSize: '18px',
        color: 'white',
        strokeThickness: 1,
      })
      .setOrigin(1, 0)
    this.fitnessLabel = this.scene.add
      .sprite(this.fitnessValueText.x - this.fitnessValueText.displayWidth - 5, 7, 'heart-solid')
      .setDisplaySize(15, 15)
      .setOrigin(1, 0)
      .setTintFill(0xffffff)
  }

  setupEnergyText() {
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel) as Grade
    const totalEnergyLevel = Utils.getMaxEnergyForFitness(fitnessGrade)
    this.energyValue = this.scene.add
      .text(
        this.fitnessLabel.x - this.fitnessLabel.displayWidth - 15,
        5,
        `${energyLevel}/${totalEnergyLevel}`,
        {
          fontSize: '18px',
          color: 'white',
          strokeThickness: 1,
        }
      )
      .setOrigin(1, 0)
    this.energyIcon = this.scene.add
      .sprite(this.energyValue.x - this.energyValue.displayWidth - 5, 7, 'bolt-solid')
      .setDisplaySize(15, 15)
      .setOrigin(1, 0)
      .setTintFill(0xffffff)
  }

  setupNotifications() {
    const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
    this.numNotificationsText = this.scene.add
      .text(this.energyIcon.x - this.energyIcon.displayWidth - 15, 5, `${notifications.length}`, {
        fontSize: '18px',
        color: 'white',
        strokeThickness: 1,
      })
      .setOrigin(1, 0)
    this.envelopeButton = this.scene.add
      .sprite(
        this.numNotificationsText.x - this.numNotificationsText.displayWidth - 5,
        7,
        'envelope-solid'
      )
      .setDisplaySize(15, 15)
      .setOrigin(1, 0)
      .setTintFill(0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.envelopeButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.envelopeButton.setAlpha(1)
        this.scene.openNotificationsList()
      })
  }

  setupCurrDateLabel() {
    const currDay = Save.getData(SaveKeys.CURR_DATE) as number
    this.currDateLabel = this.scene.add
      .text(this.powerButton.x + 30, 5, `Day ${currDay}`, {
        fontSize: '18px',
        color: 'white',
      })
      .setStroke('#ffffff', 1)
      .setOrigin(0, 0)
  }

  setupPowerButton() {
    this.powerButton = this.scene.add
      .sprite(15, 7, 'power-off-solid')
      .setOrigin(0)
      .setDisplaySize(16, 16)
      .setTintFill(0xffffff)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.powerButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.powerButton.setAlpha(1)
        this.scene.showConfirmProgressModal()
      })
  }

  updateStats() {
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    const fullnessLevel = Save.getData(SaveKeys.FULLNESS_LEVEL) as number
    const fitnessGrade = Utils.convertFitnessLevelToGrade(fitnessLevel)
    const totalEnergyLevel = Utils.getMaxEnergyForFitness(fitnessGrade)
    const currDate = Save.getData(SaveKeys.CURR_DATE) as number
    const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]

    this.energyValue.setText(`${energyLevel}/${totalEnergyLevel}`)
    this.energyIcon.setPosition(
      this.energyValue.x - this.energyValue.displayWidth - 5,
      this.energyIcon.y
    )

    this.fitnessValueText.setText(fitnessGrade)
    this.fitnessLabel.setPosition(
      this.fitnessValueText.x - this.fitnessValueText.displayWidth - 5,
      this.fitnessLabel.y
    )

    this.currDateLabel.setText(`Day ${currDate}`)
    this.fullnessBar.setCurrValue(fullnessLevel)
    this.numNotificationsText.setText(`${notifications.length}`)
    this.numNotificationsText.setPosition(this.energyIcon.x - this.energyIcon.displayWidth - 15, 5)
    this.envelopeButton.setPosition(
      this.numNotificationsText.x - this.numNotificationsText.displayWidth - 5,
      7
    )
  }
}
