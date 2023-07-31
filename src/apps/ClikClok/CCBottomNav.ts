import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { CC_ScreenTypes } from './CCScreenTypes'

export interface CC_BottomNavConfig {
  onCreateNew: Function
  onRoute: Function
}

export class CC_BottomNav {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle
  public button!: Phaser.GameObjects.Rectangle
  public buttonIcon!: Phaser.GameObjects.Sprite
  private earningsText!: Phaser.GameObjects.Text
  private earningsIcon!: Phaser.GameObjects.Sprite
  private profileText!: Phaser.GameObjects.Text
  private profileIcon!: Phaser.GameObjects.Sprite
  private onRoute!: Function

  private static BUTTON_WIDTH = 40
  public static BOTTOM_BAR_HEIGHT = 60

  constructor(scene: Home, config: CC_BottomNavConfig) {
    this.scene = scene
    this.onRoute = config.onRoute
    this.bgRect = this.scene.add
      .rectangle(
        0,
        Constants.WINDOW_HEIGHT - CC_BottomNav.BOTTOM_BAR_HEIGHT - 15,
        Constants.WINDOW_WIDTH,
        CC_BottomNav.BOTTOM_BAR_HEIGHT,
        0xffffff
      )
      .setOrigin(0, 0.5)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.setupCreateButton(config.onCreateNew)
    this.setupEarningsButton()
    this.setupProfileButton()
  }

  setupEarningsButton() {
    this.earningsIcon = this.scene.add
      .sprite(this.button.x / 2, this.button.y - 8, 'sack-dollar-solid')
      .setDisplaySize(25, 25)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.earningsIcon.setAlpha(0.5)
        this.earningsText.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.earningsIcon.setAlpha(1)
        this.earningsText.setAlpha(1)
        this.onRoute(CC_ScreenTypes.EARNINGS)
      })
    this.earningsText = this.scene.add
      .text(
        this.button.x,
        this.earningsIcon.y + this.earningsIcon.displayHeight / 2 + 5,
        'Earnings',
        {
          fontSize: '12px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.earningsText.setPosition(
      this.earningsIcon.x - this.earningsText.displayWidth / 2,
      this.earningsText.y
    )
  }

  setupProfileButton() {
    this.profileIcon = this.scene.add
      .sprite(
        (this.button.x + this.button.displayWidth / 2 + Constants.WINDOW_WIDTH) / 2,
        this.button.y - 8,
        'circle-user-solid'
      )
      .setDisplaySize(25, 25)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.profileIcon.setAlpha(0.5)
        this.profileText.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.profileIcon.setAlpha(1)
        this.profileText.setAlpha(1)
        this.onRoute(CC_ScreenTypes.PROFILE)
      })
      .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
        this.profileIcon.setAlpha(1)
        this.profileText.setAlpha(1)
        this.onRoute(CC_ScreenTypes.PROFILE)
      })
      .on(Phaser.Input.Events.POINTER_DOWN_OUTSIDE, () => {
        this.profileIcon.setAlpha(1)
        this.profileText.setAlpha(1)
        this.onRoute(CC_ScreenTypes.PROFILE)
      })
    this.profileText = this.scene.add
      .text(
        this.profileIcon.x,
        this.profileIcon.y + this.profileIcon.displayHeight / 2 + 5,
        'Profile',
        {
          fontSize: '12px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.profileText.setPosition(
      this.profileIcon.x - this.profileText.displayWidth / 2,
      this.profileText.y
    )
  }

  setupCreateButton(onCreateNew: Function) {
    this.button = this.scene.add
      .rectangle(
        this.bgRect.x + this.bgRect.displayWidth / 2 - CC_BottomNav.BUTTON_WIDTH / 2,
        this.bgRect.y,
        CC_BottomNav.BUTTON_WIDTH,
        CC_BottomNav.BUTTON_WIDTH,
        0xdddddd
      )
      .setInteractive()
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setStrokeStyle(2, 0x000000)
      .setOrigin(0, 0.5)
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.button.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        onCreateNew()
        this.button.setAlpha(1)
      })
      .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
        onCreateNew()
        this.button.setAlpha(1)
      })
    this.buttonIcon = this.scene.add.sprite(
      this.button.x + this.button.displayWidth / 2,
      this.button.y,
      'plus-solid'
    )
    this.buttonIcon.setDisplaySize(30, 30).setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setVisible(isVisible: boolean) {
    this.earningsIcon.setVisible(isVisible)
    this.earningsText.setVisible(isVisible)
    this.profileIcon.setVisible(isVisible)
    this.profileText.setVisible(isVisible)
    this.button.setVisible(isVisible)
    this.buttonIcon.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
