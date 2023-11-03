import { Constants } from '~/utils/Constants'

export class Start extends Phaser.Scene {
  constructor() {
    super('start')
  }

  create() {
    this.add.image(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, 'background')
    const lockIcon = this.add
      .sprite(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_WIDTH / 4, 'lock-solid')
      .setOrigin(0.5, 1)
      .setTintFill(0xffffff)
      .setScale(0.25)

    const titleText = this.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 3, 'Mobile Citizen', {
        fontSize: '70px',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0.5, 1)
    const currDate = new Date()
    const options: any = { weekday: 'long', month: 'long', day: 'numeric' }
    const currDateText = this.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        titleText.y + 40,
        `${currDate.toLocaleDateString('en-US', options)}`,
        {
          fontSize: '35px',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(0.5, 1)

    const startYPos = Constants.WINDOW_HEIGHT - 50
    const dragEndYPos = Constants.WINDOW_HEIGHT - 125
    const swipeToStartText = this.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT - 50, 'Swipe up to begin', {
        fontSize: '35px',
        color: 'white',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0.5, 1)
      .setWordWrapWidth(150, true)
      .setInteractive({ cursor: 'pointer' })
    this.input.setDraggable(swipeToStartText)

    const rectLine = this.add
      .rectangle(Constants.WINDOW_WIDTH / 2, swipeToStartText.y + 25, 150, 4, 0xffffff)
      .setOrigin(0.5, 1)

    this.input.on('drag', (pointer, gameObject, xPos, yPos) => {
      if (yPos < startYPos) {
        gameObject.y = yPos
        rectLine.y = gameObject.y + 25
      }
      if (yPos < dragEndYPos) {
        lockIcon.setTexture('lock-open-solid')
      } else {
        lockIcon.setTexture('lock-solid')
      }
      const alphaPct = (gameObject.y - dragEndYPos) / (startYPos - dragEndYPos)
      gameObject.setAlpha(alphaPct)
      rectLine.setAlpha(alphaPct)
    })
    this.input.on('dragend', (pointer, gameObject, xPos, yPos) => {
      gameObject.y = startYPos
      rectLine.y = gameObject.y + 25
      gameObject.setAlpha(1)
      rectLine.setAlpha(1)
      lockIcon.setTexture('lock-solid')

      if (pointer.worldY < dragEndYPos) {
        this.scene.start('home')
        this.scene.start('game-ui')
      }
    })
  }
}
