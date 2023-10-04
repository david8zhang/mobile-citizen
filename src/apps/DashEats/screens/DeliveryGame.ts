import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { DashEats } from '../DashEats'
import { Constants } from '~/utils/Constants'
import { MoveController } from '~/core/MoveController'

export class DeliveryGame extends SubScreen {
  private tileMap!: Phaser.Tilemaps.Tilemap
  private carSprite!: Phaser.Physics.Arcade.Sprite
  private moveController!: MoveController
  public static SCALE = 4

  constructor(scene: Home, parent: DashEats) {
    super(scene, parent)
    this.initCar()
    this.initTilemap()
    this.setVisible(false)
  }

  initCar() {
    this.carSprite = this.scene.physics.add
      .sprite(0, 0, 'car-red-horizontal')
      .setDepth(Constants.SORT_LAYERS.MODAL)
      .setOrigin(0)
      .setScale(4)
    this.scene.physics.world.enableBody(this.carSprite, Phaser.Physics.Arcade.DYNAMIC_BODY)
    this.moveController = new MoveController({
      scene: this.scene,
      speed: 150,
      sprite: this.carSprite,
      textures: {
        horizontal: 'car-red-horizontal',
        up: 'car-red-up',
        down: 'car-red-down',
      },
    })
    this.scene.updateCallbacks.push(() => {
      this.moveController.update()
    })
  }

  initTilemap() {
    this.tileMap = this.scene.make.tilemap({
      key: 'dasheats-city',
    })
    const tileset = this.tileMap.addTilesetImage('tilemap_packed', 'tilemap_packed')
    const roadLayer = this.createLayer('Road', tileset)
    const buildingLayer = this.createLayer('Buildings', tileset)
    this.scene.physics.add.collider(this.carSprite, buildingLayer)
    this.scene.cameras.main.setBounds(
      0,
      0,
      roadLayer.width * DeliveryGame.SCALE,
      roadLayer.height * DeliveryGame.SCALE
    )
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
