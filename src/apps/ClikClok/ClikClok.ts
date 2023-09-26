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
import { AppRoute } from '~/utils/AppConfigs'
import { Notification } from '~/core/NotificationListScreen'
import { Utils } from '~/utils/Utils'
import { Constants } from '~/utils/Constants'

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
        fontFamily: Constants.FONT_BOLD,
        color: 'white',
        fontSize: '20px',
      },
      fillColor: 0x000000,
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
      this.earnRevenueFollowersAndViews()
    })
  }

  earnRevenueFollowersAndViews() {
    const currDate = Save.getData(SaveKeys.CURR_DATE) as number
    const videos = Save.getData(SaveKeys.CLIK_CLOK_VIDEOS) as Video[]
    const sortedByDateDesc = videos.sort((a, b) => {
      return b.creationDate - a.creationDate
    })
    let totalRevenueEarned = 0
    let totalViews = 0
    const videosWithRevenue: Video[] = []
    sortedByDateDesc.map((video: Video) => {
      const newVideo = { ...video }
      const recencyBonus = ClikClokConstants.getRecencyBonus(video.creationDate, currDate)
      const newViews = ClikClokConstants.getNewViewsForVideo(recencyBonus)
      newVideo.totalViews += newViews
      totalViews += newVideo.totalViews
      const revenueEarned = ClikClokConstants.getTotalRevenueForVideo(newVideo, recencyBonus)
      const currDayKey = Utils.getCurrDayKey()
      totalRevenueEarned += revenueEarned
      newVideo.revenueEarnedPerDay = {
        ...video.revenueEarnedPerDay,
        [currDayKey]: revenueEarned,
      }
      videosWithRevenue.push(newVideo)
    })
    if (totalRevenueEarned > 0) {
      Utils.addTransaction(totalRevenueEarned, 'Clik Clok, Inc.', true)
      Save.setData(SaveKeys.CLIK_CLOK_VIDEOS, videosWithRevenue)
      this.showNotificationForEarned(totalRevenueEarned)
    }
    const currFollowers = Save.getData(SaveKeys.CLIK_CLOK_FOLLOWERS, 0)
    const newFollowers = ClikClokConstants.getNewFollowers(totalViews)
    if (newFollowers > 0) {
      this.showNotificationForNewFollowers(newFollowers)
    }
    Save.setData(SaveKeys.CLIK_CLOK_FOLLOWERS, currFollowers + newFollowers)
  }

  showNotificationForNewFollowers(newFollowers: number) {
    const day = Save.getData(SaveKeys.CURR_DATE) as number
    const newNotification: Notification = {
      id: `clik-clok-followers-day-${day}`,
      appName: 'Clik Clok',
      message: `You have ${newFollowers} new follower${newFollowers > 1 ? 's' : ''}`,
      route: AppRoute.CLIK_CLOK,
      day: day,
    }
    const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
    const newNotifications = notifications.concat(newNotification)
    Save.setData(SaveKeys.NOTIFICATIONS, newNotifications)
  }

  showNotificationForEarned(totalRevenueEarned: number) {
    const day = Save.getData(SaveKeys.CURR_DATE) as number
    const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
    const newNotification: Notification = {
      id: `clik-clok-revenue-day-${day}`,
      appName: 'Clik Clok',
      message: `Your videos have earned $${totalRevenueEarned.toFixed(2)}`,
      route: AppRoute.CLIK_CLOK,
      day: day,
    }
    const newNotifications = notifications.concat(newNotification)
    Save.setData(SaveKeys.NOTIFICATIONS, newNotifications)
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
