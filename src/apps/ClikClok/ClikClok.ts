import { Home } from '~/scenes/Home'
import { App } from '../App'
import { Navbar } from '~/core/NavBar'
import { BottomNav } from '~/apps/ClikClok/BottomNav'
import { ScreenTypes } from './ScreenTypes'
import { Profile } from './screens/Profile'
import { SelectSound, SongConfig } from './screens/SelectSound'
import { SubScreen } from './screens/SubScreen'
import { RecordVideo } from './screens/RecordVideo'

export class ClikClok extends App {
  public navbar: Navbar
  public bottomNav: BottomNav

  private screenMappings: {
    [key in ScreenTypes]?: SubScreen
  }
  private currSubscreen: ScreenTypes = ScreenTypes.PROFILE

  constructor(scene: Home) {
    super(scene)
    this.navbar = new Navbar(this.scene, {
      height: 50,
      appName: 'ClikClok',
      fontStyle: {
        fontFamily: 'Helvetica',
        color: 'black',
        fontSize: '20px',
      },
    })
    this.screenMappings = {
      [ScreenTypes.PROFILE]: new Profile(this.scene, this),
      [ScreenTypes.SELECT_SOUND]: new SelectSound(this.scene, this),
      [ScreenTypes.RECORD_VIDEO]: new RecordVideo(this.scene, this),
    }
    this.bottomNav = new BottomNav(this.scene, {
      onCreateNew: () => {
        this.goToSelectNewVideo()
      },
    })
    this.setVisible(false)
  }

  renderSubscreen(newSubscreen: ScreenTypes, data?: any) {
    if (this.currSubscreen !== newSubscreen) {
      const prevSubscreen = this.screenMappings[this.currSubscreen]
      if (prevSubscreen) prevSubscreen.setVisible(false)
    }
    this.currSubscreen = newSubscreen
    const subscreen = this.screenMappings[newSubscreen]
    if (subscreen) {
      subscreen.onRender(data)
      subscreen.setVisible(true)
    }
  }

  hideSubscreen() {
    const subscreen = this.screenMappings[this.currSubscreen]
    if (subscreen) {
      subscreen.setVisible(false)
    }
  }

  goToRecordVideoScreen(sound: SongConfig) {
    this.scene.homeButton.setStyle({ color: 'white' })
    this.renderSubscreen(ScreenTypes.RECORD_VIDEO, sound)
  }

  goToSelectNewVideo() {
    this.renderSubscreen(ScreenTypes.SELECT_SOUND)
  }

  public onHide(onComplete?: Function | undefined): void {
    this.hideSubscreen()
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public render(onComplete?: Function | undefined): void {
    super.render(() => {
      this.renderSubscreen(this.currSubscreen)
      if (onComplete) {
        onComplete()
      }
    })
  }

  public setVisible(isVisible: boolean): void {
    this.bottomNav.setVisible(isVisible)
    this.navbar.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
