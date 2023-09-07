import { SubScreen } from '~/core/SubScreen'
import { FriarBuck } from '../FriarBuck'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Stock } from '../FriarBuckConstants'
import { FB_ScreenTypes } from '../FBscreenTypes'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'
import { INITIAL_STOCK_PRICES, VOLATILITY_THRESHOLDS } from '~/content/FriarBuckStocks'
import { Chart } from '../Chart'

export class StockDrilldown extends SubScreen {
  private backButton!: Phaser.GameObjects.Sprite
  private stockSymbol!: Phaser.GameObjects.Text
  private stockName!: Phaser.GameObjects.Text
  private stockPrice!: Phaser.GameObjects.Text
  private stock: Stock | null = null
  private prevRoute: FB_ScreenTypes | null = null
  private chart!: Chart

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupStockHeaderText()
    this.setupStockChart()
    this.setVisible(false)
  }

  setupStockHeaderText() {
    this.backButton = this.scene.add
      .sprite(20, Constants.TOP_BAR_HEIGHT + 18, 'angle-left-solid')
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
        Constants.TOP_BAR_HEIGHT + 20,
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
      .text(20, this.stockSymbol.y + this.stockSymbol.displayHeight + 30, '', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.stockPrice = this.scene.add
      .text(20, this.stockName.y + this.stockName.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  public setupStockChart() {
    this.chart = new Chart(this.scene, {
      data: [],
      position: {
        x: 15,
        y: this.stockPrice.y + this.stockPrice.displayHeight + 15,
      },
      width: Constants.WINDOW_WIDTH - 15,
      height: 200,
    })
  }

  public setVisible(isVisible: boolean): void {
    this.backButton.setVisible(isVisible)
    this.stockSymbol.setVisible(isVisible)
    this.stockName.setVisible(isVisible)
    this.stockPrice.setVisible(isVisible)
    this.chart.setVisible(isVisible)
  }

  updateStockInfo(stock: Stock) {
    const allStockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    const currDayStockPrices = allStockPrices[Utils.getCurrDayKey()]
    this.stockSymbol.setText(stock.symbol)
    this.stockName.setText(stock.name)
    this.stockPrice.setText(`$${currDayStockPrices[stock.symbol].toFixed(2)}`)
  }

  updateStockChart(stock: Stock) {
    if (this.chart) {
      this.chart.destroy()
    }
    const data: { x: number; y: number }[] = []
    let index = 0
    const stockPrices = Save.getData(SaveKeys.STOCK_PRICES)
    const volatility = VOLATILITY_THRESHOLDS[stock.knowledgeReqForUnlock]
    Object.keys(stockPrices).forEach((dayKey: string) => {
      const stockPricesForDay = stockPrices[dayKey]
      data.push({
        x: index,
        y: stockPricesForDay[stock.symbol],
      })
    })
    console.log(data)
    this.chart = new Chart(this.scene, {
      data,
      position: {
        x: 15,
        y: this.stockPrice.y + this.stockPrice.displayHeight + 30,
      },
      width: Constants.WINDOW_WIDTH - 15,
      height: 200,
    })
  }

  public onRender(data?: any): void {
    this.stock = data.stock
    this.prevRoute = data.prevRoute
    this.updateStockInfo(data.stock)
    this.updateStockChart(data.stock)
  }
}
