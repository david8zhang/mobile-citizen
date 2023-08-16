import { Home } from '~/scenes/Home'
import { App } from '../App'
import { Navbar } from '~/core/NavBar'
import { CC_BottomNav } from '~/apps/ClikClok/CCBottomNav'
import { CC_ScreenTypes } from './CCScreenTypes'
import { Profile } from './screens/Profile'
import { SelectSound, SongConfig } from './screens/SelectSound'
import { SubScreen } from '../../core/SubScreen'
import { RecordVideo } from './screens/RecordVideo'
import { CompletedVideo, Video } from './screens/CompletedVideo'
import { Earnings } from './screens/Earnings'
import { Save, SaveKeys } from '~/utils/Save'
import { ClikClokConstants } from './ClikClokConstants'
import { BankTransactions } from '../Bank/Bank'
import { AppRoute } from '~/utils/AppConfigs'

export class ClikClok extends App {
  public navbar: Navbar
  public bottomNav: CC_BottomNav

  private screenMappings: {
    [key in CC_ScreenTypes]?: SubScreen
  }
  private currSubscreen: CC_ScreenTypes = CC_ScreenTypes.PROFILE

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
      [CC_ScreenTypes.PROFILE]: new Profile(this.scene, this),
      [CC_ScreenTypes.SELECT_SOUND]: new SelectSound(this.scene, this),
      [CC_ScreenTypes.RECORD_VIDEO]: new RecordVideo(this.scene, this),
      [CC_ScreenTypes.COMPLETED_VIDEO]: new CompletedVideo(this.scene, this),
      [CC_ScreenTypes.EARNINGS]: new Earnings(this.scene, this),
    }
    this.bottomNav = new CC_BottomNav(this.scene, {
      onCreateNew: () => {
        this.goToSelectNewVideo()
      },
      onRoute: (route: CC_ScreenTypes) => {
        if (route === CC_ScreenTypes.PROFILE) {
          this.renderSubscreen(CC_ScreenTypes.PROFILE)
        } else if (route === CC_ScreenTypes.EARNINGS) {
          this.renderSubscreen(CC_ScreenTypes.EARNINGS)
        }
      },
    })
    this.setVisible(false)
    this.scene.onProgressDayCallbacks.push(() => {
      this.earnRevenueForVideos()
    })
  }

  earnRevenueForVideos() {
    const currDate = Save.getData(SaveKeys.CURR_DATE) as number
    const videos = Save.getData(SaveKeys.CLIK_CLOK_VIDEOS) as Video[]
    const bankTransactions = Save.getData(SaveKeys.RECENT_TRANSACTIONS) as BankTransactions[]
    let bankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
    const sortedByDateDesc = videos.sort((a, b) => {
      return b.creationDate - a.creationDate
    })
    let totalRevenueEarned = 0
    const videosWithRevenue: Video[] = []
    sortedByDateDesc.map((video: Video) => {
      const recencyBonus = ClikClokConstants.getRecencyRevenueBonus(video.creationDate, currDate)
      const baseRevenue = ClikClokConstants.getBaseRevenueFromVideoRank(video)
      const totalRevenue = recencyBonus * baseRevenue
      totalRevenueEarned += totalRevenue
      videosWithRevenue.push({
        ...video,
        revenueEarnedPerDay: {
          ...video.revenueEarnedPerDay,
          [`Day ${currDate}`]: totalRevenue,
        },
      })
    })
    bankTransactions.unshift({
      vendor: AppRoute.CLIK_CLOK,
      amount: totalRevenueEarned,
    })
    bankBalance += totalRevenueEarned
    Save.setData(SaveKeys.BANK_BALANCE, bankBalance)
    Save.setData(SaveKeys.RECENT_TRANSACTIONS, bankTransactions)
    Save.setData(SaveKeys.CLIK_CLOK_VIDEOS, videosWithRevenue)
  }

  renderSubscreen(newSubscreen: CC_ScreenTypes, data?: any) {
    if (this.currSubscreen !== newSubscreen) {
      const prevSubscreen = this.screenMappings[this.currSubscreen]
      if (prevSubscreen) {
        prevSubscreen.onHide()
        prevSubscreen.setVisible(false)
      }
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
    this.renderSubscreen(CC_ScreenTypes.RECORD_VIDEO, sound)
  }

  goToSelectNewVideo() {
    this.renderSubscreen(CC_ScreenTypes.SELECT_SOUND)
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
      this.renderSubscreen(CC_ScreenTypes.PROFILE)
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
