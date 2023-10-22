import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { MoveController } from '~/core/MoveController'
import { DashEatsConstants, DeliveryJob, DeliveryJobDistance } from '../DashEatsConstants'
import { Utils } from '~/utils/Utils'
import { GameUI } from '~/scenes/GameUI'
import {
  DELIVERY_DESTINATIONS,
  DELIVERY_RESTAURANT_LOCATIONS,
  Location,
} from '~/content/DashEats/DeliveryRestaurants'
import { UINumber } from '~/apps/ClikClok/UINumber'
import { DE_ScreenTypes } from '../DEScreenTypes'
import { Save, SaveKeys } from '~/utils/Save'

export enum DeliveryPhase {
  PICKING_UP_ORDER = 'PICKING_UP_ORDER',
  DELIVERING = 'DELIVERING',
}

export class DeliveryGame extends SubScreen {
  private tileMap!: Phaser.Tilemaps.Tilemap
  private carSprite!: Phaser.Physics.Arcade.Sprite
  private moveController!: MoveController
  private deliveryJob: DeliveryJob | null = null
  private line!: Phaser.Geom.Line
  private rectangle!: Phaser.Geom.Rectangle
  private graphics: Phaser.GameObjects.Graphics
  private goalCircle!: Phaser.Geom.Circle
  private directionArrow!: Phaser.GameObjects.Sprite
  private deliveryTimer!: Phaser.Time.TimerEvent

  // Overlay
  public overlayText!: Phaser.GameObjects.Text
  public overlayRect!: Phaser.GameObjects.Rectangle

  private timeLimitSeconds: number = 0
  private totalEarnings: number = 0
  private deliveriesCompleted: number = 0
  private currentDeliveryPhase: DeliveryPhase = DeliveryPhase.PICKING_UP_ORDER
  private outOfTime: boolean = false

  public static SCALE = 4

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.initTilemap()
    this.initCar()
    this.setupColliders()
    this.initDirectionArrow()
    this.setVisible(false)
    this.graphics = this.scene.add.graphics()
    this.graphics.lineStyle(2, 0x00ff00)
    this.graphics.setDepth(Constants.SORT_LAYERS.APP_UI + 100)
    this.line = new Phaser.Geom.Line(this.carSprite.x, this.carSprite.y, 0, 0)
    this.goalCircle = new Phaser.Geom.Circle(0, 0, 50)
    this.rectangle = new Phaser.Geom.Rectangle(
      0,
      0,
      Constants.WINDOW_WIDTH,
      Constants.WINDOW_HEIGHT
    )
  }

  initDirectionArrow() {
    this.directionArrow = this.scene.add
      .sprite(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2, 'arrow-right')
      .setDepth(Constants.SORT_LAYERS.APP_UI)
      .setOrigin(1, 0.5)
  }
  initCar() {
    this.carSprite = this.scene.physics.add
      .sprite(0, 0, 'car-red-horizontal')
      .setDepth(Constants.SORT_LAYERS.MODAL)
      .setOrigin(0.5, 0)
      .setScale(4)
    const carTextures = {
      horizontal: 'car-red-horizontal',
      up: 'car-red-up',
      down: 'car-red-down',
    }
    this.scene.physics.world.enableBody(this.carSprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.moveController = new MoveController({
      scene: this.scene,
      speed: 150,
      sprite: this.carSprite,
      textures: carTextures,
    })
    this.scene.updateCallbacks.push(() => {
      if (!this.outOfTime) {
        this.moveController.update()
        this.updateDirectionArrow()
        if (this.goalCircle.contains(this.carSprite.x, this.carSprite.y)) {
          if (this.deliveryTimer) {
            if (this.currentDeliveryPhase === DeliveryPhase.DELIVERING) {
              this.completeDelivery()
            } else {
              this.completePickup()
            }
          }
        }
      }
    })
  }

  completePickup() {
    this.graphics.clear()
    this.deliveryTimer.destroy()
    this.currentDeliveryPhase = DeliveryPhase.DELIVERING
    this.moveGoalCircleToLocation(this.deliveryJob!.destination.position, 0x00ff00)
    this.displayDestinationName(this.deliveryJob!.destination.name)
    const newTimeLimitSeconds = Math.min(
      60,
      this.timeLimitSeconds + this.getTimeRecovery(this.deliveryJob!.distance)
    )
    this.setTimer(newTimeLimitSeconds)
  }

  completeDelivery() {
    this.graphics.clear()
    this.deliveryTimer.destroy()
    UINumber.createNumber(
      `+$${this.deliveryJob!.earnings.toFixed(2)}`,
      this.scene,
      this.carSprite.x,
      this.carSprite.y,
      'white',
      '25px'
    )
    this.totalEarnings += this.deliveryJob!.earnings
    this.deliveriesCompleted++
    this.updateTotalEarnings()
    this.updateDeliveriesCompleted()

    // Generate a new delivery job
    const newDeliveryJob = this.generateDeliveryJob()
    this.moveGoalCircleToLocation(newDeliveryJob.restaurant.position, 0x0000ff)
    this.displayDestinationName(newDeliveryJob.restaurant.name)
    this.currentDeliveryPhase = DeliveryPhase.PICKING_UP_ORDER

    // Update timer
    const newTimeLimitSeconds = Math.min(60, this.timeLimitSeconds + 5)
    this.setTimer(newTimeLimitSeconds)
    this.deliveryJob = newDeliveryJob
  }

  finishGame() {
    Utils.updateEnergy(this.scene, DashEatsConstants.DELIVERY_GAME_ENERGY_COST)
    const parent = this.parent as DashEats
    parent.renderSubscreen(DE_ScreenTypes.DELIVERY_GAME_RESULTS, {
      totalEarnings: this.totalEarnings,
      deliveriesCompleted: this.deliveriesCompleted,
    })
    this.directionArrow.setVisible(false)
    parent.bottomNav.setVisible(true)
    this.scene.cameras.main.stopFollow()
    this.scene.cameras.main.centerOn(Constants.WINDOW_WIDTH / 2, Constants.WINDOW_HEIGHT / 2)
    this.graphics.clear()
    GameUI.instance.hideDashEatsUI()
  }

  updateDirectionArrow() {
    if (this.deliveryJob) {
      let position: { x: number; y: number } = this.deliveryJob.destination.position
      if (this.currentDeliveryPhase === DeliveryPhase.PICKING_UP_ORDER) {
        position = this.deliveryJob.restaurant.position
      }
      const tile = this.tileMap.getTileAt(position.x, position.y, false, 'Road')
      if (tile) {
        const tileWorldX = tile.pixelX * DeliveryGame.SCALE
        const tileWorldY = tile.pixelY * DeliveryGame.SCALE
        if (this.scene.cameras.main.worldView.contains(tileWorldX, tileWorldY)) {
          this.directionArrow.setVisible(false)
        } else {
          this.directionArrow.setVisible(true)
          const angleToDestination = Phaser.Math.Angle.Between(
            this.carSprite.x,
            this.carSprite.y,
            tileWorldX,
            tileWorldY
          )
          this.directionArrow.setRotation(angleToDestination)
          this.line.setTo(this.carSprite.x, this.carSprite.y, tileWorldX, tileWorldY)
          this.rectangle.setPosition(
            this.scene.cameras.main.worldView.x,
            this.scene.cameras.main.worldView.y
          )
          const intersectingPoint = Phaser.Geom.Intersects.GetLineToRectangle(
            this.line,
            this.rectangle
          )
          if (intersectingPoint.length > 0) {
            const point = intersectingPoint[0]
            this.directionArrow.setPosition(point.x, point.y)
          }
        }
      }
    }
  }

  initTilemap() {
    this.tileMap = this.scene.make.tilemap({
      key: 'dasheats-city',
    })
    const tileset = this.tileMap.addTilesetImage('tilemap_packed', 'tilemap_packed')
    const roadLayer = this.createLayer('Road', tileset)
    this.createLayer('Buildings', tileset)
    this.scene.cameras.main.setBounds(
      0,
      0,
      roadLayer.width * DeliveryGame.SCALE,
      roadLayer.height * DeliveryGame.SCALE
    )
  }

  setupColliders() {
    const buildingLayer = this.tileMap.getLayer('Buildings')
    this.scene.physics.add.collider(this.carSprite, buildingLayer.tilemapLayer)
  }

  createLayer(layerName: string, tileset: Phaser.Tilemaps.Tileset) {
    const layer = this.tileMap.createLayer(layerName, tileset)
    layer.setDepth(Constants.SORT_LAYERS.APP_UI)
    layer.setScale(DeliveryGame.SCALE)
    layer.setPosition(0, 0)
    layer.setOrigin(0)
    layer.setCollisionByExclusion([-1])
    return layer
  }

  isWithinDistanceThreshold(distanceType: DeliveryJobDistance, distance: number) {
    switch (distanceType) {
      case DeliveryJobDistance.SHORT: {
        return distance <= 50
      }
      case DeliveryJobDistance.MEDIUM: {
        return distance <= 100
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

  generateDeliveryJob(): DeliveryJob {
    const randomRestaurant = Phaser.Utils.Array.GetRandom(DELIVERY_RESTAURANT_LOCATIONS) as Location
    const randomDistance = Phaser.Utils.Array.GetRandom(
      Object.values(DeliveryJobDistance)
    ) as DeliveryJobDistance
    const destination = this.getDestinationWithinDistanceThreshold(
      randomRestaurant.position,
      randomDistance
    ) as Location
    const earnings = this.getEarningsForJob(randomDistance)
    return {
      restaurant: randomRestaurant,
      earnings,
      destination,
      distance: randomDistance,
    }
  }

  // Time recovery is based on distance travelled
  getTimeRecovery(distance: DeliveryJobDistance) {
    switch (distance) {
      case DeliveryJobDistance.SHORT: {
        return 5
      }
      case DeliveryJobDistance.MEDIUM: {
        return 10
      }
      default:
        return 15
    }
  }

  // Job earnings are based on distance
  getEarningsForJob(distanceType: DeliveryJobDistance) {
    switch (distanceType) {
      case DeliveryJobDistance.SHORT: {
        return 1
      }
      case DeliveryJobDistance.MEDIUM: {
        return 2
      }
      default:
        return 4
    }
  }

  moveGoalCircleToLocation(location: { x: number; y: number }, fillColor: number) {
    const tile = this.tileMap.getTileAt(location.x, location.y, false, 'Road')
    if (tile) {
      const tileWorldX = tile.pixelX * DeliveryGame.SCALE
      const tileWorldY = tile.pixelY * DeliveryGame.SCALE
      this.goalCircle.setPosition(tileWorldX, tileWorldY)
      this.graphics.fillStyle(fillColor, 0.5)
      this.graphics.fillCircleShape(this.goalCircle)
    }
  }

  public onRender(): void {
    this.outOfTime = false
    this.totalEarnings = 0
    this.deliveriesCompleted = 0
    if (GameUI.instance.continueButton.clickCallbacks.length == 0) {
      GameUI.instance.continueButton.clickCallbacks.push(() => {
        this.finishGame()
      })
    }
    const parent = this.parent as DashEats
    parent.bottomNav.setVisible(false)
    this.scene.cameras.main.startFollow(this.carSprite, true)
    this.createInitialDeliveryJob()
    const { restaurant } = this.deliveryJob!
    const tile = this.tileMap.getTileAt(restaurant.position.x, restaurant.position.y, false, 'Road')
    if (tile) {
      this.carSprite.setPosition(tile.pixelX * DeliveryGame.SCALE, tile.pixelY * DeliveryGame.SCALE)
    }
    this.currentDeliveryPhase = DeliveryPhase.DELIVERING
  }

  createInitialDeliveryJob() {
    this.deliveryJob = this.generateDeliveryJob()
    const { destination } = this.deliveryJob
    this.moveGoalCircleToLocation(destination.position, 0x00ff00)
    this.displayDestinationName(this.deliveryJob.destination.name)
    this.updateTotalEarnings()
    this.updateDeliveriesCompleted()

    this.timeLimitSeconds = DashEatsConstants.DISTANCE_TO_TIME_LIMIT[this.deliveryJob.distance]
    this.setTimer(this.timeLimitSeconds)
  }

  setTimer(timeLimit: number) {
    this.timeLimitSeconds = timeLimit
    GameUI.instance.dashEatsTimer.setText(`${this.timeLimitSeconds}`)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, GameUI.instance.dashEatsTimer)
    GameUI.instance.dashEatsTimer.setVisible(true)
    this.deliveryTimer = this.scene.time.addEvent({
      delay: 1000,
      repeat: this.timeLimitSeconds,
      callback: () => {
        if (this.timeLimitSeconds === 0) {
          this.deliveryTimer.destroy()
          this.handleOutOfTime()
        } else {
          this.timeLimitSeconds--
          GameUI.instance.dashEatsTimer.setText(`${this.timeLimitSeconds}`)
          Utils.centerText(Constants.WINDOW_WIDTH / 2, GameUI.instance.dashEatsTimer)
          GameUI.instance.dashEatsTimer.setVisible(true)
        }
      },
    })
  }

  handleOutOfTime() {
    this.outOfTime = true
    this.carSprite.setVelocity(0)
    GameUI.instance.continueButton.setVisible(true)
    GameUI.instance.displayDashEatsOverlayText("Time's Up!")
  }

  displayDestinationName(name: string) {
    GameUI.instance.dashEatsDestinationName.setVisible(true)
    GameUI.instance.dashEatsDestinationName.setText(name)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, GameUI.instance.dashEatsDestinationName)
    GameUI.instance.dashEatsDestinationName.setPosition(
      GameUI.instance.dashEatsDestinationName.x,
      Constants.WINDOW_HEIGHT - GameUI.instance.dashEatsDestinationName.displayHeight - 15
    )
  }

  updateTotalEarnings() {
    GameUI.instance.dashEatsTotalEarnings.setVisible(true)
    GameUI.instance.dashEatsTotalEarnings.setText(`Earned: $${this.totalEarnings.toFixed(2)}`)
  }

  updateDeliveriesCompleted() {
    GameUI.instance.dashEatsDeliveriesCompleted.setVisible(true)
    GameUI.instance.dashEatsDeliveriesCompleted.setText(`Deliveries: ${this.deliveriesCompleted}`)
  }

  public setVisible(isVisible: boolean): void {
    this.carSprite.setVisible(isVisible)
    this.tileMap.layers.forEach((layer) => {
      layer.tilemapLayer.setVisible(isVisible)
    })
    this.directionArrow.setVisible(isVisible)
  }
}
