import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { DashEatsConstants, MenuItemType } from '../DashEatsConstants'
import { Constants } from '~/utils/Constants'
import { Button } from '~/core/Button'
import { DeliveryOptionType } from '../DeliveryOption'
import { Save, SaveKeys } from '~/utils/Save'
import { BankTransactions } from '~/apps/Bank/Bank'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { Utils } from '~/utils/Utils'

export class OrderConfirm extends SubScreen {
  private headerText!: Phaser.GameObjects.Text
  private itemName!: Phaser.GameObjects.Text
  private itemPrice!: Phaser.GameObjects.Text
  private deliveryTypeText!: Phaser.GameObjects.Text
  private deliveryTypePrice!: Phaser.GameObjects.Text
  private totalCostText!: Phaser.GameObjects.Text
  private totalCostPrice!: Phaser.GameObjects.Text
  private bankBalanceText!: Phaser.GameObjects.Text
  private bankBalanceValue!: Phaser.GameObjects.Text
  private dividerLine!: Phaser.GameObjects.Line
  private menuItem!: MenuItemType
  private selectedDeliveryOptionType!: DeliveryOptionType
  private confirmOrderButton!: Button

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.setupText()
    this.setupConfirmOrderButton()
    this.setVisible(false)
  }

  setupConfirmOrderButton() {
    this.confirmOrderButton = new Button({
      x: Constants.WINDOW_WIDTH / 2,
      y: Constants.WINDOW_HEIGHT - 160,
      text: 'Place Order',
      onClick: () => {
        this.orderItem()
      },
      fontFamily: Constants.FONT_REGULAR,
      fontSize: '28px',
      scene: this.scene,
      backgroundColor: 0xffffff,
      width: Constants.WINDOW_WIDTH - 30,
      height: 55,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  setupText() {
    this.headerText = this.scene.add
      .text(0, 0, 'Confirm Order', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      Constants.TOP_BAR_HEIGHT + 75
    )

    // Set up item price
    this.itemName = this.scene.add
      .text(0, 0, '', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.itemName.setPosition(15, this.headerText.y + this.headerText.displayHeight + 40)
    this.itemPrice = this.scene.add
      .text(0, 0, '', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.itemPrice.setPosition(Constants.WINDOW_WIDTH - 15, this.itemName.y)

    // Set up delivery type price
    this.deliveryTypeText = this.scene.add
      .text(0, 0, '', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.deliveryTypeText.setPosition(15, this.itemName.y + this.itemName.displayHeight + 15)
    this.deliveryTypePrice = this.scene.add
      .text(0, 0, '', {
        fontSize: '22px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.deliveryTypePrice.setPosition(Constants.WINDOW_WIDTH - 15, this.deliveryTypeText.y)

    // Total cost price (item + delivery cost)
    this.totalCostText = this.scene.add
      .text(0, 0, 'Total Cost', {
        fontSize: '27px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setStroke('black', 1)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalCostText.setPosition(
      15,
      this.deliveryTypeText.y + this.deliveryTypeText.displayHeight + 20
    )
    this.totalCostPrice = this.scene.add
      .text(0, 0, '', {
        fontSize: '27px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setStroke('black', 1)
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalCostPrice.setPosition(Constants.WINDOW_WIDTH - 15, this.totalCostText.y)

    this.dividerLine = this.scene.add
      .line(
        0,
        0,
        15,
        this.totalCostPrice.y + 45,
        Constants.WINDOW_WIDTH - 15,
        this.totalCostPrice.y + 45
      )
      .setStrokeStyle(1, 0xaaaaaa)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    // Show bank balance after purchase
    this.bankBalanceText = this.scene.add
      .text(0, 0, 'Balance After Purchase', {
        fontSize: '28px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.bankBalanceText.setPosition(15, this.totalCostPrice.y + 60)
    this.bankBalanceValue = this.scene.add
      .text(0, 0, '', {
        fontSize: '28px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.bankBalanceValue.setPosition(Constants.WINDOW_WIDTH - 15, this.bankBalanceText.y)
  }

  public orderItem() {
    if (this.selectedDeliveryOptionType === null) {
      return
    }
    const totalCost =
      this.menuItem.price + (this.selectedDeliveryOptionType === DeliveryOptionType.SPEEDY ? 3 : 0)
    Utils.addTransaction(this.scene, totalCost, 'DashEats, Inc.', false)
    const parent = this.parent as DashEats
    parent.renderSubscreen(DE_ScreenTypes.ORDER_PROGRESS, {
      menuItem: this.menuItem,
      deliveryOptionType: this.selectedDeliveryOptionType,
    })
  }

  updateOrderDetails() {
    this.itemName.setText(this.menuItem.name)
    this.itemPrice.setText(`$${this.menuItem.price.toFixed(2)}`)
    this.deliveryTypeText.setText(
      this.selectedDeliveryOptionType === DeliveryOptionType.SPEEDY
        ? 'Speedy Delivery'
        : 'Standard Delivery'
    )
    this.deliveryTypePrice.setText(
      this.selectedDeliveryOptionType === DeliveryOptionType.SPEEDY
        ? `$${DashEatsConstants.SPEEDY_DELIVERY_EXTRA_COST.toFixed(2)}`
        : '$0.00'
    )
    const totalCost =
      this.menuItem.price + (this.selectedDeliveryOptionType === DeliveryOptionType.SPEEDY ? 3 : 0)
    this.totalCostPrice.setText(`$${totalCost.toFixed(2)}`)

    const bankBalanceAfter = Save.getData(SaveKeys.BANK_BALANCE) - totalCost
    this.bankBalanceValue.setText(`$${bankBalanceAfter.toFixed(2)}`)
  }

  public onRender(data?: any): void {
    this.menuItem = data.menuItem
    this.selectedDeliveryOptionType = data.selectedDeliveryOptionType
    this.updateOrderDetails()
  }
  public setVisible(isVisible: boolean): void {
    this.itemName.setVisible(isVisible)
    this.itemPrice.setVisible(isVisible)
    this.headerText.setVisible(isVisible)
    this.deliveryTypePrice.setVisible(isVisible)
    this.deliveryTypeText.setVisible(isVisible)
    this.totalCostText.setVisible(isVisible)
    this.totalCostPrice.setVisible(isVisible)
    this.bankBalanceText.setVisible(isVisible)
    this.bankBalanceValue.setVisible(isVisible)
    this.confirmOrderButton.setVisible(isVisible)
    this.dividerLine.setVisible(isVisible)
  }
}
