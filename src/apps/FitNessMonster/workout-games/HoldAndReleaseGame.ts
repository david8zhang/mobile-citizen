import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'
import { UIValueBar } from '~/core/UIValueBar'
import { Constants } from '~/utils/Constants'
import { WorkoutMinigame } from './WorkoutMinigame'
import { RepQuality } from '../FitNessMonsterConstants'

export interface HoldAndReleaseGameConfig extends WorkoutMinigame {
  headerText: string
  totalReps: number
  increasePerFrame: number
  perfectRepWidthPct: number
  repRanges: {
    [key in RepQuality]: number
  }
  barPosY: number
}

export class HoldAndReleaseGame extends WorkoutMinigame {
  private progressBarBG!: Phaser.GameObjects.Rectangle
  private progressBar!: UIValueBar
  private progressMarker!: Phaser.GameObjects.Sprite
  private averageRepRangeRect!: Phaser.GameObjects.Rectangle
  private goodRepRangeRect!: Phaser.GameObjects.Rectangle
  private goodProgressLine!: Phaser.GameObjects.Line
  private repRanges!: {
    [key in RepQuality]: number
  }
  private perfectRepWidthPct: number = 0
  private isPressing: boolean = false

  private headerText!: Phaser.GameObjects.Text
  private subtitleText!: Phaser.GameObjects.Text
  private repText!: Phaser.GameObjects.Text
  private completedRepsValue: number = 0
  private increasePerFrame: number = 0
  private keyA!: Phaser.Input.Keyboard.Key

  private static REP_QUALITY_COLOR = {
    [RepQuality.GOOD]: 0x2ecc71,
    [RepQuality.AVERAGE]: 0xf1c40f,
    [RepQuality.BAD]: 0xc0392b,
  }

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
    if (this.progressMarker) {
      this.progressMarker.destroy()
    }
    const progressBarWidth = Constants.WINDOW_WIDTH - 50
    this.progressBarBG = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2 - progressBarWidth / 2,
        config.barPosY,
        progressBarWidth,
        25,
        0x000000
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.progressBar = new UIValueBar(this.scene, {
      x: Constants.WINDOW_WIDTH / 2 - progressBarWidth / 2,
      y: config.barPosY,
      width: progressBarWidth,
      height: 25,
      maxValue: 100,
      borderWidth: 0,
      depth: Constants.SORT_LAYERS.APP_UI + 100,
      hideBg: true,
    })
    this.progressBar.setCurrValue(0)
    this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.progressMarker = this.scene.add
      .sprite(this.progressBar.x, this.progressBar.y + 35, 'caret-up-solid')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setDisplaySize(20, 20)
    const perfectWidth = progressBarWidth * config.perfectRepWidthPct
    this.progressMarker.setPosition(this.progressBar.x + perfectWidth, this.progressBar.y + 35)
    this.averageRepRangeRect = this.scene.add
      .rectangle(
        this.progressMarker.x,
        this.progressBar.y,
        (config.repRanges.AVERAGE / 100) * progressBarWidth,
        25,
        HoldAndReleaseGame.REP_QUALITY_COLOR[RepQuality.AVERAGE]
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0.5, 0)
    this.goodRepRangeRect = this.scene.add
      .rectangle(
        this.progressMarker.x,
        this.progressBar.y,
        (config.repRanges.GOOD / 100) * progressBarWidth,
        25,
        HoldAndReleaseGame.REP_QUALITY_COLOR[RepQuality.GOOD]
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0.5, 0)
    this.perfectRepWidthPct = config.perfectRepWidthPct
    this.repRanges = config.repRanges
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
    if (this.progressMarker) {
      this.progressMarker.setVisible(isVisible)
    }
    if (this.goodProgressLine) {
      this.goodProgressLine.setVisible(isVisible)
    }
    if (this.averageRepRangeRect) {
      this.averageRepRangeRect.setVisible(isVisible)
    }
  }

  processTimingQuality() {
    let repQuality = RepQuality.BAD
    const currValue = this.progressBar.currValue
    const goodRangeLow = this.perfectRepWidthPct * 100 - this.repRanges.GOOD / 2
    const goodRangeHigh = this.perfectRepWidthPct * 100 + this.repRanges.GOOD / 2
    const averageRangeLow = this.perfectRepWidthPct * 100 - this.repRanges.AVERAGE / 2
    const averageRangeHigh = this.perfectRepWidthPct * 100 + this.repRanges.AVERAGE / 2
    console.log(currValue, goodRangeLow, goodRangeHigh, averageRangeLow, averageRangeHigh)
    if (currValue >= goodRangeLow && currValue <= goodRangeHigh) {
      repQuality = RepQuality.GOOD
    } else {
      if (currValue >= averageRangeLow && currValue <= averageRangeHigh) {
        repQuality = RepQuality.AVERAGE
      }
    }
    this.progressBar.setCurrValue(0)
    const width = Constants.WINDOW_WIDTH - 50
    const rect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2 - width / 2,
        this.progressBar.y,
        width * (currValue / 100),
        25,
        HoldAndReleaseGame.REP_QUALITY_COLOR[repQuality]
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI + 100)
      .setOrigin(0)
    this.scene.tweens.add({
      targets: [rect],
      alpha: {
        from: 1,
        to: 0,
      },
      duration: 1000,
      onComplete: () => {
        rect.destroy()
      },
    })
  }

  update() {
    if (this.keyA) {
      if (this.keyA.isDown) {
        this.isPressing = true
        this.progressBar.increase(this.increasePerFrame)
      } else {
        if (this.keyA.isUp && this.isPressing) {
          this.isPressing = false
          this.processTimingQuality()
        }
      }
    }
  }
}
