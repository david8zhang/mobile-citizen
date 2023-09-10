import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FriarBuck } from '../FriarBuck'
import { PortfolioStock, PortfolioType, Stock } from '../FriarBuckConstants'
import { Constants } from '~/utils/Constants'
import { FB_ScreenTypes } from '../FBscreenTypes'
import { NumSharesInput } from '../web-ui/NumSharesInput'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'
import { INITIAL_STOCK_PRICES } from '~/content/FriarBuckStocks'
import { Button } from '~/core/Button'

export class TradeStockScreen extends SubScreen {
  private headerText!: Phaser.GameObjects.Text
  private backButton!: Phaser.GameObjects.Sprite
  private formInput!: Phaser.GameObjects.DOMElement
  private formInputElement!: HTMLElement
  private stock!: Stock
  private isBuy: boolean = false

  private sharesToTradeLabel!: Phaser.GameObjects.Text
  private sharesToTradeValue!: Phaser.GameObjects.Text
  private marketPriceLabel!: Phaser.GameObjects.Text
  private marketPriceValue!: Phaser.GameObjects.Text
  private remainingBalanceLabel!: Phaser.GameObjects.Text
  private remainingBalanceValue!: Phaser.GameObjects.Text
  private confirmButton!: Button

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupHeader()
    this.setupFormInput()
    this.setupTradeInfo()
    this.setupConfirmButton()
    this.setVisible(false)
  }

  setupConfirmButton() {
    this.confirmButton = new Button({
      scene: this.scene,
      onClick: () => {
        this.confirmTrade()
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 50,
      textColor: 'black',
      fontSize: '20px',
      fontFamily: 'Arial',
      x: Constants.WINDOW_WIDTH / 2,
      y: this.remainingBalanceLabel.y + this.remainingBalanceLabel.displayHeight + 50,
      text: 'Confirm',
      depth: Constants.SORT_LAYERS.APP_UI,
      strokeColor: 0x000000,
      strokeWidth: 1,
      backgroundColor: 0xffffff,
    })
  }

  getAverageCostBasis(amountToTrade: number, currStockPrice: number, portfolio: PortfolioType) {
    const portfolioStockData = portfolio[this.stock.symbol]
    if (portfolioStockData) {
      const oldTotalCost = portfolioStockData.numShares * portfolioStockData.costBasis
      const newTotalCost = amountToTrade * currStockPrice
      return (oldTotalCost + newTotalCost) / (portfolioStockData.numShares + amountToTrade)
    }
    return currStockPrice
  }

  confirmTrade() {
    const amountToTrade = parseInt((this.formInputElement as any).value)
    if (amountToTrade > 0) {
      const currPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
      const currDayPrices = currPrices[Utils.getCurrDayKey()]
      const currStockPrice = currDayPrices[this.stock.symbol]
      const portfolio = Save.getData(SaveKeys.PORTFOLIO, {}) as PortfolioType
      const portfolioStockData = portfolio[this.stock.symbol] as PortfolioStock
      if (this.isBuy) {
        const bankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
        const totalAmountToPurchase = amountToTrade * currStockPrice
        if (totalAmountToPurchase <= bankBalance) {
          Utils.addTransaction(totalAmountToPurchase, 'Friar Buck, Inc.', false)
          const averageCostBasis = this.getAverageCostBasis(
            amountToTrade,
            currStockPrice,
            portfolio
          )
          const numSharesAfter =
            amountToTrade + (portfolioStockData ? portfolioStockData.numShares : 0)
          portfolio[this.stock.symbol] = {
            numShares: numSharesAfter,
            costBasis: averageCostBasis,
          }
        } else {
          // TODO: Show notification here about insufficient funds
          return
        }
      } else {
        Utils.addTransaction(amountToTrade * currStockPrice, 'Friar Buck, Inc.', true)
        portfolio[this.stock.symbol] = {
          numShares: (portfolioStockData ? portfolioStockData.numShares : 0) - amountToTrade,
          costBasis: portfolioStockData.costBasis,
        }
      }
      ;(this.formInputElement as any).value = 0
      Save.setData(SaveKeys.PORTFOLIO, portfolio)
      const parent = this.parent as FriarBuck
      parent.renderSubscreen(FB_ScreenTypes.STOCK_DRILLDOWN, {
        stock: this.stock,
        prevRoute: FB_ScreenTypes.BROWSE,
      })
    }
  }

  setupTradeInfo() {
    this.marketPriceLabel = this.scene.add
      .text(15, this.headerText.y + this.headerText.displayHeight + 115, 'Market Price', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.marketPriceValue = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.marketPriceLabel.y, '', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)

    this.sharesToTradeLabel = this.scene.add
      .text(15, this.marketPriceLabel.y + this.marketPriceLabel.displayHeight + 15, 'Share value', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.sharesToTradeValue = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.sharesToTradeLabel.y, '', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.remainingBalanceLabel = this.scene.add
      .text(
        15,
        this.sharesToTradeLabel.y + this.sharesToTradeLabel.displayHeight + 15,
        'Bank balance (after trade)',
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.remainingBalanceValue = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.remainingBalanceLabel.y, '', {
        fontSize: '20px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupHeader() {
    this.backButton = this.scene.add
      .sprite(15, Constants.TOP_BAR_HEIGHT + 30, 'angle-left-solid')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setScale(0.15)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.backButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.backButton.setAlpha(1)
        const parent = this.parent as FriarBuck
        parent.renderSubscreen(FB_ScreenTypes.STOCK_DRILLDOWN, {
          stock: this.stock,
          prevRoute: FB_ScreenTypes.BROWSE,
        })
      })
    this.headerText = this.scene.add
      .text(this.backButton.x + this.backButton.displayWidth + 15, this.backButton.y, '', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  setupFormInput() {
    this.formInputElement = NumSharesInput(
      {
        id: 'buy-or-sell-shares',
        placeholder: 0,
      },
      {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#eeeeee',
        border: '0px',
        fontSize: '40px',
        width: `${Constants.WINDOW_WIDTH - 30}`,
        outline: 'none',
      },
      () => {
        this.updateTradeInfo(this.stock)
      }
    )
    this.formInput = this.scene.add
      .dom(15, this.headerText.y + this.headerText.displayHeight + 15, this.formInputElement)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
  }

  public onRender(data?: any): void {
    this.stock = data.stock
    this.isBuy = data.isBuy
    const headerText = data.isBuy
      ? `Buy ${this.stock.symbol} Shares`
      : `Sell ${this.stock.symbol} Shares`
    this.headerText.setText(headerText)
    this.updateTradeInfo(this.stock)
  }

  updateTradeInfo(stock: Stock) {
    const currPrices = Save.getData(SaveKeys.STOCK_PRICES, INITIAL_STOCK_PRICES)
    const bankBalance = Save.getData(SaveKeys.BANK_BALANCE)
    const currDayPrices = currPrices[Utils.getCurrDayKey()]
    const currStockPrice = currDayPrices[stock.symbol]
    this.marketPriceValue.setText(`$${currStockPrice.toFixed(4)}`)
    let amountToTrade = parseInt((this.formInputElement as any).value, 10)
    if (this.isBuy) {
      const sharesToTradeValue = currStockPrice * (amountToTrade ? amountToTrade : 0)
      this.sharesToTradeValue.setText(`$${sharesToTradeValue.toFixed(2)}`)
      const remainingBankBalance = bankBalance - sharesToTradeValue
      this.remainingBalanceValue.setText(`$${remainingBankBalance.toFixed(2)}`)
      if (remainingBankBalance < 0) {
        this.remainingBalanceValue.setStyle({
          color: 'red',
        })
      } else {
        this.remainingBalanceValue.setStyle({
          color: 'black',
        })
      }
    } else {
      const portfolio = Save.getData(SaveKeys.PORTFOLIO, {})
      const stockData = portfolio[stock.symbol]
      if (!stockData || amountToTrade > stockData.numShares) {
        ;(this.formInputElement as any).value = stockData ? stockData.numShares : 0
        amountToTrade = stockData ? stockData.numShares : 0
      }
      const sharesToTradeValue = currStockPrice * (amountToTrade ? amountToTrade : 0)
      this.sharesToTradeValue.setText(`$${sharesToTradeValue.toFixed(2)}`)
      const remainingBankBalance = bankBalance + sharesToTradeValue
      this.remainingBalanceValue.setText(`$${remainingBankBalance.toFixed(2)}`)
    }
  }

  public setVisible(isVisible: boolean): void {
    this.backButton.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
    this.formInput.setVisible(isVisible)
    this.sharesToTradeLabel.setVisible(isVisible)
    this.sharesToTradeValue.setVisible(isVisible)
    this.marketPriceLabel.setVisible(isVisible)
    this.marketPriceValue.setVisible(isVisible)
    this.remainingBalanceLabel.setVisible(isVisible)
    this.remainingBalanceValue.setVisible(isVisible)
    this.confirmButton.setVisible(isVisible)
  }
}
