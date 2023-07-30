import { Home } from '~/scenes/Home'
import { ClikClok } from '../ClikClok'
import { SubScreen } from './SubScreen'
import { Constants } from '~/utils/Constants'
import { SoundList } from '~/web-ui/SoundList'
import { ClikClokConstants } from '../ClikClokConstants'

export interface SongConfig {
  name: string
  difficulty: number
  earningPotential: number
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
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.selectSoundLabel.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.selectSoundLabel.displayWidth / 2,
      parent.navbar.bgRect.y + parent.navbar.bgRect.displayHeight + 30
    )
  }

  selectSound(data: SongConfig) {
    const parent = this.parent as ClikClok
    parent.goToRecordVideoScreen(data)
  }

  setupSoundsList() {
    const yPos = this.selectSoundLabel.y
    const transactionList = SoundList(
      ClikClokConstants.SOUNDS_LIST,
      520,
      Constants.WINDOW_WIDTH,
      (data) => {
        this.selectSound(data)
      }
    )
    this.soundListDomElement = this.scene.add
      .dom(0, yPos + 60, transactionList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.setupDragToScroll()
  }

  private setupDragToScroll() {
    const ele = document.getElementById('sound-list')!
    let pos = { top: 0, left: 0, x: 0, y: 0 }

    const mouseDownHandler = function (e) {
      ele.style.userSelect = 'none'
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      }
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseMoveHandler = function (e) {
      const dx = e.clientX - pos.x
      const dy = e.clientY - pos.y
      ele.scrollTop = pos.top - dy
      ele.scrollLeft = pos.left - dx
    }

    const mouseUpHandler = function () {
      ele.style.removeProperty('user-select')

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }
    ele.addEventListener('mousedown', mouseDownHandler)
  }

  public setVisible(isVisible: boolean): void {
    this.soundListDomElement.setVisible(isVisible)
    this.selectSoundLabel.setVisible(isVisible)
  }

  public onRender(): void {}
}
