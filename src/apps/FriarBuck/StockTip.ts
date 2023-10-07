import { Home } from '~/scenes/Home'
import { TipContent, TipUpdate } from './FriarBuckConstants'
import { StockTipLevel } from '../../content/FriarBuck/StockTipLevel'
import { Constants } from '~/utils/Constants'
import { STOCK_KNOWLEDGE_GRADE_TO_TIP_COST } from '~/content/FriarBuck/StockTipCost'
import { Button } from '~/core/Button'
import { Save, SaveKeys } from '~/utils/Save'
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

  private purchaseTipButton!: Button
  private level1TipText!: Phaser.GameObjects.Text
  private level2TipText!: Phaser.GameObjects.Text
  private currTipIndex: number = 0
  private tipUpdate!: TipUpdate

  private scene: Home

  constructor(scene: Home, config: StockTipConfig) {
    this.scene = scene
    this.setupTips(config.position)
    this.setupNavButtons(config.position)
    this.setupPurchaseTipButton()
    this.setVisible(false)
  }

  setupTips(position: { x: number; y: number }) {
    this.level1TipText = this.scene.add
      .text(position.x, position.y, '', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.level2TipText = this.scene.add
      .text(position.x, position.y, '', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupPurchaseTipButton() {
    this.purchaseTipButton = new Button({
      scene: this.scene,
      onClick: () => {
        this.purchaseTip()
      },
      width: Constants.WINDOW_WIDTH - 30,
      x: Constants.WINDOW_WIDTH / 2,
      y: this.level1TipText.y + 10,
      text: '',
      height: 35,
      fontFamily: Constants.FONT_REGULAR,
      fontSize: '22px',
      backgroundColor: 0xdddddd,
      depth: Constants.SORT_LAYERS.APP_UI,
      textColor: 'black',
    })
  }

  purchaseTip() {
    const tipPurchaseCost =
      STOCK_KNOWLEDGE_GRADE_TO_TIP_COST[this.tipUpdate.knowledgeReqForUnlock][this.currTipIndex]
    const currBankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
    if (currBankBalance >= tipPurchaseCost) {
      this.tipUpdate.tipContent[this.currTipIndex].purchased = true
      this.displayCurrTipForIndex()

      const symbolToPurchase = this.tipUpdate.symbol
      const tips = Save.getData(SaveKeys.FRIAR_BUCK_STOCK_TIPS)
      tips[symbolToPurchase] = {
        ...tips[symbolToPurchase],
        [this.currTipIndex as StockTipLevel]: {
          ...tips[symbolToPurchase][this.currTipIndex as StockTipLevel],
          purchased: true,
        },
      }

      Utils.addTransaction(this.scene, tipPurchaseCost, 'Friar Buck, Inc.', false)
      Save.setData(SaveKeys.FRIAR_BUCK_STOCK_TIPS, tips)
    }
  }

  updateTipContent(tipUpdate: TipUpdate) {
    this.tipUpdate = tipUpdate
    const tipContent = tipUpdate.tipContent

    this.level1TipText
      .setText(`Recommended action: ${tipContent[StockTipLevel.LEVEL_1].value}`)
      .setColor('#000000')
      .setPosition(15, this.level1TipText.y)

    const pctChange = tipContent[StockTipLevel.LEVEL_2].value
    this.level2TipText
      .setText(
        `Predicted Change: ${
          pctChange > 0 ? `+${Math.abs(pctChange)}%` : `-${Math.abs(pctChange)}%`
        }`
      )
      .setColor('#000000')
      .setPosition(15, this.level2TipText.y)

    this.displayCurrTipForIndex()
  }

  displayCurrTipForIndex() {
    const tipTextList = [this.level1TipText, this.level2TipText]
    const tipToShow = tipTextList[this.currTipIndex]

    if (this.tipUpdate.tipContent[this.currTipIndex as StockTipLevel].purchased) {
      tipToShow.setVisible(true)
      this.purchaseTipButton.setVisible(false)
    } else {
      const tipCostMappings =
        STOCK_KNOWLEDGE_GRADE_TO_TIP_COST[this.tipUpdate.knowledgeReqForUnlock]
      const tipCost = tipCostMappings[this.currTipIndex as StockTipLevel]
      const currBankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
      if (currBankBalance < tipCost) {
        this.purchaseTipButton.text.setColor('red')
        this.purchaseTipButton.setText(
          `Buy Level ${this.currTipIndex + 1} Tip for $${tipCost.toFixed(
            2
          )} (bank balance: $${currBankBalance.toFixed(2)})`
        )
      } else {
        this.purchaseTipButton.text.setColor('black')
        this.purchaseTipButton.setText(
          `Buy Level ${this.currTipIndex + 1} Tip for $${tipCost.toFixed(2)}`
        )
      }

      this.purchaseTipButton.setVisible(true)
    }
    const tipsToHide = tipTextList.filter((_, index) => {
      return index !== this.currTipIndex
    })
    tipsToHide.forEach((tip) => tip.setVisible(false))
  }

  setupNavButtons(position: { x: number; y: number }) {
    this.leftCarat = this.scene.add
      .sprite(15, position.y + 35, 'angle-left-solid')
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
      this.purchaseTipButton.setVisible(isVisible)
    }
    this.leftCarat.setVisible(isVisible)
    this.rightCarat.setVisible(isVisible)
  }
}
