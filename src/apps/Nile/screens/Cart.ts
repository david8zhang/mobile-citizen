import { SubScreen } from '~/core/SubScreen'
import { Nile } from '../Nile'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { PendingOrder, StoreItem } from '~/content/NileStoreItems'
import { Button } from '~/core/Button'
import { CartItemList } from '../web-ui/CartItemList'
import { Utils } from '~/utils/Utils'
import { NileScreenTypes } from '../NileScreenTypes'

export class Cart extends SubScreen {
  private subtotalLabelText!: Phaser.GameObjects.Text
  private subtotalValueText!: Phaser.GameObjects.Text
  private confirmOrderButton!: Button
  private cartItemsDomElement!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: Nile) {
    super(scene, parent)
    this.setupSubtotal()
    this.setupConfirmOrderButton()
    this.renderCartItemList()
    this.setVisible(false)
  }

  renderCartItemList() {
    if (this.cartItemsDomElement) {
      this.cartItemsDomElement.destroy()
    }
    const yPos = this.confirmOrderButton.y - 25
    const cartItems = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
    const storeItemList = CartItemList(
      cartItems,
      Constants.WINDOW_WIDTH,
      515,
      (item: StoreItem) => {
        const parent = this.parent as Nile
        parent.removeFromCart(item.id)
        this.renderCartItemList()
      }
    )
    this.cartItemsDomElement = this.scene.add
      .dom(0, yPos + 60, storeItemList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('cart-item-list')
  }

  setupConfirmOrderButton() {
    this.confirmOrderButton = new Button({
      scene: this.scene,
      x: Constants.WINDOW_WIDTH / 2,
      y: this.subtotalLabelText.y + this.subtotalLabelText.displayHeight + 40,
      width: Constants.WINDOW_WIDTH - 30,
      height: 50,
      text: 'Confirm Order',
      depth: Constants.SORT_LAYERS.APP_UI,
      fontFamily: 'Arial',
      fontSize: '18px',
      backgroundColor: 0xffffff,
      strokeWidth: 1,
      strokeColor: 0x000000,
      onClick: () => {
        this.confirmOrder()
      },
    })
  }

  confirmOrder() {
    const cartItems = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
    const cartTotal = cartItems.reduce((acc, curr) => {
      return acc + curr.price
    }, 0)

    // Subtract cart total from bank balance
    const pendingOrders: PendingOrder[] = cartItems.map((cartItem, index) => ({
      id: `${Date.now()}-${index}`,
      storeItem: cartItem,
      daysUntilDelivery: 2,
    }))
    Utils.addTransaction(cartTotal, 'Nile, Inc.', false)

    // Add items to inventory (to prevent player from purchasing them again)
    const inventory = Save.getData(SaveKeys.INVENTORY, []) as string[]
    const cartItemIds = cartItems.map((cart) => cart.id)
    Save.setData(SaveKeys.INVENTORY, inventory.concat(cartItemIds))

    // Clear cart and move items to pending
    Save.setData(SaveKeys.NILE_CART, [])
    Save.setData(SaveKeys.PENDING_NILE_ORDERS, pendingOrders)

    // Navigate to order status page
    const parent = this.parent as Nile
    parent.renderSubscreen(NileScreenTypes.ORDER_STATUS)
  }

  setupSubtotal() {
    this.subtotalLabelText = this.scene.add
      .text(15, Constants.TOP_BAR_HEIGHT + 20, 'Subtotal', {
        fontSize: '25px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.subtotalValueText = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, Constants.TOP_BAR_HEIGHT + 20, '', {
        fontSize: '25px',
        color: ' black',
        fontFamily: 'Arial',
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  public onRender(data?: any): void {
    const cart = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
    const subtotal = cart.reduce((acc, curr) => {
      return acc + curr.price
    }, 0)
    this.subtotalValueText.setText(`$${subtotal.toFixed(2)}`)
    this.renderCartItemList()
  }

  public setVisible(isVisible: boolean): void {
    this.subtotalLabelText.setVisible(isVisible)
    this.subtotalValueText.setVisible(isVisible)
    this.confirmOrderButton.setVisible(isVisible)
    this.cartItemsDomElement.setVisible(isVisible)
  }
}
