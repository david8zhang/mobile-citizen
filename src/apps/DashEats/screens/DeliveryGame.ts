import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { MoveController } from '~/core/MoveController'
import {
  DashEatsConstants,
  DeliveryJob,
  DeliveryJobDistance,
  DeliveryJobEarnings,
} from '../DashEatsConstants'
import { Utils } from '~/utils/Utils'
import { GameUI } from '~/scenes/GameUI'
import {
  DELIVERY_DESTINATIONS,
  DELIVERY_RESTAURANT_LOCATIONS,
  Location,
} from '~/content/DashEats/DeliveryRestaurants'

export class DeliveryGame extends SubScreen {
  private tileMap!: Phaser.Tilemaps.Tilemap
  private carSprite!: Phaser.Physics.Arcade.Sprite
  private moveController!: MoveController
  private deliveryJob!: DeliveryJob
  private line!: Phaser.Geom.Line
  private rectangle!: Phaser.Geom.Rectangle
  private graphics: Phaser.GameObjects.Graphics
  private goalCircle!: Phaser.Geom.Circle
  private directionArrow!: Phaser.GameObjects.Sprite
  private deliveryTimer!: Phaser.Time.TimerEvent
  private timeLimitSeconds: number = 0

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
      this.moveController.update()
      this.updateDirectionArrow()
      if (this.goalCircle.contains(this.carSprite.x, this.carSprite.y)) {
        if (this.deliveryTimer) {
          this.graphics.clear()
          this.deliveryTimer.destroy()
          GameUI.instance.dashEatsTimer.setVisible(false)
          this.setupDeliveryJob()
        }
      }
    })
  }

  updateDirectionArrow() {
    if (this.deliveryJob) {
      const { destination } = this.deliveryJob
      const tile = this.tileMap.getTileAt(
        destination.position.x,
        destination.position.y,
        false,
        'Road'
      )

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

  generateDeliveryJob() {
    const randomRestaurant = Phaser.Utils.Array.GetRandom(DELIVERY_RESTAURANT_LOCATIONS) as Location
    const randomDistance = Phaser.Utils.Array.GetRandom(
      Object.values(DeliveryJobDistance)
    ) as DeliveryJobDistance
    const destination = this.getDestinationWithinDistanceThreshold(
      randomRestaurant.position,
      randomDistance
    ) as Location
    const earningsPotential = this.getEarningsPotential(randomDistance)
    return {
      restaurantName: randomRestaurant.name,
      startPosition: randomRestaurant.position,
      destination,
      distance: randomDistance,
      energyCost: -30,
      earningsPotential,
    }
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

  setupGoalCircle(deliveryJob: DeliveryJob) {
    const { destination } = deliveryJob
    const tile = this.tileMap.getTileAt(
      destination.position.x,
      destination.position.y,
      false,
      'Road'
    )
    if (tile) {
      const tileWorldX = tile.pixelX * DeliveryGame.SCALE
      const tileWorldY = tile.pixelY * DeliveryGame.SCALE
      this.goalCircle.setPosition(tileWorldX, tileWorldY)
      this.graphics.fillStyle(0x00ff00, 0.5)
      this.graphics.fillCircleShape(this.goalCircle)
    }
  }

  public onRender(): void {
    const parent = this.parent as DashEats
    parent.bottomNav.setVisible(false)
    this.scene.cameras.main.startFollow(this.carSprite, true)
    this.setupDeliveryJob()
    const tile = this.tileMap.getTileAt(
      this.deliveryJob.startPosition.x,
      this.deliveryJob.startPosition.y,
      false,
      'Road'
    )
    if (tile) {
      this.carSprite.setPosition(tile.pixelX * DeliveryGame.SCALE, tile.pixelY * DeliveryGame.SCALE)
    }
  }

  setupDeliveryJob() {
    this.deliveryJob = this.generateDeliveryJob()
    this.setupGoalCircle(this.deliveryJob)
    this.displayDestinationName(this.deliveryJob)
    this.setupTimer(this.deliveryJob)
  }

  setupTimer(data: DeliveryJob) {
    this.timeLimitSeconds = DashEatsConstants.DISTANCE_TO_TIME_LIMIT[data.distance]
    GameUI.instance.dashEatsTimer.setText(`${this.timeLimitSeconds}`)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, GameUI.instance.dashEatsTimer)
    GameUI.instance.dashEatsTimer.setVisible(true)
    this.deliveryTimer = this.scene.time.addEvent({
      delay: 1000,
      repeat: this.timeLimitSeconds - 1,
      callback: () => {
        if (this.timeLimitSeconds === 0) {
          this.deliveryTimer.destroy()
        } else {
          this.timeLimitSeconds--
          GameUI.instance.dashEatsTimer.setText(`${this.timeLimitSeconds}`)
          Utils.centerText(Constants.WINDOW_WIDTH / 2, GameUI.instance.dashEatsTimer)
          GameUI.instance.dashEatsTimer.setVisible(true)
        }
      },
    })
  }

  displayDestinationName(data: DeliveryJob) {
    GameUI.instance.dashEatsDestinationName.setVisible(true)
    GameUI.instance.dashEatsDestinationName.setText(data.destination.name)
    Utils.centerText(Constants.WINDOW_WIDTH / 2, GameUI.instance.dashEatsDestinationName)
    GameUI.instance.dashEatsDestinationName.setPosition(
      GameUI.instance.dashEatsDestinationName.x,
      Constants.WINDOW_HEIGHT - GameUI.instance.dashEatsDestinationName.displayHeight - 15
    )
  }

  public setVisible(isVisible: boolean): void {
    this.carSprite.setVisible(isVisible)
    this.tileMap.layers.forEach((layer) => {
      layer.tilemapLayer.setVisible(isVisible)
    })
    this.directionArrow.setVisible(isVisible)
  }
}
