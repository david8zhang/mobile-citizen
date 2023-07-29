import { Home } from '~/scenes/Home'
import { App } from './App'
import { Navbar } from '~/core/NavBar'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'

export class Bank extends App {
  private navbar: Navbar
  private bankBalanceText: Phaser.GameObjects.Text

  constructor(scene: Home) {
    super(scene)
    this.navbar = new Navbar(this.scene, {
      appName: 'Banking',
    })
    this.bankBalanceText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.navbar.bgRect.displayHeight + 100,
        `$${Save.getData(SaveKeys.BANK_BALANCE)}`,
        {
          fontSize: '50px',
          color: 'black',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.bankBalanceText.setPosition(
      this.bankBalanceText.x - this.bankBalanceText.displayWidth / 2,
      this.bankBalanceText.y
    )
    this.setupRecentTransactions()
    this.setVisible(false)
  }

  setupRecentTransactions() {}

  public render(onComplete?: Function): void {
    super.render(() => {
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
    this.bankBalanceText.setVisible(isVisible)
    this.navbar.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
