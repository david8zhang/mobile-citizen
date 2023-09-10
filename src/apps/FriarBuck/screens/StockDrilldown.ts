import { SubScreen } from '~/core/SubScreen'
import { FriarBuck } from '../FriarBuck'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { PortfolioType, Stock } from '../FriarBuckConstants'
import { FB_ScreenTypes } from '../FBscreenTypes'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'
import { INITIAL_STOCK_PRICES, VOLATILITY_THRESHOLDS } from '~/content/FriarBuckStocks'
import { Chart } from '../Chart'
import { Button } from '~/core/Button'

export class StockDrilldown extends SubScreen {
  private backButton!: Phaser.GameObjects.Sprite
  private stockSymbol!: Phaser.GameObjects.Text
  private stockName!: Phaser.GameObjects.Text
  private stockPrice!: Phaser.GameObjects.Text
  private stock: Stock | null = null
  private prevRoute: FB_ScreenTypes | null = null
  private chart!: Chart

  // Position info
  private positionLabel!: Phaser.GameObjects.Text
  private shareWorthLabel!: Phaser.GameObjects.Text
  private shareWorthValue!: Phaser.GameObjects.Text
  private numSharesOwnedLabel!: Phaser.GameObjects.Text
  private numSharesOwnedValue!: Phaser.GameObjects.Text
  private totalGrowthLabel!: Phaser.GameObjects.Text
  private totalGrowthValue!: Phaser.GameObjects.Text

  // Buy/Sell buttons
  private buyButton!: Button
  private sellButton!: Button

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupStockHeaderText()
    this.setupStockChart()
    this.setupPositionInfo()
    this.setupBuySellButtons()
    this.setVisible(false)
  }

  setupPositionInfo() {
    this.positionLabel = this.scene.add
      .text(15, this.chart.y + this.chart.displayHeight + 30, 'Position', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.shareWorthLabel = this.scene.add
      .text(
        15,
        this.positionLabel.y + this.positionLabel.displayHeight + 15,
        'Total Holdings Value',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.shareWorthValue = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.shareWorthLabel.y, '', {
        fontSize: '18px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.numSharesOwnedLabel = this.scene.add
      .text(
        15,
        this.shareWorthLabel.y + this.shareWorthLabel.displayHeight + 15,
        'Num Shares Owned',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.numSharesOwnedValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 15,
        this.shareWorthLabel.y + this.shareWorthLabel.displayHeight + 15,
        '',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.totalGrowthLabel = this.scene.add
      .text(
        15,
        this.numSharesOwnedLabel.y + this.numSharesOwnedLabel.displayHeight + 15,
        'Total Growth',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.totalGrowthValue = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.totalGrowthLabel.y, '', {
        fontSize: '18px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)
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

  setupBuySellButtons() {
    this.buyButton = new Button({
      scene: this.scene,
      width: Constants.WINDOW_WIDTH / 2 - 15,
      height: 50,
      textColor: 'black',
      fontFamily: 'Arial',
      fontSize: '20px',
      onClick: () => {
        const parent = this.parent as FriarBuck
        parent.renderSubscreen(FB_ScreenTypes.TRADE_STOCK, {
          isBuy: true,
          stock: this.stock,
        })
      },
      x: Constants.WINDOW_WIDTH * 0.25,
      y: this.numSharesOwnedLabel.y + this.numSharesOwnedLabel.displayHeight + 130,
      text: 'Buy',
      backgroundColor: 0xffffff,
      strokeColor: 0x000000,
      strokeWidth: 1,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
    this.sellButton = new Button({
      scene: this.scene,
      width: Constants.WINDOW_WIDTH / 2 - 15,
      height: 50,
      textColor: 'black',
      fontFamily: 'Arial',
      fontSize: '20px',
      onClick: () => {
        const parent = this.parent as FriarBuck
        parent.renderSubscreen(FB_ScreenTypes.TRADE_STOCK, {
          isBuy: false,
          stock: this.stock,
        })
      },
      backgroundColor: 0xffffff,
      strokeColor: 0x000000,
      strokeWidth: 1,
      x: Constants.WINDOW_WIDTH * 0.75,
      y: this.numSharesOwnedLabel.y + this.numSharesOwnedLabel.displayHeight + 130,
      text: 'Sell',
      depth: Constants.SORT_LAYERS.APP_UI,
    })
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
    this.positionLabel.setVisible(isVisible)
    this.numSharesOwnedLabel.setVisible(isVisible)
    this.numSharesOwnedValue.setVisible(isVisible)
    this.shareWorthLabel.setVisible(isVisible)
    this.shareWorthValue.setVisible(isVisible)
    this.buyButton.setVisible(isVisible)
    this.sellButton.setVisible(isVisible)
    this.totalGrowthLabel.setVisible(isVisible)
    this.totalGrowthValue.setVisible(isVisible)
  }

  updateStockInfo(stock: Stock) {
    const allStockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    const currDayStockPrices = allStockPrices[Utils.getCurrDayKey()]
    this.stockSymbol.setText(stock.symbol)
    this.stockName.setText(stock.name)
    this.stockPrice.setText(`$${currDayStockPrices[stock.symbol].toFixed(4)}`)
  }

  updateStockChart(stock: Stock) {
    if (this.chart) {
      this.chart.destroy()
    }
    const data: { x: number; y: number }[] = []
    let index = 0
    const stockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    Object.keys(stockPrices).forEach((dayKey: string) => {
      const stockPricesForDay = stockPrices[dayKey]
      data.push({
        x: index,
        y: stockPricesForDay[stock.symbol],
      })
    })
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

  updatePosition(stock: Stock) {
    const positions = Save.getData(SaveKeys.PORTFOLIO, {}) as PortfolioType
    const numSharesOwned = positions[stock.symbol] ? positions[stock.symbol].numShares : 0
    this.numSharesOwnedValue.setText(numSharesOwned)

    const currPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    const currPricesForDay = currPrices[Utils.getCurrDayKey()]
    const totalShareValue = numSharesOwned * currPricesForDay[stock.symbol]
    this.shareWorthValue.setText(`$${totalShareValue.toFixed(2)}`)

    if (positions[stock.symbol]) {
      const costBasis = positions[stock.symbol].costBasis * numSharesOwned
      const growthAmount = totalShareValue - costBasis
      this.totalGrowthValue.setText(
        `${
          growthAmount >= 0
            ? `+$${Math.abs(growthAmount).toFixed(2)}`
            : `-$${Math.abs(growthAmount).toFixed(2)}`
        }`
      )
    } else {
      this.totalGrowthValue.setText('+$0.00')
    }
  }

  public onRender(data?: any): void {
    this.stock = data.stock
    this.prevRoute = data.prevRoute
    this.updateStockInfo(data.stock)
    this.updateStockChart(data.stock)
    this.updatePosition(data.stock)
  }
}
