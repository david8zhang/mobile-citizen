import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants, Direction } from '~/utils/Constants'
import { MoveController } from '~/core/MoveController'
import { START_POSITIONS, StartPosition } from '../DashEatsConstants'

export class DeliveryGame extends SubScreen {
  private tileMap!: Phaser.Tilemaps.Tilemap
  private carSprite!: Phaser.Physics.Arcade.Sprite
  private moveController!: MoveController
  public static SCALE = 4

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.initTilemap()
    this.initCar()
    this.setupColliders()
    this.setVisible(false)
  }

  initCar() {
    this.carSprite = this.scene.physics.add
      .sprite(0, 0, 'car-red-horizontal')
      .setDepth(Constants.SORT_LAYERS.MODAL)
      .setOrigin(0)
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
    })

    const randomStartPosition = Phaser.Utils.Array.GetRandom(START_POSITIONS) as StartPosition

    const tile = this.tileMap.getTileAt(randomStartPosition.x, randomStartPosition.y, false, 'Road')
    if (tile) {
      this.carSprite.setPosition(tile.pixelX * DeliveryGame.SCALE, tile.pixelY * DeliveryGame.SCALE)
      switch (randomStartPosition.facing) {
        case Direction.UP:
          this.carSprite.setFlipX(false)
          this.carSprite.setTexture(carTextures.up)
          break
        case Direction.DOWN:
          this.carSprite.setFlipX(false)
          this.carSprite.setTexture(carTextures.down)
          break
        case Direction.LEFT:
        case Direction.RIGHT:
          this.carSprite.setFlipX(randomStartPosition.facing == Direction.LEFT)
          this.carSprite.setTexture(carTextures.horizontal)
          break
      }
      this.carSprite.setBodySize(
        this.carSprite.displayWidth / DeliveryGame.SCALE,
        this.carSprite.displayHeight / DeliveryGame.SCALE
      )
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

  public onRender(data?: any): void {
    const parent = this.parent as DashEats
    parent.bottomNav.setVisible(false)
    this.scene.cameras.main.startFollow(this.carSprite, true)
  }

  public setVisible(isVisible: boolean): void {
    this.carSprite.setVisible(isVisible)
    this.tileMap.layers.forEach((layer) => {
      layer.tilemapLayer.setVisible(isVisible)
    })
  }
}
