import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'
import { UIValueBar } from '~/core/UIValueBar'
import { Constants } from '~/utils/Constants'
import { WorkoutMinigame } from './WorkoutMinigame'

export interface HoldAndReleaseGameConfig extends WorkoutMinigame {
  headerText: string
  totalReps: number
  increasePerFrame: number
  perfectMarker: number
  barPosY: number
}

export class HoldAndReleaseGame extends WorkoutMinigame {
  private progressBar!: UIValueBar
  private headerText!: Phaser.GameObjects.Text
  private subtitleText!: Phaser.GameObjects.Text
  private repText!: Phaser.GameObjects.Text
  private completedRepsValue: number = 0
  private increasePerFrame: number = 0
  private keyA!: Phaser.Input.Keyboard.Key

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.setupSubtitleText()
    this.setVisible(false)
    this.scene.updateCallbacks.push(() => {
      this.update()
    })
  }

  setupSubtitleText() {
    this.subtitleText = this.scene.add
      .text(0, 0, 'Hold key and release!', {
        fontSize: '18px',
        color: '#555555',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupProgressBar(config: HoldAndReleaseGameConfig) {
    if (this.progressBar) {
      this.progressBar.destroy()
    }
    if (this.keyA) {
      this.keyA.destroy()
    }
    const width = Constants.WINDOW_WIDTH - 50
    this.progressBar = new UIValueBar(this.scene, {
      x: Constants.WINDOW_WIDTH / 2 - width / 2,
      y: config.barPosY,
      width,
      height: 25,
      maxValue: 100,
      borderWidth: 0,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
    this.progressBar.setCurrValue(0)
    this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  }

  setupReps(config: HoldAndReleaseGameConfig) {
    this.repText = this.scene.add
      .text(0, 0, `${this.completedRepsValue}/${config.totalReps}`, {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupHeaderText(config: HoldAndReleaseGameConfig) {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, config.headerText, {
        fontSize: '35px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      this.headerText.y
    )
  }

  positionElements() {
    this.subtitleText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.subtitleText.displayWidth / 2,
      this.headerText.y + this.headerText.displayHeight + 15
    )
    this.repText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.repText.displayWidth / 2,
      this.subtitleText.y + this.subtitleText.displayHeight + 30
    )
  }

  initialize(config: HoldAndReleaseGameConfig) {
    this.completedRepsValue = 0
    this.increasePerFrame = config.increasePerFrame
    this.setupHeaderText(config)
    this.setupReps(config)
    this.setupProgressBar(config)
    this.positionElements()
    this.setVisible(true)
  }

  setVisible(isVisible: boolean) {
    this.subtitleText.setVisible(isVisible)
    if (this.headerText) {
      this.headerText.setVisible(isVisible)
    }
    if (this.repText) {
      this.repText.setVisible(isVisible)
    }
    if (this.progressBar) {
      this.progressBar.setVisible(isVisible)
    }
  }

  update() {
    if (this.keyA) {
      if (this.keyA.isDown) {
        this.progressBar.increase(this.increasePerFrame)
      } else {
        this.progressBar.decrease(this.increasePerFrame * 0.5)
      }
    }
  }
}
