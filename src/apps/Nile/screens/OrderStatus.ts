import { SubScreen } from '~/core/SubScreen'
import { Nile } from '../Nile'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { PendingOrder, Tag } from '~/content/NileStoreItems'
import { PendingOrderList } from '../web-ui/PendingOrderList'
import { Utils } from '~/utils/Utils'
import { UINumber } from '~/apps/ClikClok/UINumber'

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
      (order: PendingOrder) => {
        this.onClaimItem(order)
      }
    )
    const yPos = this.headerText.y
    this.pendingOrdersList = this.scene.add
      .dom(0, yPos + 50, pendingOrdersList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('pending-order-list')
  }

  onClaimItem(order: PendingOrder) {
    const storeItem = order.storeItem
    const pointGain = storeItem.effect.pointGain
    if (pointGain) {
      Object.keys(pointGain).forEach((key: string) => {
        switch (key) {
          case Tag.KNOWLEDGE: {
            Utils.addKnowledgePoints(pointGain[key]!)
            UINumber.createNumber(
              `+${pointGain[key]!} Knowledge`,
              this.scene,
              Constants.WINDOW_WIDTH / 2,
              this.headerText.y + this.headerText.displayHeight + 15,
              '#000000'
            )
            break
          }
          case Tag.FITNESS: {
            Utils.addFitnessPoints(pointGain[key]!)
            UINumber.createNumber(
              `+${pointGain[key]!} Fitness`,
              this.scene,
              Constants.WINDOW_WIDTH / 2,
              this.headerText.y + this.headerText.displayHeight + 15,
              '#000000'
            )
            break
          }
        }
      })
    }
    const pendingOrders = Save.getData(SaveKeys.PENDING_NILE_ORDERS) as PendingOrder[]
    const newPendingOrders = pendingOrders.filter((o) => {
      return o.id != order.id
    })
    Save.setData(SaveKeys.PENDING_NILE_ORDERS, newPendingOrders)
    this.setupPendingOrdersList()
  }

  public onRender(data?: any): void {
    this.setupPendingOrdersList()
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.pendingOrdersList.setVisible(isVisible)
  }
}
