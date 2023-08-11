import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Button } from './Button'

export class ProgressDayOverlayScreen {
  private scene: Home
  private bgRect: Phaser.GameObjects.Rectangle
  private progressDayText: Phaser.GameObjects.Text
  private continueButton: Button
  private newDay: number = 0

  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2,
        Constants.WINDOW_WIDTH,
        Constants.WINDOW_HEIGHT
      )
      .setFillStyle(0x000000)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.progressDayText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, '', {
        fontSize: '30px',
        color: 'white',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.continueButton = new Button({
      x: Constants.WINDOW_WIDTH / 2,
      y: Constants.WINDOW_HEIGHT / 2 + 100,
      width: 200,
      height: 50,
      backgroundColor: 0xffffff,
      fontFamily: 'Arial',
      fontSize: '18px',
      scene: this.scene,
      text: 'Continue',
      onClick: () => {
        this.setVisible(false)
        this.scene.executeOnProgressDayCallbacks(this.newDay)
      },
      depth: Constants.SORT_LAYERS.MODAL,
    })
    this.setVisible(false)
  }

  show(newDay: number) {
    this.newDay = newDay
    this.progressDayText.setText(`Day ${newDay}`).setAlpha(0)
    this.progressDayText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.progressDayText.displayWidth / 2,
      this.progressDayText.y
    )
    this.bgRect.setAlpha(0)
    this.scene.tweens.add({
      targets: [this.bgRect, this.progressDayText],
      alpha: {
        from: 0,
        to: 1,
      },
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      onStart: () => {
        this.progressDayText.setVisible(true)
        this.bgRect.setVisible(true)
      },
      onComplete: () => {
        this.continueButton.setVisible(true)
      },
    })
  }

  setVisible(isVisible: boolean) {
    this.bgRect.setVisible(isVisible)
    this.progressDayText.setVisible(isVisible)
    this.continueButton.setVisible(isVisible)
  }
}
