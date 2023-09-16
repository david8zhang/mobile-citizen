import { Button } from '~/core/Button'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export class ProgressDayConfirmModal {
  private scene: Home
  private modalRect: Phaser.GameObjects.Rectangle
  private confirmProgressDayText: Phaser.GameObjects.Text
  private confirmButton: Button
  private denyButton: Button

  constructor(scene: Home) {
    this.scene = scene
    this.modalRect = this.scene.add
      .rectangle(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, 350, 200, 0xffffff)
      .setDepth(Constants.SORT_LAYERS.MODAL)
      .setStrokeStyle(1, 0x000000)
    this.confirmProgressDayText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, 'Progress to the next day?', {
        fontSize: '24px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.MODAL)
      .setWordWrapWidth(320, true)
      .setAlign('center')
    this.confirmProgressDayText.setPosition(
      this.modalRect.x - this.confirmProgressDayText.displayWidth / 2,
      this.modalRect.y - 40
    )

    this.confirmButton = new Button({
      x: this.modalRect.x - 75,
      y: this.modalRect.y + 50,
      width: 125,
      height: 30,
      onClick: () => {
        this.scene.progressToNextDay()
      },
      depth: Constants.SORT_LAYERS.MODAL,
      scene: this.scene,
      text: 'Yes',
      strokeColor: 0x000000,
      strokeWidth: 1,
      fontSize: '15px',
      fontFamily: Constants.FONT_REGULAR,
    })

    this.denyButton = new Button({
      x: this.modalRect.x + 75,
      y: this.modalRect.y + 50,
      width: 125,
      height: 30,
      onClick: () => {
        this.setVisible(false)
      },
      depth: Constants.SORT_LAYERS.MODAL,
      scene: this.scene,
      text: 'No',
      strokeColor: 0x000000,
      strokeWidth: 1,
      fontSize: '15px',
      fontFamily: Constants.FONT_REGULAR,
    })
    this.setVisible(false)
  }

  setVisible(isVisible: boolean) {
    this.modalRect.setVisible(isVisible)
    this.confirmProgressDayText.setVisible(isVisible)
    this.confirmButton.setVisible(isVisible)
    this.denyButton.setVisible(isVisible)
  }
}
