import { Home } from '~/scenes/Home'
import { ClikClok } from '../ClikClok'
import { SubScreen } from '../../../core/SubScreen'
import { Constants } from '~/utils/Constants'
import { CC_BottomNav } from '../CCBottomNav'

export interface Video {
  videoName: string
  creationDate: number
  revenueEarnedPerDay: {
    [key: string]: number
  }
  totalViews: number
  totalLikes: number
  profileName: string
  hashtags: string
  songTitle: string
}

export class CompletedVideo extends SubScreen {
  private bgRect: Phaser.GameObjects.Rectangle
  private videoTitleText!: Phaser.GameObjects.Text

  // Video description
  private profileName!: Phaser.GameObjects.Text
  private hashTags!: Phaser.GameObjects.Text
  private songTitle!: Phaser.GameObjects.Text

  // Video stats
  private revenueEarnedLabel!: Phaser.GameObjects.Text
  private totalViewsLabel!: Phaser.GameObjects.Text
  private totalLikesLabel!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: ClikClok) {
    super(scene, parent)
    this.bgRect = this.scene.add
      .rectangle(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 2 - 15,
        Constants.WINDOW_WIDTH,
        Constants.WINDOW_HEIGHT - Constants.TOP_BAR_HEIGHT - CC_BottomNav.BOTTOM_BAR_HEIGHT,
        0x000000
      )
      .setInteractive()
      .setDepth(Constants.SORT_LAYERS.APP_BG)
    this.setupVideoTitle()
    this.setupVideoStats()
    this.setupVideoDescription()
    this.setVisible(false)
  }

  setupVideoTitle() {
    this.videoTitleText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 15, '', {
        fontSize: '20px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupVideoStats() {
    this.revenueEarnedLabel = this.scene.add
      .text(Constants.WINDOW_WIDTH - 20, Constants.WINDOW_HEIGHT / 2, 'Revenue: $0', {
        fontSize: '15px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalViewsLabel = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 20,
        this.revenueEarnedLabel.y + this.revenueEarnedLabel.displayHeight + 15,
        'Total Views: 0',
        {
          fontSize: '15px',
          color: 'white',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalLikesLabel = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 20,
        this.totalViewsLabel.y + this.totalViewsLabel.displayHeight + 15,
        'Total Lakes: 0',
        {
          fontSize: '15px',
          color: 'white',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupVideoDescription() {
    this.profileName = this.scene.add
      .text(15, this.totalLikesLabel.y + this.totalLikesLabel.displayHeight + 20, '@User', {
        fontSize: '15px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.hashTags = this.scene.add
      .text(15, this.profileName.y + this.profileName.displayHeight + 15, '#funny #dance', {
        fontSize: '15px',
        color: 'white',
      })
      .setStroke('#ffffff', 1)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.songTitle = this.scene.add
      .text(15, this.hashTags.y + this.hashTags.displayHeight + 15, 'Funny Dance', {
        fontSize: '15px',
        color: 'white',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  public onRender(video: Video): void {
    const parent = this.parent as ClikClok
    parent.bottomNav.setVisible(true)
    parent.navbar.setVisible(false)
    this.scene.homeButton.setStyle({ color: 'black' })
    this.updateVideoTitle(video)
    this.updateVideoStats(video)
    this.updateVideoDescription(video)
  }

  public onHide() {
    const parent = this.parent as ClikClok
    parent.bottomNav.setVisible(true)
    parent.navbar.setVisible(true)
  }

  updateVideoStats(video: Video) {
    const totalRevenueEarned = Object.values(video.revenueEarnedPerDay).reduce((acc, curr) => {
      return acc + curr
    }, 0)
    this.revenueEarnedLabel.setText(`Revenue: $${totalRevenueEarned.toFixed(2)}`)
    this.revenueEarnedLabel.setPosition(
      Constants.WINDOW_WIDTH - this.revenueEarnedLabel.displayWidth - 15,
      this.revenueEarnedLabel.y
    )
    this.totalViewsLabel.setText(`Total Views: ${video.totalViews}`)
    this.totalViewsLabel.setPosition(
      Constants.WINDOW_WIDTH - this.totalViewsLabel.displayWidth - 15,
      this.totalViewsLabel.y
    )
    this.totalLikesLabel.setText(`Total Likes: ${video.totalLikes}`)
    this.totalLikesLabel.setPosition(
      Constants.WINDOW_WIDTH - this.totalLikesLabel.displayWidth - 15,
      this.totalLikesLabel.y
    )
  }

  updateVideoDescription(video: Video) {
    this.profileName.setText('@User')
    this.hashTags.setText(video.hashtags)
    this.hashTags.setPosition(15, this.profileName.y + this.profileName.displayHeight + 15)
    this.songTitle.setText(video.songTitle)
    this.songTitle.setPosition(15, this.hashTags.y + this.hashTags.displayHeight + 15)
  }

  updateVideoTitle(video: Video) {
    this.videoTitleText.setText(video.videoName)
    this.videoTitleText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.videoTitleText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 15
    )
  }

  public setVisible(isVisible: boolean): void {
    this.videoTitleText.setVisible(isVisible)
    this.totalLikesLabel.setVisible(isVisible)
    this.totalViewsLabel.setVisible(isVisible)
    this.revenueEarnedLabel.setVisible(isVisible)
    this.profileName.setVisible(isVisible)
    this.hashTags.setVisible(isVisible)
    this.songTitle.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }
}
