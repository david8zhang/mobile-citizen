import { Button } from '~/core/Button'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export class GameUI extends Phaser.Scene {
  private static _instance: GameUI

  public dashEatsDestinationName!: Phaser.GameObjects.Text
  public dashEatsTimer!: Phaser.GameObjects.Text
  public dashEatsOverlayText!: Phaser.GameObjects.Text
  public dashEatsOverlayRect!: Phaser.GameObjects.Rectangle
  public dashEatsTotalEarnings!: Phaser.GameObjects.Text
  public dashEatsDeliveriesCompleted!: Phaser.GameObjects.Text
  public continueButton!: Button

  constructor() {
    super('game-ui')
    GameUI._instance = this
  }

  public static get instance() {
    return GameUI._instance
  }

  create() {
    this.initDestinationName()
    this.initDashEatsTimer()
    this.initDashEatsTotalEarnings()
    this.initDashEatsOverlay()
    this.initDashEatsDeliveriesCompleted()
    this.initContinueButton()
  }

  initContinueButton() {
    this.continueButton = new Button({
      scene: this,
      x: Constants.WINDOW_WIDTH / 2,
      y: this.dashEatsOverlayText.y + this.dashEatsOverlayText.displayHeight + 30,
      onClick: () => {},
      width: 150,
      height: 40,
      text: 'Continue',
      depth: Constants.SORT_LAYERS.APP_UI + 100,
      backgroundColor: 0xffffff,
      strokeColor: 0x000000,
      strokeWidth: 1,
      fontFamily: Constants.FONT_REGULAR,
      fontSize: '28px',
    })
    this.continueButton.setVisible(false)
  }

  displayDashEatsOverlayText(text: string) {
    this.dashEatsOverlayRect.setVisible(true)
    this.dashEatsOverlayText.setText(text).setVisible(true)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.dashEatsOverlayText)
  }

  initDashEatsTotalEarnings() {
    this.dashEatsTotalEarnings = this.add
      .text(15, 15, 'Earned: $1.00', {
        fontSize: '28px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'white',
      })
      .setStroke('black', 5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setVisible(false)
  }

  initDashEatsOverlay() {
    this.dashEatsOverlayRect = this.add
      .rectangle(0, 0, Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT, 0x000000, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setVisible(false)
    this.dashEatsOverlayText = this.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2 - 50, '', {
        fontSize: '50px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'white',
      })
      .setStroke('black', 8)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setVisible(false)
  }

  initDashEatsDeliveriesCompleted() {
    this.dashEatsDeliveriesCompleted = this.add
      .text(Constants.WINDOW_WIDTH - 15, 15, '', {
        fontSize: '28px',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0)
      .setStroke('black', 5)
      .setVisible(false)
  }

  initDashEatsTimer() {
    this.dashEatsTimer = this.add
      .text(Constants.WINDOW_WIDTH / 2, 20, '', {
        fontFamily: Constants.FONT_REGULAR,
        fontSize: '50px',
        color: 'white',
      })
      .setStroke('black', 8)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.dashEatsTimer)
    this.dashEatsTimer.setVisible(false)
  }

  initDestinationName() {
    this.dashEatsDestinationName = this.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT, '', {
        fontFamily: Constants.FONT_REGULAR,
        fontSize: '40px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStroke('black', 8)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.dashEatsDestinationName)
    this.dashEatsDestinationName.setVisible(false)
  }

  hideDashEatsUI() {
    this.dashEatsDestinationName.setVisible(false)
    this.dashEatsOverlayRect.setVisible(false)
    this.dashEatsOverlayText.setVisible(false)
    this.dashEatsTimer.setVisible(false)
    this.dashEatsTotalEarnings.setVisible(false)
    this.dashEatsDeliveriesCompleted.setVisible(false)
    this.continueButton.setVisible(false)
  }
}
