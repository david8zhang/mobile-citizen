import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { SubScreen } from '~/core/SubScreen'
import { Button } from '~/core/Button'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { DashEatsConstants } from '../DashEatsConstants'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { Utils } from '~/utils/Utils'

export class StartDeliveryGame extends SubScreen {
  private startDeliveryText: Phaser.GameObjects.Text
  private energyCostText: Phaser.GameObjects.Text
  private startDeliveryButton: Button
  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)

    this.startDeliveryText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        Constants.WINDOW_HEIGHT / 4,
        'Deliver as many packages as you can before the time runs out!',
        {
          fontSize: '28px',
          color: 'black',
          fontFamily: Constants.FONT_REGULAR,
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setWordWrapWidth(Constants.WINDOW_WIDTH - 50, true)
      .setAlign('center')
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.startDeliveryText)

    const energyCost = this.getDeliveryGameEnergyCost()
    this.energyCostText = this.scene.add
      .text(
        Constants.WINDOW_WIDTH / 2,
        this.startDeliveryText.y + this.startDeliveryText.displayHeight + 15,
        `Energy Cost: ${energyCost}`,
        {
          fontSize: '28px',
          fontFamily: Constants.FONT_REGULAR,
          color: 'black',
        }
      )
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.energyCostText)

    this.startDeliveryButton = new Button({
      scene: this.scene,
      onClick: () => {
        const parent = this.parent as DashEats
        parent.renderSubscreen(DE_ScreenTypes.DELIVERY_GAME)
        this.scene.setPreventAction(true)
      },
      x: Constants.WINDOW_WIDTH / 2,
      y: this.energyCostText.y + this.energyCostText.displayHeight + 50,
      width: 300,
      height: 45,
      text: 'Start',
      strokeColor: 0x000000,
      strokeWidth: 1,
      backgroundColor: 0xffffff,
      fontFamily: Constants.FONT_REGULAR,
      fontSize: '30px',
      depth: Constants.SORT_LAYERS.APP_UI,
    })
    this.setVisible(false)
  }

  public getDeliveryGameEnergyCost() {
    const fitnessGrade = Utils.getFitnessGrade()
    const energyCost = Utils.getEnergyCostForFitness(fitnessGrade)
    return (1 + energyCost) * DashEatsConstants.DELIVERY_GAME_ENERGY_COST
  }

  public onRender(data?: any): void {
    const deliveryGameEnergyCost = this.getDeliveryGameEnergyCost()
    this.energyCostText.setText(`Energy Cost: ${deliveryGameEnergyCost}`)
    const energyLevel = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    if (energyLevel < deliveryGameEnergyCost) {
      this.startDeliveryButton.setVisible(false)
      this.startDeliveryText.setText(`Not enough energy for delivery!`)
      Utils.centerText(Constants.WINDOW_WIDTH / 2, this.startDeliveryText)
      this.energyCostText.setStyle({ color: 'red' })
    } else {
      this.startDeliveryButton.setVisible(true)
      this.startDeliveryText.setText(
        'Deliver as many packages as you can before the time runs out!'
      )
      this.energyCostText.setStyle({ color: 'black' })
    }
  }

  public setVisible(isVisible: boolean): void {
    if (!isVisible) {
      this.startDeliveryButton.setVisible(isVisible)
    }
    this.energyCostText.setVisible(isVisible)
    this.startDeliveryText.setVisible(isVisible)
  }
}
