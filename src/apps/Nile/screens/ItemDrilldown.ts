import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { Nile } from '../Nile'
import { StoreItem } from '~/content/NileStoreItems'
import { Constants } from '~/utils/Constants'
import { Button } from '~/core/Button'
import { Save, SaveKeys } from '~/utils/Save'

export class ItemDrilldown extends SubScreen {
  private storeItem!: StoreItem
  private itemImage!: Phaser.GameObjects.Image
  private itemName!: Phaser.GameObjects.Text
  private itemPrice!: Phaser.GameObjects.Text
  private effectText!: Phaser.GameObjects.Text
  private itemDescription!: Phaser.GameObjects.Text
  private addToCartButton!: Button

  constructor(scene: Home, parent: Nile) {
    super(scene, parent)
    this.setupStoreItemAttributes()
    this.setVisible(false)
  }

  setupStoreItemAttributes() {
    this.itemImage = this.scene.add
      .sprite(0, Constants.TOP_BAR_HEIGHT, '')
      .setDisplaySize(Constants.WINDOW_WIDTH, 250)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    this.itemName = this.scene.add
      .text(15, this.itemImage.y + this.itemImage.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setWordWrapWidth(Constants.WINDOW_WIDTH * 0.65, true)
    this.itemPrice = this.scene.add
      .text(Constants.WINDOW_WIDTH - 15, this.itemImage.y + this.itemImage.displayHeight + 15, '', {
        fontSize: '30px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.effectText = this.scene.add
      .text(15, this.itemName.y + this.itemName.displayHeight + 15, '', {
        fontSize: '18px',
        color: '#888888',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.itemDescription = this.scene.add
      .text(15, this.effectText.y + this.effectText.displayHeight + 15, '', {
        fontSize: '18px',
        color: '#444444',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setWordWrapWidth(Constants.WINDOW_WIDTH - 15, true)
      .setDepth(Constants.SORT_LAYERS.APP_UI)

    this.addToCartButton = new Button({
      x: Constants.WINDOW_WIDTH / 2,
      y: Constants.WINDOW_HEIGHT - 165,
      scene: this.scene,
      width: Constants.WINDOW_WIDTH - 30,
      height: 50,
      text: 'Add to cart',
      backgroundColor: 0xffffff,
      fontFamily: Constants.FONT_REGULAR,
      fontSize: '20px',
      strokeWidth: 1,
      strokeColor: 0x000000,
      onClick: () => {
        this.addToCart()
      },
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  addToCart() {
    const cart = Save.getData(SaveKeys.NILE_CART) as StoreItem[]
    const isItemInCart = cart.find((item) => item.id === this.storeItem.id) !== undefined
    const parent = this.parent as Nile
    if (isItemInCart) {
      parent.removeFromCart(this.storeItem.id)
      this.addToCartButton.setText('Add to Cart')
    } else {
      parent.addToCart(this.storeItem)
      this.addToCartButton.setText('Remove From Cart')
    }
  }

  updateStoreItemAttributes(storeItem: StoreItem) {
    this.storeItem = storeItem
    this.itemName.setText(storeItem.name)
    this.itemPrice.setText(`$${storeItem.price.toFixed(2)}`)
    this.effectText
      .setText(storeItem.effect.description)
      .setPosition(this.effectText.x, this.itemName.y + this.itemName.displayHeight + 15)
    this.itemDescription
      .setText(`${storeItem.description}`)
      .setPosition(this.itemDescription.x, this.effectText.y + this.effectText.displayHeight + 15)
  }

  public onRender(data: StoreItem): void {
    this.updateStoreItemAttributes(data)
  }

  public setVisible(isVisible: boolean): void {
    this.itemImage.setVisible(isVisible)
    this.itemName.setVisible(isVisible)
    this.itemPrice.setVisible(isVisible)
    this.effectText.setVisible(isVisible)
    this.itemDescription.setVisible(isVisible)
    this.addToCartButton.setVisible(isVisible)
  }
}
