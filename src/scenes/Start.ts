import { Button } from '~/core/Button'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'

export class Start extends Phaser.Scene {
  private button!: Button
  constructor() {
    super('start')
  }

  create() {
    const titleText = this.add.text(
      Constants.WINDOW_WIDTH / 2,
      Constants.WINDOW_HEIGHT / 3,
      'Mobile Citizen',
      {
        fontSize: '70px',
        fontFamily: Constants.FONT_REGULAR,
      }
    )
    Utils.centerText(Constants.WINDOW_WIDTH / 2, titleText)
    this.button = new Button({
      scene: this,
      width: 150,
      height: 40,
      text: 'Start',
      fontSize: '28px',
      fontFamily: Constants.FONT_REGULAR,
      x: Constants.WINDOW_WIDTH / 2,
      y: titleText.y + titleText.displayHeight + 50,
      strokeColor: 0x000000,
      strokeWidth: 1,
      backgroundColor: 0xffffff,
      onClick: () => {
        this.scene.start('home')
        this.scene.start('game-ui')
      },
    })
  }
}
