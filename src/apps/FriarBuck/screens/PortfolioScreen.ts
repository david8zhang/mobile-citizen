import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FriarBuck } from '../FriarBuck'
import { Chart } from '../Chart'
import { Constants } from '~/utils/Constants'
import { StockList } from '../web-ui/StockList'
import { Save, SaveKeys } from '~/utils/Save'
import { INITIAL_STOCK_PRICES, PortfolioType, Stock, StockPrices } from '../FriarBuckConstants'
import { STOCKS } from '~/content/FriarBuck/FriarBuckStocks'
import { Utils } from '~/utils/Utils'
import { FB_ScreenTypes } from '../FBscreenTypes'

export class PortfolioScreen extends SubScreen {
  private chart!: Chart
  private headerText!: Phaser.GameObjects.Text
  private portfolioValue!: Phaser.GameObjects.Text
  private portfolioStockList!: Phaser.GameObjects.DOMElement
  private portfolioDividerLine!: Phaser.GameObjects.Line
  private dailyGrowthLabel!: Phaser.GameObjects.Text
  private totalGrowthLabel!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupHeader()
    this.setupGrowthLabels()
    this.setupPortfolioChart()
    this.setupPortfolioDividerLine()
    this.updatePortfolioStockList()
    this.setVisible(false)
  }

  setupPortfolioDividerLine() {
    const yPos = this.chart.y + this.chart.displayHeight + 15
    this.portfolioDividerLine = this.scene.add
      .line(0, 0, 0, yPos, Constants.WINDOW_WIDTH, yPos, 0x777777)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setupHeader() {
    this.headerText = this.scene.add
      .text(20, Constants.TOP_BAR_HEIGHT + 20, 'Investing', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.portfolioValue = this.scene.add
      .text(20, this.headerText.y + this.headerText.displayHeight + 15, '', {
        fontSize: '50px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setupGrowthLabels() {
    this.dailyGrowthLabel = this.scene.add
      .text(20, this.portfolioValue.y + this.portfolioValue.displayHeight + 15, 'Daily growth: ', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.totalGrowthLabel = this.scene.add
      .text(
        this.dailyGrowthLabel.x + this.dailyGrowthLabel.displayWidth + 15,
        this.dailyGrowthLabel.y,
        'Total growth: ',
        {
          fontSize: '22px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setupPortfolioChart() {
    this.chart = new Chart(this.scene, {
      data: [],
      position: {
        x: 15,
        y: this.dailyGrowthLabel.y + this.dailyGrowthLabel.displayHeight + 15,
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 175,
    })
  }

  getPortfolioValue(pricesForCurrDay) {
    if (!pricesForCurrDay) {
      return 0
    }
    const portfolioStocks = Save.getData(SaveKeys.PORTFOLIO, {}) as PortfolioType
    const totalPortfolioValue = Object.keys(portfolioStocks).reduce((acc, curr) => {
      return acc + pricesForCurrDay[curr] * portfolioStocks[curr].numShares
    }, 0)
    return totalPortfolioValue
  }

  updatePortfolioValue() {
    const priceMappingPerDay = Save.getData(
      SaveKeys.STOCK_PRICES,
      INITIAL_STOCK_PRICES
    ) as StockPrices
    const priceForCurrDay = priceMappingPerDay[Utils.getCurrDayKey()]
    const totalPortfolioValue = this.getPortfolioValue(priceForCurrDay)
    this.portfolioValue.setText(`$${totalPortfolioValue.toFixed(2)}`)
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
    const portfolioStockList: any[] = []
    Object.keys(portfolioStocks).forEach((symbol) => {
      if (portfolioStocks[symbol].numShares > 0) {
        const totalHoldingsValue =
          portfolioStocks[symbol].numShares * priceMappingPerDay[Utils.getCurrDayKey()][symbol]
        const stock = stocks[symbol]
        portfolioStockList.push({
          ...stock,
          symbol,
          name: stocks[symbol].name,
          price: totalHoldingsValue,
        })
      }
    })
    return portfolioStockList
  }

  updatePortfolioStockList() {
    if (this.portfolioStockList) {
      this.portfolioStockList.destroy()
    }
    const yPos = this.chart.y + this.chart.displayHeight + 15
    const portfolioStockList = this.getPortfolioList()
    const portfolioElem = StockList(
      'portfolio-stock-list',
      portfolioStockList,
      'Portfolio',
      Constants.WINDOW_WIDTH,
      280,
      (stock) => {
        const parent = this.parent as FriarBuck
        parent.renderSubscreen(FB_ScreenTypes.STOCK_DRILLDOWN, {
          stock,
          prevRoute: FB_ScreenTypes.PORTFOLIO,
        })
      }
    )
    this.portfolioStockList = this.scene.add
      .dom(0, yPos + 25, portfolioElem)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('portfolio-stock-list')
  }

  updateGrowthValue() {
    const currDay = Save.getData(SaveKeys.CURR_DATE)
    if (currDay > 0) {
      const stockPrices = Save.getData(SaveKeys.STOCK_PRICES, {})
      const prevDayPortfolioValue = this.getPortfolioValue(stockPrices[Utils.getPrevDayKey()])
      const currDayPortfolioValue = this.getPortfolioValue(stockPrices[Utils.getCurrDayKey()])
      const dailyGrowthValue = currDayPortfolioValue - prevDayPortfolioValue
      this.dailyGrowthLabel.setText(
        `Daily Growth: ${
          dailyGrowthValue >= 0
            ? `+$${dailyGrowthValue.toFixed(2)}`
            : `-$${Math.abs(dailyGrowthValue).toFixed(2)}`
        }`
      )
      this.totalGrowthLabel.setPosition(
        this.dailyGrowthLabel.x + this.dailyGrowthLabel.displayWidth + 15,
        this.totalGrowthLabel.y
      )

      let initialPortfolioValue = 0
      const portfolio = Save.getData(SaveKeys.PORTFOLIO, {}) as PortfolioType
      Object.keys(portfolio).forEach((symbol) => {
        if (portfolio[symbol].numShares > 0) {
          initialPortfolioValue += portfolio[symbol].numShares * portfolio[symbol].costBasis
        }
      })
      const totalGrowthValue = currDayPortfolioValue - initialPortfolioValue
      this.totalGrowthLabel.setText(
        `Total Growth: ${
          totalGrowthValue >= 0
            ? `+$${totalGrowthValue.toFixed(2)}`
            : `-$${Math.abs(totalGrowthValue).toFixed(2)}`
        }`
      )
    }
  }

  getPortfolioData() {
    const data: { x: number; y: number }[] = []
    const stockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    Object.keys(stockPrices).forEach((currDay, index) => {
      const pricesForDay = stockPrices[currDay]
      data.push({
        x: index,
        y: this.getPortfolioValue(pricesForDay),
      })
    })
    return data
  }

  updatePortfolioChart() {
    if (this.chart) {
      this.chart.destroy()
    }
    const portfolioData = this.getPortfolioData()
    this.chart = new Chart(this.scene, {
      data: portfolioData,
      position: {
        x: 15,
        y: this.dailyGrowthLabel.y + this.dailyGrowthLabel.displayHeight + 15,
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 175,
    })
  }

  public onRender(data?: any): void {
    this.updatePortfolioValue()
    this.updatePortfolioChart()
    this.updatePortfolioStockList()
    this.updateGrowthValue()
  }

  public setVisible(isVisible: boolean): void {
    this.portfolioStockList.setVisible(isVisible)
    this.portfolioDividerLine.setVisible(isVisible)
    this.portfolioValue.setVisible(isVisible)
    this.chart.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
    this.totalGrowthLabel.setVisible(isVisible)
    this.dailyGrowthLabel.setVisible(isVisible)
  }
}
