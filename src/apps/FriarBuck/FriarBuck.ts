import { Home } from '~/scenes/Home'
import { App } from '../App'
import { Constants } from '~/utils/Constants'
import { PortfolioStockList } from './web-ui/PortfolioStockList'
import { Save, SaveKeys } from '~/utils/Save'
import { Portfolio, Stock, StockPrices } from './FriarBuckConstants'
import { Utils } from '~/utils/Utils'
import { Chart } from './Chart'
import { INITIAL_STOCK_PRICES, STOCKS, StockSymbols } from '~/content/FriarBuckStocks'

export class FriarBuck extends App {
  private chart!: Chart
  private headerText!: Phaser.GameObjects.Text
  private buyingPowerLabel!: Phaser.GameObjects.Text
  private buyingPowerValue!: Phaser.GameObjects.Text
  private portfolioValue!: Phaser.GameObjects.Text
  private portfolioStockList!: Phaser.GameObjects.DOMElement
  private portfolioDividerLine!: Phaser.GameObjects.Line

  constructor(scene: Home) {
    super(scene)
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
      .text(15, this.chart.y + this.chart.displayHeight + 30, 'Buying Power', {
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
        this.chart.y + this.chart.displayHeight + 30,
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
      data: [
        { x: 0, y: 50 },
        { x: 1, y: 100 },
        { x: 2, y: 25 },
        { x: 3, y: 40 },
        { x: 4, y: 100 },
        { x: 5, y: 120 },
        { x: 6, y: 120 },
        { x: 7, y: 500 },
        { x: 8, y: 1000 },
      ],
      position: {
        x: 15,
        y: this.portfolioValue.y + this.portfolioValue.displayHeight + 10,
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 200,
    })
  }

  updatePortfolioValue() {
    const defaultPortfolio: Portfolio = {
      [StockSymbols.CC]: 10,
      [StockSymbols.NILE]: 5,
      [StockSymbols.DASH]: 5,
    }
    const portfolioStocks = Save.getData(SaveKeys.PORTFOLIO, defaultPortfolio) as Portfolio
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

    const defaultPortfolio: Portfolio = {
      [StockSymbols.CC]: 10,
      [StockSymbols.NILE]: 5,
      [StockSymbols.DASH]: 5,
    }

    const portfolioStocks = Save.getData(SaveKeys.PORTFOLIO, defaultPortfolio) as Portfolio
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
    const portfolioElem = PortfolioStockList(portfolioStockList, Constants.WINDOW_WIDTH, 350)
    this.portfolioStockList = this.scene.add
      .dom(0, yPos + 30, portfolioElem)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  updatePortfolioChart() {
    if (this.chart) {
      this.chart.destroy()
    }
    this.chart = new Chart(this.scene, {
      data: [
        { x: 0, y: 50 },
        { x: 1, y: 100 },
        { x: 2, y: 25 },
        { x: 3, y: 40 },
        { x: 4, y: 100 },
        { x: 5, y: 120 },
        { x: 6, y: 120 },
        { x: 7, y: 500 },
        { x: 8, y: 1000 },
      ],
      position: {
        x: 15,
        y: this.portfolioValue.y + this.portfolioValue.displayHeight + 10,
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 200,
    })
  }

  public render(onComplete?: Function): void {
    super.render(() => {
      this.updatePortfolioValue()
      this.updatePortfolioChart()
      if (onComplete) {
        onComplete()
      }
    })
  }

  public onHide(onComplete: Function): void {
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public setVisible(isVisible: boolean): void {
    this.portfolioStockList.setVisible(isVisible)
    this.portfolioDividerLine.setVisible(isVisible)
    this.chart.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
    this.buyingPowerLabel.setVisible(isVisible)
    this.buyingPowerValue.setVisible(isVisible)
  }
}
