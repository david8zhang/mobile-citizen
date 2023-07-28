import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export abstract class App {
  protected scene: Home
  protected bgRect: Phaser.GameObjects.Rectangle
  constructor(scene: Home) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2 + Constants.TOP_BAR_HEIGHT,
        Constants.WINDOW_WIDTH,
        Constants.WINDOW_HEIGHT,
        0xeeeeee
      )
      .setInteractive()
      .setDepth(100)
      .setOrigin(0)
  }

  public render(onComplete?: Function): void {
    this.bgRect.setVisible(true)
    this.scene.tweens.add({
      targets: this.bgRect,
      width: {
        from: 0,
        to: Constants.WINDOW_WIDTH,
      },
      height: {
        from: 0,
        to: Constants.WINDOW_HEIGHT - Constants.TOP_BAR_HEIGHT,
      },
      onUpdate: (tween, target, param) => {
        target.setPosition(
          Constants.WINDOW_WIDTH / 2 - target.displayWidth / 2,
          Constants.WINDOW_HEIGHT / 2 - target.displayHeight / 2 + Constants.TOP_BAR_HEIGHT / 2
        )
      },
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 500,
      onComplete: () => {
        if (onComplete) {
          this.setVisible(true)
          onComplete()
        }
      },
    })
  }
  public abstract setVisible(isVisible: boolean): void
  public onHide(onComplete?: Function): void {
    this.bgRect.setVisible(true)
    this.scene.tweens.add({
      targets: this.bgRect,
      width: {
        to: 0,
        from: Constants.WINDOW_WIDTH,
      },
      height: {
        to: 0,
        from: Constants.WINDOW_HEIGHT - Constants.TOP_BAR_HEIGHT,
      },
      onUpdate: (tween, target, param) => {
        target.setPosition(
          Constants.WINDOW_WIDTH / 2 - target.displayWidth / 2,
          Constants.WINDOW_HEIGHT / 2 - target.displayHeight / 2 + Constants.TOP_BAR_HEIGHT / 2
        )
      },
      ease: Phaser.Math.Easing.Sine.InOut,
      duration: 500,
      onComplete: () => {
        if (onComplete) {
          this.setVisible(false)
          onComplete()
        }
      },
    })
  }
}
