import { SubScreen } from '~/core/SubScreen'
import { FriarBuck } from '../FriarBuck'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Stock } from '../FriarBuckConstants'
import { FB_ScreenTypes } from '../FBscreenTypes'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'
import { INITIAL_STOCK_PRICES } from '~/content/FriarBuckStocks'

export class StockDrilldown extends SubScreen {
  private backButton!: Phaser.GameObjects.Sprite
  private stockSymbol!: Phaser.GameObjects.Text
  private stockName!: Phaser.GameObjects.Text
  private stockPrice!: Phaser.GameObjects.Text
  private stock: Stock | null = null
  private prevRoute: FB_ScreenTypes | null = null

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupStockHeaderText()
    this.setVisible(false)
  }

  setupStockHeaderText() {
    this.backButton = this.scene.add
      .sprite(15, Constants.TOP_BAR_HEIGHT + 12, 'angle-left-solid')
      .setScale(0.15)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.backButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.backButton.setAlpha(1)
        if (this.prevRoute) {
          const parent = this.parent as FriarBuck
          parent.renderSubscreen(this.prevRoute)
        }
      })
    this.stockSymbol = this.scene.add
      .text(
        this.backButton.x + this.backButton.displayWidth + 10,
        Constants.TOP_BAR_HEIGHT + 15,
        '',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)

    this.stockName = this.scene.add
      .text(15, this.stockSymbol.y + this.stockSymbol.displayHeight + 30, '', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.stockPrice = this.scene.add
      .text(15, this.stockName.y + this.stockName.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  public setVisible(isVisible: boolean): void {
    this.backButton.setVisible(isVisible)
    this.stockSymbol.setVisible(isVisible)
    this.stockName.setVisible(isVisible)
    this.stockPrice.setVisible(isVisible)
  }

  updateStockInfo(stock: Stock) {
    const allStockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    const currDayStockPrices = allStockPrices[Utils.getCurrDayKey()]
    this.stockSymbol.setText(stock.symbol)
    this.stockName.setText(stock.name)
    this.stockPrice.setText(`$${currDayStockPrices[stock.symbol].toFixed(2)}`)
  }

  public onRender(data?: any): void {
    this.stock = data.stock
    this.prevRoute = data.prevRoute
    this.updateStockInfo(data.stock)
  }
}
