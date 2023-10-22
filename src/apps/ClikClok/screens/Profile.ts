import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { ClikClok } from '../ClikClok'
import { SubScreen } from '../../../core/SubScreen'
import { Utils } from '~/utils/Utils'
import { Save, SaveKeys } from '~/utils/Save'
import { Video } from './CompletedVideo'
import { VideoList } from '../web-ui/VideoList'
import { CC_ScreenTypes } from '../CCScreenTypes'

export class Profile extends SubScreen {
  // Profile
  private profilePic!: Phaser.GameObjects.Sprite
  private profileNameLabel!: Phaser.GameObjects.Text

  // Total Views
  private totalViewsLabel!: Phaser.GameObjects.Text
  private totalViewsValue!: Phaser.GameObjects.Text

  // Total Followers
  private totalFollowersLabel!: Phaser.GameObjects.Text
  private totalFollowersValue!: Phaser.GameObjects.Text

  // Today's Videos
  private todaysVideoDividerLine!: Phaser.GameObjects.Line
  private todaysVideosLabel!: Phaser.GameObjects.Text
  private todaysVideosList: Phaser.GameObjects.DOMElement | null = null
  private todaysVideosPlaceholderText!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: ClikClok) {
    super(scene, parent)
    this.setupProfile()
    this.setupTodaysVideosHeader()
    this.setVisible(false)
  }

  setupProfile() {
    const parent = this.parent as ClikClok
    this.profilePic = this.scene.add
      .sprite(
        Constants.WINDOW_WIDTH / 2,
        parent.navbar.bgRect.y + parent.navbar.bgRect.displayHeight + 25,
        'circle-user-solid'
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0.5, 0)
    this.profilePic.setDisplaySize(150, 150)
    this.profileNameLabel = this.scene.add
      .text(
        this.profilePic.x,
        this.profilePic.y + this.profilePic.displayHeight + 30,
        'My Profile',
        {
          fontSize: '40px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.profileNameLabel.setPosition(
      this.profileNameLabel.x - this.profileNameLabel.displayWidth / 2,
      this.profileNameLabel.y
    )

    this.totalFollowersValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 4,
        this.profileNameLabel.y + this.profileNameLabel.displayHeight + 30,
        '',
        {
          fontSize: '35px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalFollowersLabel = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 4,
        this.totalFollowersValue.y + this.totalFollowersValue.displayHeight + 5,
        'Followers',
        {
          fontSize: '28px',
          color: '#777777',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 4, this.totalFollowersLabel)

    this.totalViewsValue = this.scene.add
      .text(
        Constants.WINDOW_WIDTH * 0.75,
        this.profileNameLabel.y + this.profileNameLabel.displayHeight + 30,
        '',
        {
          fontSize: '35px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.totalViewsLabel = this.scene.add
      .text(
        Constants.WINDOW_WIDTH * 0.75,
        this.totalViewsValue.y + this.totalViewsValue.displayHeight + 5,
        'Total Views',
        {
          fontSize: '28px',
          color: '#777777',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH * 0.75, this.totalViewsLabel)
  }

  setupTodaysVideosHeader() {
    const yPos = this.totalViewsLabel.y + this.totalViewsLabel.displayHeight + 25
    this.todaysVideoDividerLine = this.scene.add
      .line(0, 0, 15, yPos, Constants.WINDOW_WIDTH - 15, yPos, 0x000000)
      .setLineWidth(1)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.todaysVideosLabel = this.scene.add
      .text(15, yPos + 25, "Today's Videos", {
        fontSize: '28px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.todaysVideosPlaceholderText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.todaysVideosLabel.y + 100,
        'No videos created today yet',
        {
          fontSize: '35px',
          color: '#aaaaaa',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.todaysVideosPlaceholderText)
  }

  renderTodaysVideosList() {
    if (this.todaysVideosList) {
      this.todaysVideosList.destroy()
    }
    const currDay = Save.getData(SaveKeys.CURR_DATE) as number
    const videosCreatedToday = (Save.getData(SaveKeys.CLIK_CLOK_VIDEOS) as Video[]).filter(
      (video) => {
        return video.creationDate == currDay
      }
    )
    if (videosCreatedToday.length > 0) {
      this.todaysVideosLabel.setVisible(true)
      this.todaysVideosPlaceholderText.setVisible(false)
      const currDayKey = Utils.getCurrDayKey()
      const videoList = VideoList(
        'today-video-list',
        videosCreatedToday,
        currDayKey,
        200,
        Constants.WINDOW_WIDTH,
        (video: Video) => {
          const parent = this.parent as ClikClok
          parent.renderSubscreen(CC_ScreenTypes.COMPLETED_VIDEO, video)
        }
      )
      this.todaysVideosList = this.scene.add
        .dom(0, this.todaysVideosLabel.y + this.todaysVideosLabel.displayHeight + 15, videoList)
        .setOrigin(0)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
      Utils.setupDragToScroll('today-video-list')
    } else {
      this.todaysVideosLabel.setVisible(false)
      this.todaysVideosPlaceholderText.setVisible(true)
    }
  }

  public setVisible(isVisible: boolean): void {
    this.profileNameLabel.setVisible(isVisible)
    this.profilePic.setVisible(isVisible)
    this.totalFollowersLabel.setVisible(isVisible)
    this.totalFollowersValue.setVisible(isVisible)
    this.totalViewsLabel.setVisible(isVisible)
    this.totalViewsValue.setVisible(isVisible)
    this.todaysVideoDividerLine.setVisible(isVisible)
    if (!isVisible) {
      this.todaysVideosLabel.setVisible(isVisible)
      this.todaysVideosPlaceholderText.setVisible(isVisible)
    }
    if (this.todaysVideosList) {
      this.todaysVideosList.setVisible(isVisible)
    }
  }

  updateFollowerAndViewCount() {
    const totalFollowers = Save.getData(SaveKeys.CLIK_CLOK_FOLLOWERS, 0)
    this.totalFollowersValue.setText(`${totalFollowers}`)
    Utils.centerText(Constants.WINDOW_WIDTH / 4, this.totalFollowersValue)

    const videos = Save.getData(SaveKeys.CLIK_CLOK_VIDEOS) as Video[]
    const totalViews = videos.reduce((acc, curr) => {
      return acc + curr.totalViews
    }, 0)
    this.totalViewsValue.setText(`${totalViews}`)
    Utils.centerText(Constants.WINDOW_WIDTH * 0.75, this.totalViewsValue)
  }

  public onRender(): void {
    const parent = this.parent as ClikClok
    parent.navbar.setText('ClikClok')
    this.updateFollowerAndViewCount()
    this.renderTodaysVideosList()
  }
}
