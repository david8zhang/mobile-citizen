import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { ClikClok } from '../ClikClok'
import { SubScreen } from '../../../core/SubScreen'

export class Profile extends SubScreen {
  // Profile
  private profilePic!: Phaser.GameObjects.Sprite
  private profileNameLabel!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: ClikClok) {
    super(scene, parent)
    this.setupProfile()
    this.setVisible(false)
  }

  setupProfile() {
    const parent = this.parent as ClikClok
    this.profilePic = this.scene.add
      .sprite(
        Constants.WINDOW_WIDTH / 2,
        parent.navbar.bgRect.y + parent.navbar.bgRect.displayHeight + 50,
        'circle-user-solid'
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0.5, 0)
    this.profilePic.setDisplaySize(150, 150)
    this.profileNameLabel = this.scene.add
      .text(
        this.profilePic.x,
        this.profilePic.y + this.profilePic.displayHeight + 50,
        'My Profile',
        {
          fontSize: '25px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.profileNameLabel.setPosition(
      this.profileNameLabel.x - this.profileNameLabel.displayWidth / 2,
      this.profileNameLabel.y
    )
  }

  public setVisible(isVisible: boolean): void {
    this.profileNameLabel.setVisible(isVisible)
    this.profilePic.setVisible(isVisible)
  }

  public onRender(): void {
    const parent = this.parent as ClikClok
    parent.navbar.setText('ClikClok')
  }
}
