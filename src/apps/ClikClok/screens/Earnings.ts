import { Home } from '~/scenes/Home'
import { ClikClok } from '../ClikClok'
import { SubScreen } from '../../../core/SubScreen'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { Video } from './CompletedVideo'
import { VideoList } from '~/apps/ClikClok/web-ui/VideoList'
import { Utils } from '~/utils/Utils'
import { CC_ScreenTypes } from '../CCScreenTypes'

export class Earnings extends SubScreen {
  private dailyEarningsText!: Phaser.GameObjects.Text
  private dailyEarningsLabel!: Phaser.GameObjects.Text
  private videoListDomElement!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: ClikClok) {
    super(scene, parent)
    this.setupDailyEarnings()
    this.setupVideoList()
    this.setVisible(false)
  }

  setupDailyEarnings() {
    const parent = this.parent as ClikClok
    this.dailyEarningsText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        parent.navbar.bgRect.y + Constants.TOP_BAR_HEIGHT + 40,
        '$0',
        {
          fontSize: '40px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.dailyEarningsLabel = this.scene.add
      .text(
        this.dailyEarningsText.x,
        this.dailyEarningsText.y + this.dailyEarningsText.displayHeight + 20,
        "Today's Earnings",
        {
          fontSize: '16px',
          color: '#777777',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.dailyEarningsLabel.setPosition(
      this.dailyEarningsText.x - this.dailyEarningsLabel.displayWidth / 2,
      this.dailyEarningsLabel.y
    )
  }

  updateEarnings() {
    const videos = Save.getData(SaveKeys.CLIK_CLOK_VIDEOS) as Video[]
    const currDate = Save.getData(SaveKeys.CURR_DATE) as number
    let totalEarnings = 0
    const day = `Day ${currDate}`
    videos.forEach((video) => {
      if (video.revenueEarnedPerDay[day]) {
        totalEarnings += video.revenueEarnedPerDay[day]
      }
    })
    this.dailyEarningsText.setText(`$${totalEarnings.toFixed(2)}`)
    this.dailyEarningsText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.dailyEarningsText.displayWidth / 2,
      this.dailyEarningsText.y
    )
  }

  public onRender(data?: any): void {
    const parent = this.parent as ClikClok
    parent.navbar.setText('Earnings')
    this.updateEarnings()
    this.updateVideoList()
  }

  public setupVideoList() {
    const videos = Save.getData(SaveKeys.CLIK_CLOK_VIDEOS) as Video[]
    const sortedVideos = videos.sort((a, b) => {
      return b.creationDate - a.creationDate
    })
    const currDay = Save.getData(SaveKeys.CURR_DATE) as Video[]
    const yPos = this.dailyEarningsLabel.y
    const videoList = VideoList(
      sortedVideos,
      `Day ${currDay}`,
      460,
      Constants.WINDOW_WIDTH,
      (video: Video) => {
        const parent = this.parent as ClikClok
        parent.renderSubscreen(CC_ScreenTypes.COMPLETED_VIDEO, video)
      }
    )
    this.videoListDomElement = this.scene.add
      .dom(0, yPos + 60, videoList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('video-list')
  }

  updateVideoList() {
    if (this.videoListDomElement) {
      this.videoListDomElement.destroy()
    }
    this.setupVideoList()
  }

  public setVisible(isVisible: boolean): void {
    this.videoListDomElement.setVisible(isVisible)
    this.dailyEarningsLabel.setVisible(isVisible)
    this.dailyEarningsText.setVisible(isVisible)
  }
}
