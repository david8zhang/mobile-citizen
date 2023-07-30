import { Home } from '~/scenes/Home'
import { ClikClok } from '../ClikClok'
import { SubScreen } from './SubScreen'
import { SongConfig } from './SelectSound'
import { Constants } from '~/utils/Constants'
import { UINumber } from '../UINumber'
import { ClikClokConstants } from '../ClikClokConstants'
import { ArrowSpawner } from '../arrows/ArrowSpawner'
import { InputArrowZone } from '../arrows/InputArrowZone'
import { Arrow } from '../arrows/Arrow'
import { InputArrow } from '../arrows/InputArrow'

export class RecordVideo extends SubScreen {
  private selectedSound: SongConfig | null = null
  private bgRect: Phaser.GameObjects.Rectangle
  private selectedSoundLabel: Phaser.GameObjects.Text
  private countdownLabel: Phaser.GameObjects.Text
  private recordButton: Phaser.GameObjects.Arc

  public arrowSpawner!: ArrowSpawner
  public inputArrowZone!: InputArrowZone

  constructor(scene: Home, parent: ClikClok) {
    super(scene, parent)
    this.bgRect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2 + 15,
        Constants.WINDOW_WIDTH,
        Constants.WINDOW_HEIGHT - Constants.TOP_BAR_HEIGHT,
        0x000000
      )
      .setInteractive()
      .setDepth(Constants.SORT_LAYERS.APP_BG)
    this.selectedSoundLabel = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 15, '', {
        fontSize: '20px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.countdownLabel = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, '', {
        fontSize: '40px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.recordButton = this.scene.add
      .circle(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT - 100, 40, 0xff0000)
      .setInteractive()
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.recordButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.startRecording()
        this.recordButton.setAlpha(1)
      })
      .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
        this.startRecording()
        this.recordButton.setAlpha(1)
      })
    this.setupWorldBounds()
    this.setupArrowConfigs()
    this.setVisible(false)
  }

  startRecording() {
    this.recordButton.setVisible(false)
    let countdownTime = 3
    this.countdownLabel
      .setText(countdownTime.toString())
      .setPosition(
        Constants.WINDOW_WIDTH / 2 - this.countdownLabel.displayWidth / 2,
        this.countdownLabel.y
      )
      .setVisible(true)
    this.scene.time.addEvent({
      repeat: 2,
      callback: () => {
        countdownTime--
        if (countdownTime == 0) {
          if (this.selectedSound) {
            this.arrowSpawner.setupSong(this.selectedSound)
          }
          this.countdownLabel.setVisible(false)
        }
        this.countdownLabel.setText(countdownTime.toString())
      },
      delay: 1000,
    })
  }

  processInputSuperlative(yDiff: number) {
    const superlative = ClikClokConstants.getSuperlative(yDiff)
    if (superlative) {
      UINumber.createNumber(superlative, this.scene, 300, 40, 'white')
      const score = ClikClokConstants.SUPERLATIVE_SCORE[superlative]
    }
  }

  processMiss(arrow: InputArrow) {
    UINumber.createNumber('Miss', this.scene, arrow.sprite.x, arrow.sprite.y, 'red')
  }

  public onRender(selectedSound: SongConfig): void {
    const parent = this.parent as ClikClok
    parent.navbar.setVisible(false)
    parent.bottomNav.setVisible(false)
    this.selectedSound = selectedSound
    this.selectedSoundLabel.setText(this.selectedSound.name)
    this.selectedSoundLabel.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.selectedSoundLabel.displayWidth / 2,
      this.selectedSoundLabel.y
    )
  }

  setupArrowConfigs() {
    this.inputArrowZone = new InputArrowZone(this.scene, this)
    this.arrowSpawner = new ArrowSpawner(this.scene)
  }

  public setVisible(isVisible: boolean): void {
    this.recordButton.setVisible(isVisible)
    this.selectedSoundLabel.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
    this.inputArrowZone.setVisible(isVisible)
  }

  setupWorldBounds() {
    this.scene.physics.world.setBounds(
      0,
      Constants.TOP_BAR_HEIGHT,
      Constants.WINDOW_WIDTH,
      Constants.WINDOW_HEIGHT - Constants.TOP_BAR_HEIGHT,
      true,
      true,
      true,
      false
    )
    this.scene.physics.world.on('worldbounds', (obj) => {
      obj.gameObject.destroy()
    })
  }
}
