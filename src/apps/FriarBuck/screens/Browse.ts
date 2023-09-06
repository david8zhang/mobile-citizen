import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FriarBuck } from '../FriarBuck'
import { INITIAL_STOCK_PRICES, STOCKS } from '~/content/FriarBuckStocks'
import { Save, SaveKeys } from '~/utils/Save'
import { StockPrices } from '../FriarBuckConstants'
import { Utils } from '~/utils/Utils'
import { Constants } from '~/utils/Constants'
import { StockList } from '../web-ui/StockList'
import { FB_ScreenTypes } from '../FBscreenTypes'

export class Browse extends SubScreen {
  private stockList!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
  }
  public renderStockList() {
    if (this.stockList) {
      this.stockList.destroy()
    }
    const stockPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES) as StockPrices
    const knowledgeLevel = Utils.getKnowledgeGrade()
    const stockPricesForCurrDay = stockPrices[Utils.getCurrDayKey()]
    const stockList: any[] = []
    STOCKS.forEach((stock) => {
      if (Utils.getGradeIndex(stock.knowledgeReqForUnlock) <= Utils.getGradeIndex(knowledgeLevel)) {
        const stockToRender = {
          name: stock.name,
          symbol: stock.symbol,
          price: stockPricesForCurrDay[stock.symbol],
        }
        stockList.push(stockToRender)
      }
    })
    const stockListElem = StockList(
      'discover-stock-list',
      stockList,
      'Discover',
      Constants.WINDOW_WIDTH,
      600,
      (stock) => {
        const parent = this.parent as FriarBuck
        parent.renderSubscreen(FB_ScreenTypes.STOCK_DRILLDOWN, {
          stock,
          prevRoute: FB_ScreenTypes.BROWSE,
        })
      }
    )
    this.stockList = this.scene.add
      .dom(0, Constants.TOP_BAR_HEIGHT + 30, stockListElem)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('discover-stock-list')
  }

  public onRender(data?: any): void {
    this.renderStockList()
  }

  public setVisible(isVisible: boolean): void {
    if (this.stockList) {
      this.stockList.setVisible(isVisible)
    }
  }
}
