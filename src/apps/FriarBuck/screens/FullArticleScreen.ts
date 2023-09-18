import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FriarBuck } from '../FriarBuck'
import { Constants } from '~/utils/Constants'
import { ArticleText } from '../web-ui/ArticleText'
import { Utils } from '~/utils/Utils'

export class FullArticleScreen extends SubScreen {
  private headlineText!: Phaser.GameObjects.Text
  private articleText!: Phaser.GameObjects.DOMElement
  private attributionText!: Phaser.GameObjects.Text
  private article!: {
    newsCompany: string
    headline: string
    text: string
  }

  constructor(scene: Home, parent: FriarBuck) {
    super(scene, parent)
    this.setupHeadlineText()
    this.setupAttributionText()
    this.setVisible(false)
  }

  setupHeadlineText() {
    this.headlineText = this.scene.add
      .text(15, Constants.TOP_BAR_HEIGHT + 15, '', {
        fontSize: '25px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setWordWrapWidth(Constants.WINDOW_WIDTH - 15)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupAttributionText() {
    this.attributionText = this.scene.add
      .text(15, this.headlineText.y + this.headlineText.displayHeight + 15, '', {
        fontSize: '18px',
        color: '#333333',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  updateArticleText(articleText: string) {
    if (this.articleText) {
      this.articleText.destroy()
    }
    const articleElem = ArticleText(articleText, Constants.WINDOW_WIDTH, 490)
    this.articleText = this.scene.add
      .dom(0, this.attributionText.y + this.attributionText.displayHeight + 15, articleElem)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('news-article-text')
  }

  public setVisible(isVisible: boolean): void {
    this.headlineText.setVisible(isVisible)
    this.attributionText.setVisible(isVisible)
    if (this.articleText) {
      this.articleText.setVisible(isVisible)
    }
  }

  public onRender(data?: any): void {
    this.article = data
    this.headlineText.setText(this.article.headline)
    this.attributionText
      .setText(this.article.newsCompany)
      .setPosition(15, this.headlineText.y + this.headlineText.displayHeight + 15)
    this.updateArticleText(this.article.text)
  }
}
