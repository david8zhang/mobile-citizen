import { Button } from '~/core/Button'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export enum GameOverReason {
  BANKRUPTCY = 'BANKRUPTCY',
  POOR_HEALTH = 'POOR_HEALTH',
}

export class GameOver extends Phaser.Scene {
  private gameOverReason: GameOverReason | null = null

  constructor() {
    super('game-over')
  }

  init(data: { reason: GameOverReason }) {
    this.gameOverReason = data.reason
  }

  getMessageForReason() {
    switch (this.gameOverReason) {
      case GameOverReason.BANKRUPTCY: {
        return 'You went bankrupt!'
      }
      case GameOverReason.POOR_HEALTH: {
        return 'You suffered a health crisis!'
      }
      default:
        return ''
    }
  }

  create() {
    const gameOverReasonText = this.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 3, this.getMessageForReason(), {
        fontSize: '30px',
        color: 'white',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    gameOverReasonText.setPosition(
      Constants.WINDOW_WIDTH / 2 - gameOverReasonText.displayWidth / 2,
      Constants.WINDOW_HEIGHT / 3 - gameOverReasonText.displayHeight / 2
    )
    const continueButton = new Button({
      scene: this,
      onClick: () => {
        this.restart()
      },
      width: 150,
      height: 50,
      fontFamily: Constants.FONT_REGULAR,
      fontSize: '20px',
      textColor: 'black',
      backgroundColor: 0xffffff,
      x: Constants.WINDOW_WIDTH / 2,
      y: gameOverReasonText.y + gameOverReasonText.displayHeight / 2 + 100,
      text: 'Continue',
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  restart() {
    Utils.initializeSaveData(true)
    this.scene.start('home')
  }
}
