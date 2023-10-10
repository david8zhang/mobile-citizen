import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'
import { DeliveryJobList } from '../web-ui/DeliveryJobList'
import { DELIVERY_RESTAURANT_LOCATIONS } from '~/content/DashEats/DeliveryRestaurants'
import { DeliveryJob, DeliveryJobDistance, DeliveryJobEarnings } from '../DashEatsConstants'
import { DE_ScreenTypes } from '../DEScreenTypes'

export class SelectDeliveryJob extends SubScreen {
  private headerText!: Phaser.GameObjects.Text
  private deliveryJobDom!: Phaser.GameObjects.DOMElement

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.setupHeaderText()
    this.setupDeliveryJobList()
    this.setVisible(false)
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 25, 'Delivery Jobs', {
        fontSize: '35px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, this.headerText)
  }

  setupDeliveryJobList() {
    const deliveryJobs = this.generateDeliveryJobs()
    const yPos = this.headerText.y + this.headerText.displayHeight + 30
    const menuItemList = DeliveryJobList(
      deliveryJobs,
      Constants.WINDOW_WIDTH,
      565,
      (deliveryJob: DeliveryJob) => {
        const parent = this.parent as DashEats
        parent.renderSubscreen(DE_ScreenTypes.DELIVERY_GAME, deliveryJob)
      }
    )
    this.deliveryJobDom = this.scene.add
      .dom(0, yPos, menuItemList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('delivery-job-list')
  }

  generateDeliveryJobs() {
    const randomNumJobs = Phaser.Math.Between(3, 6)
    const jobs: DeliveryJob[] = []
    for (let i = 1; i <= randomNumJobs; i++) {
      const randomRestaurant = Phaser.Utils.Array.GetRandom(DELIVERY_RESTAURANT_LOCATIONS)
      const randomDistance = Phaser.Utils.Array.GetRandom(Object.values(DeliveryJobDistance))
      const randomEarningsPotential = Phaser.Utils.Array.GetRandom(
        Object.values(DeliveryJobEarnings)
      )
      jobs.push({
        restaurantName: randomRestaurant.name,
        startPosition: randomRestaurant.position,
        distance: randomDistance,
        energyCost: -30,
        earningsPotential: randomEarningsPotential,
      })
    }
    return jobs
  }

  public onRender(data?: any): void {}

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.deliveryJobDom.setVisible(isVisible)
  }
}
