import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { MenuItemList } from '~/apps/DashEats/web-ui/MenuItemList'
import { Utils } from '~/utils/Utils'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { DASH_EATS_MENU_ITEMS } from '~/content/DashEats/DashEatsMenuItems'
import { ScrollableListElement, ScrollablePanel } from '~/core/ScrollablePanel'
import { MenuItemType } from '../DashEatsConstants'

export class Menu extends SubScreen {
  private headerText: Phaser.GameObjects.Text
  private menuItemList!: ScrollablePanel

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 30, 'Menu', {
        fontSize: '45px',
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

  getMenuItemList(): ScrollableListElement[] {
    let yPos = this.headerText.y + this.headerText.displayHeight + 30
    const menuItems = DASH_EATS_MENU_ITEMS.concat(DASH_EATS_MENU_ITEMS).concat(DASH_EATS_MENU_ITEMS)

    return menuItems.map((menuItemType: MenuItemType) => {
      const bgPanel = this.scene.add
        .rectangle(15, yPos, Constants.WINDOW_WIDTH - 30, 75, 0xffffff)
        .setOrigin(0)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
      const menuItemName = this.scene.add
        .text(15, yPos, menuItemType.name, {
          fontFamily: Constants.FONT_REGULAR,
          fontSize: '28px',
          color: 'black',
        })
        .setOrigin(0)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
      yPos += bgPanel.displayHeight + 15
      return {
        bgPanel,
        additionalElements: [menuItemName],
      }
    })
  }

  setupMenuItemList() {
    const yPos = this.headerText.y + this.headerText.displayHeight + 30
    const menuItemList = this.getMenuItemList()
    this.menuItemList = new ScrollablePanel(this.scene, {
      position: {
        x: 15,
        y: yPos,
      },
      width: Constants.WINDOW_WIDTH - 30,
      height: 540,
      elements: menuItemList,
      scrollSpeed: 10,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
    console.log(this.menuItemList)
  }

  updateMenuItemList() {
    if (this.menuItemList) {
      this.menuItemList.destroy()
    }
    this.setupMenuItemList()
  }

  public onRender(data?: any): void {
    this.updateMenuItemList()
  }

  public setVisible(isVisible: boolean): void {
    this.menuItemList.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
  }
}
