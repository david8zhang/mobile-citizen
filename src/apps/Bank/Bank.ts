import { Home } from '~/scenes/Home'
import { App } from '../App'
import { Navbar } from '~/core/NavBar'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { TransactionsList } from '~/apps/Bank/web-ui/TransactionsList'
import { Utils } from '~/utils/Utils'

export interface BankTransactions {
  vendor: string
  amount: number
}

export class Bank extends App {
  private navbar: Navbar
  private bankBalanceLabel!: Phaser.GameObjects.Text
  private bankBalanceText!: Phaser.GameObjects.Text

  private transactionListDomElement!: Phaser.GameObjects.DOMElement
  private transactionListDivider!: Phaser.GameObjects.Line
  private transactionLabel!: Phaser.GameObjects.Text

  constructor(scene: Home) {
    super(scene)
    this.navbar = new Navbar(this.scene, {
      appName: 'Banking',
      height: 60,
      fontStyle: {
        fontSize: '22px',
        color: 'black',
        fontFamily: 'Arial',
      },
    })
    this.setupBankBalanceText()
    this.setVisible(false)
  }

  setupBankBalanceText() {
    this.bankBalanceText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.navbar.bgRect.displayHeight + 55,
        `$${Save.getData(SaveKeys.BANK_BALANCE)}`,
        {
          fontSize: '50px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.bankBalanceLabel = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.bankBalanceText.y + this.bankBalanceText.displayHeight,
        'Available Balance',
        {
          fontSize: '20px',
          color: '#777777',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.bankBalanceText.setPosition(
      this.bankBalanceText.x - this.bankBalanceText.displayWidth / 2,
      this.bankBalanceText.y
    )
    this.bankBalanceLabel.setPosition(
      this.bankBalanceLabel.x - this.bankBalanceLabel.displayWidth / 2,
      this.bankBalanceLabel.y + 20
    )
  }

  setupRecentTransactions(recentTransactions: BankTransactions[]) {
    const yPos = this.bankBalanceLabel.y + this.bankBalanceLabel.displayHeight + 30
    this.transactionLabel = this.scene.add
      .text(15, yPos + 30, 'RECENT TRANSACTIONS', {
        fontSize: '14px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setStroke('#000000', 1)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.transactionListDivider = this.scene.add
      .line(0, 0, 15, yPos, Constants.WINDOW_WIDTH - 15, yPos, 0x999999)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    const transactionList = TransactionsList(recentTransactions, 410, Constants.WINDOW_WIDTH)
    this.transactionListDomElement = this.scene.add
      .dom(0, yPos + 65, transactionList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('transaction-list')
  }

  updateBankTransactions() {
    if (this.transactionListDomElement) {
      this.transactionListDomElement.destroy()
    }
    if (this.transactionListDivider) {
      this.transactionListDivider.destroy()
    }
    if (this.transactionLabel) {
      this.transactionLabel.destroy()
    }
    const bankTransactions = Save.getData(SaveKeys.RECENT_TRANSACTIONS) as BankTransactions[]
    this.setupRecentTransactions(bankTransactions.reverse().slice(0, 5))
  }

  updateBankBalance() {
    const bankBalance = Save.getData(SaveKeys.BANK_BALANCE)
    const bankBalanceStr =
      bankBalance >= 0 ? `$${bankBalance.toFixed(2)}` : `-$${Math.abs(bankBalance).toFixed(2)}`
    this.bankBalanceText.setText(bankBalanceStr)
    this.bankBalanceText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.bankBalanceText.displayWidth / 2,
      this.bankBalanceText.y
    )
  }

  public render(onComplete?: Function): void {
    super.render(() => {
      this.updateBankTransactions()
      this.updateBankBalance()
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
    if (this.transactionListDivider) {
      this.transactionListDivider.setVisible(isVisible)
    }
    if (this.transactionLabel) {
      this.transactionLabel.setVisible(isVisible)
    }
    if (this.transactionListDomElement) {
      this.transactionListDomElement.setVisible(isVisible)
    }
    this.bankBalanceLabel.setVisible(isVisible)
    this.bankBalanceText.setVisible(isVisible)
    this.navbar.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
