import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'
import { Button } from '~/core/Button'
import { DE_ScreenTypes } from '../DEScreenTypes'

export class DeliveryGameResults extends SubScreen {
  private deliveryHeaderText!: Phaser.GameObjects.Text
  private totalEarningsText!: Phaser.GameObjects.Text
  private totalEarningsValueText!: Phaser.GameObjects.Text
  private totalDeliveriesText!: Phaser.GameObjects.Text
  private totalDeliveriesValueText!: Phaser.GameObjects.Text
  private totalEarnings: number = 0
  private continueButton!: Button

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.setupDeliveryHeaderText()
    this.setupTotalEarningsText()
    this.setupTotalDeliveriesText()
    this.setupContinueButton()
    this.setVisible(false)
  }

  setupDeliveryHeaderText() {
    this.deliveryHeaderText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 4, 'Delivery Job Completed', {
        fontSize: '45px',
        fontFamily: Constants.FONT_REGULAR,
        color: 'black',
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.deliveryHeaderText)
  }

  setupTotalEarningsText() {
    this.totalEarningsText = this.scene.add
      .text(
        20,
        this.deliveryHeaderText.y + this.deliveryHeaderText.displayHeight + 30,
        'Total Earnings: ',
        {
          fontSize: '30px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalEarningsValueText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 20,
        this.deliveryHeaderText.y + this.deliveryHeaderText.displayHeight + 30,
        '',
        {
          fontSize: '30px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupTotalDeliveriesText() {
    this.totalDeliveriesText = this.scene.add
      .text(
        20,
        this.totalEarningsText.y + this.totalEarningsText.displayHeight + 20,
        'Deliveries Completed: ',
        {
          fontSize: '30px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.totalDeliveriesValueText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH - 20,
        this.totalEarningsText.y + this.totalEarningsText.displayHeight + 20,
        '',
        {
          fontSize: '30px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setOrigin(1, 0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
  }

  setupContinueButton() {
    this.continueButton = new Button({
      scene: this.scene,
      x: Constants.WINDOW_WIDTH / 2,
      y: this.totalDeliveriesText.y + this.totalDeliveriesText.displayHeight + 50,
      text: 'Continue',
      width: 150,
      height: 45,
      onClick: () => {
        if (this.totalEarnings > 0) {
          Utils.addTransaction(this.scene, this.totalEarnings, 'DashEats, Inc.', true)
        }
        const parent = this.parent as DashEats
        parent.renderSubscreen(DE_ScreenTypes.MENU)
      },
      fontSize: '25px',
      fontFamily: Constants.FONT_REGULAR,
      strokeColor: 0x000000,
      strokeWidth: 1,
      depth: Constants.SORT_LAYERS.APP_UI,
      backgroundColor: 0xffffff,
    })
  }

  public onRender(data?: any): void {
    this.totalEarnings = data.totalEarnings
    this.totalEarningsValueText.setText(`$${data.totalEarnings.toFixed(2)}`)
    this.totalDeliveriesValueText.setText(`${data.deliveriesCompleted}`)
  }

  public setVisible(isVisible: boolean): void {
    this.deliveryHeaderText.setVisible(isVisible)
    this.totalEarningsText.setVisible(isVisible)
    this.totalEarningsValueText.setVisible(isVisible)
    this.totalDeliveriesText.setVisible(isVisible)
    this.totalDeliveriesValueText.setVisible(isVisible)
    this.continueButton.setVisible(isVisible)
  }
}
