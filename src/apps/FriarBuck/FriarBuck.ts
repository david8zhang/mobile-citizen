import { Home } from '~/scenes/Home'
import { App } from '../App'
import { BottomNav } from '~/core/BottomNav'
import { FB_ScreenTypes } from './FBscreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { PortfolioScreen } from './screens/PortfolioScreen'
import { Browse } from './screens/Browse'
import { StockDrilldown } from './screens/StockDrilldown'
import { Save, SaveKeys } from '~/utils/Save'
import { INITIAL_STOCK_PRICES, STOCKS, VOLATILITY_THRESHOLDS } from '~/content/FriarBuckStocks'
import { Utils } from '~/utils/Utils'
import { Stock, StockTipLevel, StockTips } from './FriarBuckConstants'
import { TradeStockScreen } from './screens/TradeStockScreen'
import { NewsScreen } from './screens/NewsScreen'
import { FullArticleScreen } from './screens/FullArticleScreen'

export class FriarBuck extends App {
  private bottomNav!: BottomNav
  private currSubscreen: FB_ScreenTypes = FB_ScreenTypes.PORTFOLIO
  private screenMappings!: {
    [key in FB_ScreenTypes]?: SubScreen
  }

  constructor(scene: Home) {
    super(scene)
    this.screenMappings = {
      [FB_ScreenTypes.PORTFOLIO]: new PortfolioScreen(this.scene, this),
      [FB_ScreenTypes.BROWSE]: new Browse(this.scene, this),
      [FB_ScreenTypes.STOCK_DRILLDOWN]: new StockDrilldown(this.scene, this),
      [FB_ScreenTypes.TRADE_STOCK]: new TradeStockScreen(this.scene, this),
      [FB_ScreenTypes.NEWS]: new NewsScreen(this.scene, this),
      [FB_ScreenTypes.FULL_ARTICLE]: new FullArticleScreen(this.scene, this),
    }
    this.setupBottomNav()
    this.setVisible(false)
    this.scene.onProgressDayCallbacks.push(() => {
      this.updateStockPrices()
    })
  }

  updateStockPrices() {
    const stockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    const symbolToStockMapping = STOCKS.reduce((acc, curr) => {
      acc[curr.symbol] = curr
      return acc
    }, {}) as {
      [key: string]: Stock
    }
    const stockPricesForCurrDay = stockPrices[Utils.getPrevDayKey()]
    const newStockPrices = {}
    const stockTips = Save.getData(SaveKeys.FRIAR_BUCK_STOCK_TIPS) as StockTips
    Object.keys(stockPricesForCurrDay).forEach((symbol: string) => {
      const price = stockPricesForCurrDay[symbol]
      const stock = symbolToStockMapping[symbol]
      let pctChange = 0
      const stockTip = stockTips[symbol]
      if (stockTip) {
        pctChange = stockTip[StockTipLevel.LEVEL_2] / 100
      } else {
        const volatilityRange = VOLATILITY_THRESHOLDS[stock.knowledgeReqForUnlock]
        pctChange = Phaser.Math.Between(volatilityRange.low, volatilityRange.high) / 100
      }
      newStockPrices[symbol] = price + price * pctChange
    })
    const nextDayKey = Utils.getCurrDayKey()
    stockPrices[nextDayKey] = newStockPrices
    Save.setData(SaveKeys.STOCK_PRICES, stockPrices)
  }

  setupBottomNav() {
    this.bottomNav = new BottomNav(this.scene, {
      options: [
        {
          navOption: 'Portfolio',
          iconTexture: 'chart-line-solid',
          route: FB_ScreenTypes.PORTFOLIO,
        },
        {
          navOption: 'Browse',
          iconTexture: 'list-solid',
          route: FB_ScreenTypes.BROWSE,
        },
        {
          navOption: 'News',
          iconTexture: 'newspaper-solid',
          route: FB_ScreenTypes.NEWS,
        },
      ],
      onRoute: (screen: FB_ScreenTypes) => {
        this.renderSubscreen(screen)
      },
    })
  }

  renderSubscreen(newSubscreen: FB_ScreenTypes, data?: any) {
    if (this.currSubscreen !== newSubscreen) {
      const prevSubscreen = this.screenMappings[this.currSubscreen]
      if (prevSubscreen) {
        prevSubscreen.onHide()
        prevSubscreen.setVisible(false)
      }
    }
    this.currSubscreen = newSubscreen
    const subscreen = this.screenMappings[newSubscreen]
    if (subscreen) {
      subscreen.setVisible(true)
      subscreen.onRender(data)
    }
  }

  hideSubscreen() {
    const subscreen = this.screenMappings[this.currSubscreen]
    if (subscreen) {
      subscreen.setVisible(false)
    }
  }

  public render(onComplete?: Function): void {
    super.render(() => {
      if (onComplete) {
        this.renderSubscreen(FB_ScreenTypes.PORTFOLIO)
        onComplete()
      }
    })
  }

  public onHide(onComplete: Function): void {
    this.hideSubscreen()
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public setVisible(isVisible: boolean): void {
    this.bottomNav.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
