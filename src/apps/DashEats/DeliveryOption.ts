import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'
import { DashEatsConstants } from './DashEatsConstants'

export enum DeliveryOptionType {
  STANDARD = 'STANDARD',
  SPEEDY = 'SPEEDY',
}

export interface DeliveryOptionConfig {
  x: number
  y: number
  deliveryType: DeliveryOptionType
  onSelect: Function
}

export class DeliveryOption {
  private scene: Home
  public bgRect: Phaser.GameObjects.Rectangle
  private titleText: Phaser.GameObjects.Text
  private durationText: Phaser.GameObjects.Text
  private selectedCircle: Phaser.GameObjects.Arc
  private extraCostText: Phaser.GameObjects.Text | null = null
  public isSelected: boolean = false

  constructor(scene: Home, config: DeliveryOptionConfig) {
    this.scene = scene
    this.bgRect = this.scene.add
      .rectangle(config.x, config.y, Constants.WINDOW_WIDTH / 2 - 20, 100, 0xffffff)
      .setStrokeStyle(1, 0x000000)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.bgRect.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.bgRect.setAlpha(1)
        config.onSelect()
      })
    const titleText =
      config.deliveryType == DeliveryOptionType.STANDARD ? 'Standard Delivery' : 'Speedy Delivery'
    const durationText = config.deliveryType == DeliveryOptionType.STANDARD ? '30s' : '15s'
    this.titleText = this.scene.add
      .text(this.bgRect.x + 15, this.bgRect.y + 15, titleText, {
        fontSize: '20px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
      .setWordWrapWidth(Constants.WINDOW_WIDTH / 4, true)
    this.durationText = this.scene.add
      .text(this.bgRect.x + 15, this.bgRect.y + this.bgRect.displayHeight - 30, durationText, {
        fontSize: '16px',
        color: '#444444',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(0)
    if (config.deliveryType === DeliveryOptionType.SPEEDY) {
      this.extraCostText = this.scene.add
        .text(
          this.bgRect.x + this.bgRect.displayWidth - 15,
          this.bgRect.y + this.bgRect.displayHeight - 15,
          `+$${DashEatsConstants.SPEEDY_DELIVERY_EXTRA_COST.toFixed(2)}`,
          {
            fontSize: '15px',
            color: 'black',
            fontFamily: Constants.FONT_REGULAR,
          }
        )
        .setOrigin(1)
        .setDepth(Constants.SORT_LAYERS.APP_UI)
    }
    this.selectedCircle = this.scene.add
      .circle(this.bgRect.x + this.bgRect.displayWidth - 25, this.bgRect.y + 20, 8, 20, 0xffffff)
      .setStrokeStyle(2, 0x000000)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setSelected(isSelected: boolean) {
    this.isSelected = isSelected
    this.selectedCircle.setFillStyle(this.isSelected ? 0x888888 : 0xffffff)
  }

  get x() {
    return this.bgRect.x
  }

  get y() {
    return this.bgRect.y
  }

  get displayWidth() {
    return this.bgRect.displayWidth
  }

  get displayHeight() {
    return this.bgRect.displayHeight
  }

  setVisible(isVisible: boolean) {
    this.durationText.setVisible(isVisible)
    this.titleText.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
    this.selectedCircle.setVisible(isVisible)
    if (this.extraCostText) {
      this.extraCostText.setVisible(isVisible)
    }
  }
}
