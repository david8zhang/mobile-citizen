import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { Utils } from '~/utils/Utils'
import { DeliveryJobList } from '../web-ui/DeliveryJobList'
import {
  DELIVERY_DESTINATIONS,
  DELIVERY_RESTAURANT_LOCATIONS,
  Location,
} from '~/content/DashEats/DeliveryRestaurants'
import { DeliveryJob, DeliveryJobDistance, DeliveryJobEarnings } from '../DashEatsConstants'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { EarningPotential } from '~/apps/ClikClok/ClikClokConstants'

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

  isWithinDistanceThreshold(distanceType: DeliveryJobDistance, distance: number) {
    switch (distanceType) {
      case DeliveryJobDistance.SHORT: {
        return distance <= 15
      }
      case DeliveryJobDistance.MEDIUM: {
        return distance <= 50
      }
      default:
        return true
    }
  }

  getDestinationWithinDistanceThreshold(
    startPosition: { x: number; y: number },
    distanceType: DeliveryJobDistance
  ) {
    const validDestinations: any[] = []
    DELIVERY_DESTINATIONS.map((destination) => {
      const distance = Phaser.Math.Distance.Snake(
        startPosition.x,
        startPosition.y,
        destination.position.x,
        destination.position.y
      )
      if (this.isWithinDistanceThreshold(distanceType, distance)) {
        validDestinations.push({
          ...destination,
          distance,
        })
      }
    })
    return Phaser.Utils.Array.GetRandom(validDestinations)
  }

  // Base earnings are directly based on distance
  getEarningsPotential(distanceType: DeliveryJobDistance) {
    switch (distanceType) {
      case DeliveryJobDistance.SHORT: {
        return DeliveryJobEarnings.LOW
      }
      case DeliveryJobDistance.MEDIUM: {
        return DeliveryJobEarnings.MEDIUM
      }
      default:
        return DeliveryJobEarnings.HIGH
    }
  }

  generateDeliveryJobs() {
    const randomNumJobs = Phaser.Math.Between(3, 6)
    const jobs: DeliveryJob[] = []
    for (let i = 1; i <= randomNumJobs; i++) {
      const randomRestaurant = Phaser.Utils.Array.GetRandom(
        DELIVERY_RESTAURANT_LOCATIONS
      ) as Location
      const randomDistance = Phaser.Utils.Array.GetRandom(
        Object.values(DeliveryJobDistance)
      ) as DeliveryJobDistance
      const destination = this.getDestinationWithinDistanceThreshold(
        randomRestaurant.position,
        randomDistance
      ) as Location
      const earningsPotential = this.getEarningsPotential(randomDistance)

      jobs.push({
        restaurantName: randomRestaurant.name,
        startPosition: randomRestaurant.position,
        destination,
        distance: randomDistance,
        energyCost: -30,
        earningsPotential,
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
