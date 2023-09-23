import { Home } from '~/scenes/Home'
import { App } from '../App'
import { BottomNav } from '~/core/BottomNav'
import { FB_ScreenTypes } from './FBscreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { PortfolioScreen } from './screens/PortfolioScreen'
import { Browse } from './screens/Browse'
import { StockDrilldown } from './screens/StockDrilldown'
import { Save, SaveKeys } from '~/utils/Save'
import { STOCKS, StockSymbols, VOLATILITY_THRESHOLDS } from '~/content/FriarBuck/FriarBuckStocks'
import { Utils } from '~/utils/Utils'
import {
  INITIAL_NEWS_COOLDOWNS,
  INITIAL_STOCK_PRICES,
  NEWS_COOLDOWN,
  RecommendedAction,
  Stock,
  StockPrices,
  StockTips,
  TipContent,
} from './FriarBuckConstants'
import { StockTipLevel } from '../../content/FriarBuck/StockTipLevel'
import { TradeStockScreen } from './screens/TradeStockScreen'
import { NewsScreen } from './screens/NewsScreen'
import { NEWS_TEMPLATES, NewsType } from '~/content/FriarBuck/FriarBuckNewsTemplates'

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
    }
    this.setupBottomNav()
    this.setVisible(false)
    this.scene.onProgressDayCallbacks.push(() => {
      this.updateStockPrices()
    })
    this.generateStockNewsAndTips()
  }

  getNewsTypeForProjectedChange(
    projectedChange: number,
    volatilityThreshold: { high: number; low: number }
  ) {
    let pctOfMaxChange = 0
    if (projectedChange < 0) {
      pctOfMaxChange = projectedChange / volatilityThreshold.low
    } else {
      pctOfMaxChange = projectedChange / volatilityThreshold.high
    }
    pctOfMaxChange *= 100
    if (pctOfMaxChange >= 50) {
      return projectedChange > 0 ? NewsType.VERY_BULLISH : NewsType.VERY_BEARISH
    }
    if (pctOfMaxChange >= 25 && pctOfMaxChange < 50) {
      return projectedChange > 0 ? NewsType.BULLISH : NewsType.BEARISH
    }
    if (pctOfMaxChange < 25) {
      return NewsType.NEUTRAL
    }
  }

  generateStoryForSymbol(
    symbol: StockSymbols,
    projectedChange: number,
    volatilityThreshold: { high: number; low: number }
  ) {
    const newsType = this.getNewsTypeForProjectedChange(projectedChange, volatilityThreshold)
    if (NEWS_TEMPLATES[symbol]) {
      const storiesToSelect = NEWS_TEMPLATES[symbol]![newsType!]
      return storiesToSelect[Phaser.Math.Between(0, storiesToSelect.length - 1)]
    }
    return null
  }

  generateTipContent(stock: Stock): TipContent {
    const buyOrSell =
      Phaser.Math.Between(0, 1) == 0 ? RecommendedAction.BUY : RecommendedAction.SELL
    const volatilityThreshold = VOLATILITY_THRESHOLDS[stock.knowledgeReqForUnlock]
    const pctChange =
      buyOrSell === RecommendedAction.BUY
        ? Phaser.Math.Between(1, volatilityThreshold.high * 100)
        : Phaser.Math.Between(volatilityThreshold.low * 100, -1)
    return {
      [StockTipLevel.LEVEL_1]: {
        value: buyOrSell,
        purchased: false,
      },
      [StockTipLevel.LEVEL_2]: {
        value: pctChange / 100,
        purchased: false,
      },
      dateKey: Utils.getCurrDayKey(),
    }
  }

  shouldGenerateNewTips() {
    const currStockTips = Save.getData(SaveKeys.FRIAR_BUCK_STOCK_TIPS, {})
    return (
      Object.keys(currStockTips).length == 0 ||
      (Object.values(currStockTips)[0] as TipContent).dateKey !== Utils.getCurrDayKey()
    )
  }

  generateStockNewsAndTips() {
    if (!this.shouldGenerateNewTips()) {
      return
    }

    // Generate Tips for every stock
    const stockTips = STOCKS.reduce((acc, curr) => {
      acc[curr.symbol] = this.generateTipContent(curr)
      return acc
    }, {})
    const symbolToStockMapping = STOCKS.reduce((acc, curr) => {
      acc[curr.symbol] = curr
      return acc
    }, {})

    // Generate News Based on Tips
    const newsCooldowns = Save.getData(SaveKeys.FRIAR_BUCK_NEWS_COOLDOWN, INITIAL_NEWS_COOLDOWNS)
    const stockSymbolsSortedByNewsRecency = Object.keys(newsCooldowns).sort((a, b) => {
      const cooldownA = newsCooldowns[a]
      const cooldownB = newsCooldowns[b]
      if (cooldownA === cooldownB) {
        return Phaser.Math.Between(0, 1) == 0 ? -1 : 1
      }
      return cooldownB - cooldownA
    })
    const symbolsToGenerateStoriesFor = stockSymbolsSortedByNewsRecency.slice(0, 5)
    const newsStoriesForCurrDate = {}
    symbolsToGenerateStoriesFor.forEach((symbol) => {
      const volatilityThreshold =
        VOLATILITY_THRESHOLDS[symbolToStockMapping[symbol].knowledgeReqForUnlock]
      const projectedChange = stockTips[symbol][StockTipLevel.LEVEL_2].value
      const story = this.generateStoryForSymbol(
        symbol as StockSymbols,
        projectedChange,
        volatilityThreshold
      )
      if (story) {
        newsStoriesForCurrDate[symbol] = story
        newsCooldowns[symbol] = NEWS_COOLDOWN
      }
    })

    // Update tips, news, and cooldowns
    Save.setData(SaveKeys.FRIAR_BUCK_STOCK_TIPS, stockTips)
    Save.setData(SaveKeys.FRIAR_BUCK_NEWS_STORIES, newsStoriesForCurrDate)
    Object.keys(newsCooldowns).forEach((key) => {
      if (!symbolsToGenerateStoriesFor.includes(key)) {
        newsCooldowns[key] = Math.max(newsCooldowns[key] - 1, 0)
      }
    })
    Save.setData(SaveKeys.FRIAR_BUCK_NEWS_COOLDOWN, newsCooldowns)
  }

  updateStockPrices() {
    const stockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES) as StockPrices
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
        pctChange = stockTip[StockTipLevel.LEVEL_2].value / 100
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
        this.generateStockNewsAndTips()
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
