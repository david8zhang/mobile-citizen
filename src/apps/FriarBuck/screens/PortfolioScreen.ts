import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FriarBuck } from '../FriarBuck'
import { Chart } from '../Chart'
import { Constants } from '~/utils/Constants'
import { PortfolioStockList } from '../web-ui/PortfolioStockList'
import { Save, SaveKeys } from '~/utils/Save'
import { PortfolioType, Stock, StockPrices } from '../FriarBuckConstants'
import { INITIAL_STOCK_PRICES, STOCKS, StockSymbols } from '~/content/FriarBuckStocks'
import { Utils } from '~/utils/Utils'

export class PortfolioScreen extends SubScreen {
  private chart!: Chart
  private headerText!: Phaser.GameObjects.Text
  private buyingPowerLabel!: Phaser.GameObjects.Text
  private buyingPowerValue!: Phaser.GameObjects.Text
  private portfolioValue!: Phaser.GameObjects.Text
  private portfolioStockList!: Phaser.GameObjects.DOMElement
  private portfolioDividerLine!: Phaser.GameObjects.Line

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupHeader()
    this.setupPortfolioChart()
    this.setupBuyingPower()
    this.setupPortfolio()
    this.setVisible(false)
  }

  setupHeader() {
    this.headerText = this.scene.add
      .text(20, Constants.TOP_BAR_HEIGHT + 20, 'Investing', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.portfolioValue = this.scene.add
      .text(20, this.headerText.y + this.headerText.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setupBuyingPower() {
    this.buyingPowerLabel = this.scene.add
      .text(15, this.chart.y + this.chart.displayHeight + 20, 'Buying Power', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)

    const buyingPower = Save.getData(SaveKeys.FRIAR_BUCK_BUYING_POWER) as number
    this.buyingPowerValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 15,
        this.chart.y + this.chart.displayHeight + 20,
        `$${buyingPower.toFixed(2)}`,
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)
  }

  setupPortfolioChart() {
    this.chart = new Chart(this.scene, {
      data: [],
      position: {
        x: 15,
        y: this.portfolioValue.y + this.portfolioValue.displayHeight + 10,
      },
      width: Constants.WINDOW_WIDTH - 15,
      height: 175,
    })
  }

  updatePortfolioValue() {
    const portfolioStocks = Save.getData(SaveKeys.PORTFOLIO, {}) as PortfolioType
    const priceMappingPerDay = Save.getData(
      SaveKeys.STOCK_PRICES,
      INITIAL_STOCK_PRICES
    ) as StockPrices
    const priceForCurrDay = priceMappingPerDay[Utils.getCurrDayKey()]
    const totalPortfolioValue = Object.keys(portfolioStocks)
      .reduce((acc, curr) => {
        return acc + priceForCurrDay[curr] * portfolioStocks[curr]
      }, 0)
      .toFixed(2)
    this.portfolioValue.setText(`$${totalPortfolioValue}`)
  }

  getPortfolioList() {
    const stocks: { [key: string]: Stock } = STOCKS.reduce((acc, curr) => {
      acc[curr.symbol] = curr
      return acc
    }, {})
    const portfolioStocks = Save.getData(SaveKeys.PORTFOLIO, {}) as PortfolioType
    const priceMappingPerDay = Save.getData(
      SaveKeys.STOCK_PRICES,
      INITIAL_STOCK_PRICES
    ) as StockPrices
    return Object.keys(portfolioStocks).map((symbol) => {
      const totalHoldingsValue =
        portfolioStocks[symbol] * priceMappingPerDay[Utils.getCurrDayKey()][symbol]
      return {
        symbol,
        name: stocks[symbol].name,
        price: totalHoldingsValue.toFixed(2),
      }
    })
  }

  setupPortfolio() {
    const yPos = this.buyingPowerLabel.y + this.buyingPowerLabel.displayHeight + 15
    this.portfolioDividerLine = this.scene.add
      .line(0, 0, 0, yPos, Constants.WINDOW_WIDTH, yPos, 0x777777)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    const portfolioStockList = this.getPortfolioList()
    const portfolioElem = PortfolioStockList(portfolioStockList, Constants.WINDOW_WIDTH, 290)
    this.portfolioStockList = this.scene.add
      .dom(0, yPos + 25, portfolioElem)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  updatePortfolioChart() {
    if (this.chart) {
      this.chart.destroy()
    }
    this.chart = new Chart(this.scene, {
      data: [],
      position: {
        x: 15,
        y: this.portfolioValue.y + this.portfolioValue.displayHeight + 10,
      },
      width: Constants.WINDOW_WIDTH - 15,
      height: 175,
    })
  }

  public onRender(data?: any): void {
    this.updatePortfolioValue()
    this.updatePortfolioChart()
  }

  public setVisible(isVisible: boolean): void {
    this.portfolioStockList.setVisible(isVisible)
    this.portfolioDividerLine.setVisible(isVisible)
    this.portfolioValue.setVisible(isVisible)
    this.chart.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
    this.buyingPowerLabel.setVisible(isVisible)
    this.buyingPowerValue.setVisible(isVisible)
  }
}
