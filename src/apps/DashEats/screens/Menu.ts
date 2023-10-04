import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { MenuItemList } from '~/apps/DashEats/web-ui/MenuItemList'
import { Utils } from '~/utils/Utils'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { DASH_EATS_MENU_ITEMS } from '~/content/DashEats/DashEatsMenuItems'

export class Menu extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private menuItemListDom!: Phaser.GameObjects.DOMElement
  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'Menu', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      this.headerText.x - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 30
    )
    this.setupMenuItemList()
    this.setVisible(false)
  }

  setupMenuItemList() {
    const yPos = this.headerText.y + this.headerText.displayHeight + 30
    const menuItemList = MenuItemList(DASH_EATS_MENU_ITEMS, Constants.WINDOW_WIDTH, 540, (data) => {
      const parent = this.parent as DashEats
      parent.renderSubscreen(DE_ScreenTypes.MENU_ITEM, data)
    })
    this.menuItemListDom = this.scene.add
      .dom(0, yPos, menuItemList)
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
