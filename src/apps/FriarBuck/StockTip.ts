import { Home } from '~/scenes/Home'
import { StockTipLevel, TipUpdate } from './FriarBuckConstants'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export interface StockTipConfig {
  position: {
    x: number
    y: number
  }
}

/**
 * Level 1 Tip:
 * Recommended Action: Buy
 *
 * Level 2 Tip:
 * Potential Change: +40%
 *
 */

export class StockTip {
  private leftCarat!: Phaser.GameObjects.Sprite
  private rightCarat!: Phaser.GameObjects.Sprite

  private level1TipText!: Phaser.GameObjects.Text
  private level2TipText!: Phaser.GameObjects.Text
  private currTipIndex: number = 0

  private scene: Home

  constructor(scene: Home, config: StockTipConfig) {
    this.scene = scene
    this.setupTips(config.position)
    this.setupNavButtons(config.position)
    this.setVisible(false)
  }

  setupTips(position: { x: number; y: number }) {
    this.level1TipText = this.scene.add
      .text(position.x, position.y, '', {
        fontSize: '18px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.level2TipText = this.scene.add
      .text(position.x, position.y, '', {
        fontSize: '18px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  getHighestUnlockedTipLevel(tipUpdate: TipUpdate) {
    const requirements = tipUpdate.requirements
    const knowledgeGrade = Utils.getKnowledgeGrade()
    if (
      Utils.getGradeIndex(knowledgeGrade) >=
      Utils.getGradeIndex(requirements[StockTipLevel.LEVEL_2])
    ) {
      return StockTipLevel.LEVEL_2
    }
    if (
      Utils.getGradeIndex(knowledgeGrade) >=
      Utils.getGradeIndex(requirements[StockTipLevel.LEVEL_1])
    ) {
      return StockTipLevel.LEVEL_1
    }
    return -1
  }

  updateTipContent(tipUpdate: TipUpdate) {
    const tipContent = tipUpdate.tipContent
    const tipLevel = this.getHighestUnlockedTipLevel(tipUpdate)
    if (tipLevel >= StockTipLevel.LEVEL_1) {
      this.level1TipText
        .setText(`Recommended action: ${tipContent[StockTipLevel.LEVEL_1]}`)
        .setColor('#000000')
        .setPosition(15, this.level1TipText.y)
    } else {
      this.level1TipText
        .setText(`Knowledge Rank ${tipUpdate.requirements[StockTipLevel.LEVEL_1]} Required`)
        .setColor('#777777')
      Utils.centerText(Constants.WINDOW_WIDTH / 2, this.level1TipText)
    }
    if (tipLevel >= StockTipLevel.LEVEL_2) {
      const pctChange = tipContent[StockTipLevel.LEVEL_2]
      this.level2TipText
        .setText(
          `Predicted Change: ${
            pctChange > 0 ? `+${Math.abs(pctChange)}%` : `-${Math.abs(pctChange)}%`
          }`
        )
        .setColor('#000000')
        .setPosition(15, this.level2TipText.y)
    } else {
      this.level2TipText
        .setText(`Knowledge Rank ${tipUpdate.requirements[StockTipLevel.LEVEL_2]} Required`)
        .setColor('#777777')
      Utils.centerText(Constants.WINDOW_WIDTH / 2, this.level2TipText)
    }
    this.displayCurrTipForIndex()
  }

  displayCurrTipForIndex() {
    const tipTextList = [this.level1TipText, this.level2TipText]
    const tipToShow = tipTextList[this.currTipIndex]
    tipToShow.setVisible(true)
    const tipsToHide = tipTextList.filter((_, index) => {
      return index !== this.currTipIndex
    })
    tipsToHide.forEach((tip) => tip.setVisible(false))
  }

  setupNavButtons(position: { x: number; y: number }) {
    this.leftCarat = this.scene.add
      .sprite(15, position.y + 30, 'angle-left-solid')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setScale(0.1)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.leftCarat.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.leftCarat.setAlpha(1)
        this.currTipIndex = Math.max(0, this.currTipIndex - 1)
        this.displayCurrTipForIndex()
      })
      .setOrigin(0)
    this.rightCarat = this.scene.add
      .sprite(Constants.WINDOW_WIDTH - 15, this.leftCarat.y, 'angle-right-solid')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setScale(0.1)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.rightCarat.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.rightCarat.setAlpha(1)
        this.currTipIndex = Math.min(1, this.currTipIndex + 1)
        this.displayCurrTipForIndex()
      })
      .setOrigin(1, 0)
  }

  setVisible(isVisible: boolean) {
    if (!isVisible) {
      this.level1TipText.setVisible(isVisible)
      this.level2TipText.setVisible(isVisible)
    }
    this.leftCarat.setVisible(isVisible)
    this.rightCarat.setVisible(isVisible)
  }
}
