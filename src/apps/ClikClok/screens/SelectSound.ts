import { Home } from '~/scenes/Home'
import { ClikClok } from '../ClikClok'
import { SubScreen } from '../../../core/SubScreen'
import { Constants } from '~/utils/Constants'
import { SoundList } from '~/apps/ClikClok/web-ui/SoundList'
import { ClikClokConstants, EarningPotential } from '../ClikClokConstants'
import { Utils } from '~/utils/Utils'
import { Save, SaveKeys } from '~/utils/Save'
import { SOUNDS_LIST } from '~/content/ClikClokSounds'

export interface SongConfig {
  name: string
  difficulty: number
  earningPotential: EarningPotential
  bpm: number
  duration: number
  hashtags: string
  energyCost: number
}

export class SelectSound extends SubScreen {
  private selectSoundLabel!: Phaser.GameObjects.Text
  private soundListDomElement!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: ClikClok) {
    super(scene, parent)
    this.setupSelectSoundLabel()
    this.setupSoundsList()
    this.setVisible(false)
  }

  setupSelectSoundLabel() {
    const parent = this.parent as ClikClok
    this.selectSoundLabel = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, 0, 'Pick a Sound', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.selectSoundLabel.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.selectSoundLabel.displayWidth / 2,
      parent.navbar.bgRect.y + parent.navbar.bgRect.displayHeight + 30
    )
  }

  selectSound(data: SongConfig) {
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL)
    if (data.energyCost <= energyLevel) {
      const parent = this.parent as ClikClok
      parent.goToRecordVideoScreen(data)
    }
  }

  setupSoundsList() {
    const yPos = this.selectSoundLabel.y
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL)
    const soundsList = SoundList(
      SOUNDS_LIST,
      520,
      Constants.WINDOW_WIDTH,
      (data) => {
        this.selectSound(data)
      },
      energyLevel
    )
    this.soundListDomElement = this.scene.add
      .dom(0, yPos + 60, soundsList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('sound-list')
  }

  updateSoundsList() {
    if (this.soundListDomElement) {
      this.soundListDomElement.destroy()
    }
    this.setupSoundsList()
  }

  public setVisible(isVisible: boolean): void {
    this.soundListDomElement.setVisible(isVisible)
    this.selectSoundLabel.setVisible(isVisible)
  }

  public onRender(): void {
    this.updateSoundsList()
  }
}
