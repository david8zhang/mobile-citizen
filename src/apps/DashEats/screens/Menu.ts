import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
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
    const menuItems = DASH_EATS_MENU_ITEMS

    return menuItems.map((menuItemType: MenuItemType) => {
      const bgPanel = this.scene.add
        .rectangle(15, yPos, Constants.WINDOW_WIDTH - 30, 135, 0xffffff)
        .setOrigin(0)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
      const menuItemImage = this.scene.add
        .sprite(30, yPos + bgPanel.displayHeight / 2, menuItemType.imgSrc)
        .setDisplaySize(75, 75)
        .setOrigin(0, 0.5)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
      const menuItemName = this.scene.add
        .text(menuItemImage.x + menuItemImage.displayWidth + 20, yPos + 10, menuItemType.name, {
          fontFamily: Constants.FONT_REGULAR,
          fontSize: '28px',
          color: 'black',
        })
        .setOrigin(0)
        .setDepth(Constants.SORT_LAYERS.APP_UI)

      const menuItemPrice = this.scene.add
        .text(
          menuItemName.x,
          bgPanel.y + bgPanel.displayHeight - 15,
          `$${menuItemType.price.toFixed(2)}`,
          {
            fontFamily: Constants.FONT_REGULAR,
            fontSize: '25px',
            color: '#222222',
          }
        )
        .setOrigin(0, 1)
        .setDepth(Constants.SORT_LAYERS.APP_UI)

      const menuItemDescription = this.scene.add
        .text(menuItemName.x, (menuItemName.y + menuItemPrice.y) / 2, menuItemType.description, {
          fontFamily: Constants.FONT_REGULAR,
          fontSize: '21px',
          color: '#555555',
        })
        .setOrigin(0, 0.5)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
        .setWordWrapWidth(bgPanel.displayWidth - 115)

      const menuItemFit = this.scene.add
        .text(
          menuItemPrice.x + menuItemPrice.displayWidth + 15,
          menuItemPrice.y,
          `Fit: ${menuItemType.fitnessBonus}`,
          {
            fontFamily: Constants.FONT_REGULAR,
            fontSize: '25px',
            color: '#222222',
          }
        )
        .setOrigin(0, 1)
        .setDepth(Constants.SORT_LAYERS.APP_UI)

      const menuItemFull = this.scene.add
        .text(
          menuItemFit.x + menuItemFit.displayWidth + 15,
          menuItemPrice.y,
          `Full: ${menuItemType.fullnessBonus}`,
          {
            fontFamily: Constants.FONT_REGULAR,
            fontSize: '25px',
            color: '#222222',
          }
        )
        .setOrigin(0, 1)
        .setDepth(Constants.SORT_LAYERS.APP_UI)

      yPos += bgPanel.displayHeight + 15
      return {
        bgPanel,
        additionalElements: [
          menuItemName,
          menuItemImage,
          menuItemDescription,
          menuItemPrice,
          menuItemFit,
          menuItemFull,
        ],
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
      scrollSpeed: 20,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
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
