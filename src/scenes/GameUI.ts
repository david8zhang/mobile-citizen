import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export class GameUI extends Phaser.Scene {
  private static _instance: GameUI

  public dashEatsDestinationName!: Phaser.GameObjects.Text
  public dashEatsTimer!: Phaser.GameObjects.Text
  public dashEatsOverlayText!: Phaser.GameObjects.Text
  public dashEatsOverlayRect!: Phaser.GameObjects.Rectangle

  constructor() {
    super('game-ui')
    GameUI._instance = this
  }

  public static get instance() {
    return GameUI._instance
  }

  initOverlay() {
    this.dashEatsOverlayRect = this.add
      .rectangle(0, 0, Constants.WINDOW_WIDTH, Constants.WINDOW_HEIGHT, 0x000000, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.dashEatsOverlayText = this.add.text(
      Constants.WINDOW_WIDTH / 2,
      Constants.WINDOW_HEIGHT / 2,
      '',
      {
        fontSize: '35px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'white',
      }
    )
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

  create() {
    this.initDestinationName()
    this.initDashEatsTimer()
  }
}
