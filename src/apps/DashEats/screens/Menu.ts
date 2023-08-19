import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { MenuItemList } from '~/web-ui/MenuItemList'
import { DashEatsConstants } from '../DashEatsConstants'
import { Utils } from '~/utils/Utils'

export class Menu extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private menuItemListDom!: Phaser.GameObjects.DOMElement
  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 25, 'DashEats', {
        fontSize: '35px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      this.headerText.x - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 25
    )
    this.setupMenuItemList()
    this.setVisible(false)
  }

  setupMenuItemList() {
    const yPos = this.headerText.y + this.headerText.displayHeight + 20
    const menuItemList = MenuItemList(
      DashEatsConstants.DASH_EATS_VIDEOS,
      Constants.WINDOW_WIDTH - 30,
      520,
      (data) => {}
    )
    this.menuItemListDom = this.scene.add
      .dom(0, yPos + 60, menuItemList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('menu-item-list')
  }

  updateMenuItemList() {
    if (this.menuItemListDom) {
      this.menuItemListDom.destroy()
    }
    this.setupMenuItemList()
  }

  public onRender(data?: any): void {
    this.updateMenuItemList()
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.menuItemListDom.setVisible(isVisible)
  }
}
