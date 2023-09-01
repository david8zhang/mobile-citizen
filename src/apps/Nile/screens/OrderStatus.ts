import { SubScreen } from '~/core/SubScreen'
import { Nile } from '../Nile'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { PendingOrder } from '~/content/NileStoreItems'
import { PendingOrderList } from '../web-ui/PendingOrderList'
import { Utils } from '~/utils/Utils'

export class OrderStatus extends SubScreen {
  private headerText!: Phaser.GameObjects.Text
  private pendingOrdersList!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: Nile) {
    super(scene, parent)
    this.setupHeaderText()
    this.setupPendingOrdersList()
    this.setVisible(false)
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 15, 'My Orders', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 15
    )
  }

  setupPendingOrdersList() {
    if (this.pendingOrdersList) {
      this.pendingOrdersList.destroy()
    }
    const pendingOrders = Save.getData(SaveKeys.PENDING_NILE_ORDERS) as PendingOrder[]
    const pendingOrdersList = PendingOrderList(
      pendingOrders,
      Constants.WINDOW_WIDTH,
      550,
      (item: PendingOrder) => {
        console.log(item)
      }
    )
    const yPos = this.headerText.y
    this.pendingOrdersList = this.scene.add
      .dom(0, yPos + 50, pendingOrdersList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('pending-order-list')
  }

  public onRender(data?: any): void {
    this.setupPendingOrdersList()
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.pendingOrdersList.setVisible(isVisible)
  }
}
