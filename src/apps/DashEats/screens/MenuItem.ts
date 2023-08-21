import { SubScreen } from '~/core/SubScreen'
import { DashEats } from '../DashEats'
import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { MenuItemType } from '../DashEatsConstants'
import { DeliveryOption, DeliveryOptionType } from '../DeliveryOption'
import { Button } from '~/core/Button'
import { Save, SaveKeys } from '~/utils/Save'
import { BankTransactions } from '~/apps/Bank/Bank'
import { DE_ScreenTypes } from '../DEScreenTypes'

export class MenuItem extends SubScreen {
  private menuItemType!: MenuItemType
  private itemName!: Phaser.GameObjects.Text
  private itemPrice!: Phaser.GameObjects.Text
  private fullnessBonus!: Phaser.GameObjects.Text
  private fitnessBonus!: Phaser.GameObjects.Text
  private itemDescription!: Phaser.GameObjects.Text
  private itemImage!: Phaser.GameObjects.Sprite
  private chooseDeliveryOptionText!: Phaser.GameObjects.Text
  private standardDeliveryOption!: DeliveryOption
  private speedyDeliveryOption!: DeliveryOption
  private orderButton!: Button
  private selectedDeliveryOptionType: DeliveryOptionType | null = null

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.setupMenuItemAttributes()
    this.setVisible(false)
  }

  setupMenuItemAttributes() {
    this.itemImage = this.scene.add
      .sprite(0, Constants.TOP_BAR_HEIGHT, '')
      .setDisplaySize(Constants.WINDOW_WIDTH, 225)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.itemName = this.scene.add
      .text(15, this.itemImage.y + this.itemImage.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.itemPrice = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.itemImage.y + this.itemImage.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fullnessBonus = this.scene.add
      .text(15, this.itemName.y + this.itemName.displayHeight + 15, '', {
        fontSize: '18px',
        color: 'black',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.fitnessBonus = this.scene.add
      .text(
        this.fullnessBonus.x + this.fullnessBonus.displayWidth,
        this.itemName.y + this.itemName.displayHeight + 15,
        '',
        {
          fontSize: '18px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.itemDescription = this.scene.add
      .text(15, this.fitnessBonus.y + this.fitnessBonus.displayHeight + 15, '', {
        fontSize: '18px',
        color: '#444444',
        fontFamily: 'Arial',
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.chooseDeliveryOptionText = this.scene.add
      .text(
        15,
        this.itemDescription.y + this.itemDescription.displayHeight + 40,
        'Choose Delivery Option',
        {
          fontSize: '20px',
          color: 'black',
          fontFamily: 'Arial',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.standardDeliveryOption = new DeliveryOption(this.scene, {
      x: 15,
      y: this.chooseDeliveryOptionText.y + this.chooseDeliveryOptionText.displayHeight + 20,
      deliveryType: DeliveryOptionType.STANDARD,
      onSelect: () => {
        this.selectDeliveryOption(DeliveryOptionType.STANDARD)
      },
    })
    this.speedyDeliveryOption = new DeliveryOption(this.scene, {
      x: Constants.WINDOW_WIDTH / 2 + 5,
      y: this.chooseDeliveryOptionText.y + this.chooseDeliveryOptionText.displayHeight + 20,
      deliveryType: DeliveryOptionType.SPEEDY,
      onSelect: () => {
        this.selectDeliveryOption(DeliveryOptionType.SPEEDY)
      },
    })
    this.orderButton = new Button({
      x: Constants.WINDOW_WIDTH / 2,
      y: Constants.WINDOW_HEIGHT - 80,
      scene: this.scene,
      width: Constants.WINDOW_WIDTH - 30,
      height: 50,
      text: 'Select a delivery option',
      backgroundColor: 0xffffff,
      fontFamily: 'Arial',
      fontSize: '20px',
      strokeWidth: 1,
      strokeColor: 0x000000,
      onClick: () => {
        this.goToOrderConfirmation()
      },
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  updateMenuItemAttributes(menuItemType: MenuItemType) {
    this.menuItemType = menuItemType
    this.itemName.setText(menuItemType.name)
    this.itemPrice.setText(`$${menuItemType.price.toFixed(2)}`)
    this.itemDescription.setText(menuItemType.description)
    this.fullnessBonus.setText(`Full: ${menuItemType.fullnessBonus}`)
    this.fitnessBonus
      .setText(`Fit: ${menuItemType.fitnessBonus}`)
      .setPosition(
        this.fullnessBonus.x + this.fullnessBonus.displayWidth + 15,
        this.fullnessBonus.y
      )
  }

  selectDeliveryOption(deliveryOptionType: DeliveryOptionType) {
    this.selectedDeliveryOptionType = deliveryOptionType
    this.speedyDeliveryOption.setSelected(deliveryOptionType === DeliveryOptionType.SPEEDY)
    this.standardDeliveryOption.setSelected(deliveryOptionType === DeliveryOptionType.STANDARD)

    const totalBankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
    const totalCost =
      this.menuItemType.price + (deliveryOptionType === DeliveryOptionType.SPEEDY ? 3 : 0)
    this.orderButton.setText(`Order ($${totalCost.toFixed(2)})`)
    this.orderButton.text.setColor(totalBankBalance < totalCost ? 'red' : 'black')
  }

  goToOrderConfirmation() {
    const parent = this.parent as DashEats
    parent.renderSubscreen(DE_ScreenTypes.CONFIRM_ORDER, {
      menuItem: this.menuItemType,
      selectedDeliveryOptionType: this.selectedDeliveryOptionType,
    })
    this.selectedDeliveryOptionType = null
    this.orderButton.setText('Select a delivery option')
    this.speedyDeliveryOption.setSelected(false)
    this.standardDeliveryOption.setSelected(false)
  }

  public onRender(data: MenuItemType): void {
    this.updateMenuItemAttributes(data)
  }
  public setVisible(isVisible: boolean): void {
    this.itemImage.setVisible(isVisible)
    this.itemName.setVisible(isVisible)
    this.itemPrice.setVisible(isVisible)
    this.itemDescription.setVisible(isVisible)
    this.fullnessBonus.setVisible(isVisible)
    this.fitnessBonus.setVisible(isVisible)
    this.standardDeliveryOption.setVisible(isVisible)
    this.speedyDeliveryOption.setVisible(isVisible)
    this.chooseDeliveryOptionText.setVisible(isVisible)
    this.orderButton.setVisible(isVisible)
  }
}
