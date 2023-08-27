import { SubScreen } from '~/core/SubScreen'
import { Nile } from '../Nile'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { NILE_STORE_ITEMS, StoreItem, Tag } from '~/content/NileStoreItems'
import { StoreList } from '../web-ui/StoreList'
import { Utils } from '~/utils/Utils'

export interface StoreTagGroup {
  tagName: string
  items: StoreItem[]
}

export class Browse extends SubScreen {
  private headerText!: Phaser.GameObjects.Text
  private browseItemListDomElement!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: Nile) {
    super(scene, parent)
    this.setupHeaderText()
    this.setVisible(false)
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'Nile', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 30
    )
  }

  chunkItems(): StoreItem[][] {
    const result: StoreItem[][] = []
    for (let i = 0; i < NILE_STORE_ITEMS.length; i += 3) {
      result.push(NILE_STORE_ITEMS.slice(i, i + 3))
    }
    return result
  }

  renderBrowseItemList() {
    if (this.browseItemListDomElement) {
      this.browseItemListDomElement.destroy()
    }
    const yPos = this.headerText.y
    const soundsList = StoreList(this.chunkItems(), Constants.WINDOW_WIDTH, 520, (data) => {})
    this.browseItemListDomElement = this.scene.add
      .dom(0, yPos + 60, soundsList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('store-item-list')
  }

  public onRender(data?: any): void {
    this.renderBrowseItemList()
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    if (this.browseItemListDomElement) {
      this.browseItemListDomElement.setVisible(isVisible)
    }
  }
}
