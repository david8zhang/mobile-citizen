import { SubScreen } from '~/core/SubScreen'
import { FriarBuck } from '../FriarBuck'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { NewsStories } from '../web-ui/NewsStories'
import { CLIK_CLOK_NEWS_STORIES, NEWS_COMPANIES } from '~/content/FriarBuck/FriarBuckNewsTemplates'
import { Utils } from '~/utils/Utils'
import { FB_ScreenTypes } from '../FBscreenTypes'
import { Save, SaveKeys } from '~/utils/Save'

export class NewsScreen extends SubScreen {
  private newsStories!: Phaser.GameObjects.DOMElement
  private headerText!: Phaser.GameObjects.Text

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupHeaderText()
    this.renderNewsStoriesList()
    this.setVisible(false)
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'News', {
        fontSize: '25px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      this.headerText.y
    )
  }

  renderNewsStoriesList() {
    if (this.newsStories) {
      this.newsStories.destroy()
    }
    const newsStories = Save.getData(SaveKeys.FRIAR_BUCK_NEWS_STORIES, {})
    const savedStories = Object.keys(newsStories).map((symbol) => {
      return { symbol, ...newsStories[symbol] }
    })
    const stories = savedStories.map((story) => {
      return {
        ...story,
        newsCompany: NEWS_COMPANIES[Phaser.Math.Between(0, NEWS_COMPANIES.length - 1)],
      }
    })
    const newsStoriesList = NewsStories(stories, Constants.WINDOW_WIDTH, 560)
    this.newsStories = this.scene.add
      .dom(0, this.headerText.y + this.headerText.displayHeight + 30, newsStoriesList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('friar-buck-news-stories')
  }

  public onRender(data?: any): void {
    this.renderNewsStoriesList()
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.newsStories.setVisible(isVisible)
  }
}
