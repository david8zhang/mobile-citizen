import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { MoveController } from '~/core/MoveController'
import { DeliveryJob } from '../DashEatsConstants'
import { Utils } from '~/utils/Utils'
import { GameUI } from '~/scenes/GameUI'

export class DeliveryGame extends SubScreen {
  private tileMap!: Phaser.Tilemaps.Tilemap
  private carSprite!: Phaser.Physics.Arcade.Sprite
  private moveController!: MoveController
  private deliveryJob!: DeliveryJob
  private line!: Phaser.Geom.Line
  private rectangle!: Phaser.Geom.Rectangle
  private graphics: Phaser.GameObjects.Graphics
  private directionArrow!: Phaser.GameObjects.Sprite

  public static SCALE = 4

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.initTilemap()
    this.initCar()
    this.setupColliders()
    this.initDirectionArrow()
    this.setVisible(false)
    this.graphics = this.scene.add.graphics()
    this.graphics.lineStyle(1, 0xff0000)
    this.graphics.setDepth(Constants.SORT_LAYERS.APP_UI + 100)
    this.line = new Phaser.Geom.Line(this.carSprite.x, this.carSprite.y, 0, 0)
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
        tile.setAlpha(0.5)
        const tileWorldX = tile.pixelX * DeliveryGame.SCALE
        const tileWorldY = tile.pixelY * DeliveryGame.SCALE
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

  updateCarPositionBasedOnJob() {
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

  public onRender(data: DeliveryJob): void {
    this.deliveryJob = data
    const parent = this.parent as DashEats
    parent.bottomNav.setVisible(false)
    this.scene.cameras.main.startFollow(this.carSprite, true)
    this.updateCarPositionBasedOnJob()

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
