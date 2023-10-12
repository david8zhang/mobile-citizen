import { Constants } from '~/utils/Constants'

export class GameUI extends Phaser.Scene {
  private static _instance: GameUI

  public dashEatsDestinationName!: Phaser.GameObjects.Text
  public directionArrow!: Phaser.GameObjects.Sprite

  constructor() {
    super('game-ui')
    GameUI._instance = this
  }

  public static get instance() {
    return GameUI._instance
  }

  initDirectionArrow() {
    this.directionArrow = this.add
      .sprite(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, 'arrow-right')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.directionArrow.setVisible(false)
  }

  initDestinationName() {
    this.dashEatsDestinationName = this.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT, '', {
        fontFamily: Constants.FONT_REGULAR,
        fontSize: '40px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.dashEatsDestinationName.setVisible(false)
  }

  create() {
    this.initDestinationName()
    this.initDirectionArrow()
  }
}
