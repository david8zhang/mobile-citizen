import { Scene } from 'phaser'
import { DeliveryGame } from '~/apps/DashEats/screens/DeliveryGame'
import { Constants, Direction } from '~/utils/Constants'

export interface MoveControllerConfig {
  scene: Scene
  speed: number
  sprite: Phaser.Physics.Arcade.Sprite
  textures: {
    horizontal: string
    up: string
    down: string
  }
}

export interface MoveControllerInterface {
  detectMovement(): boolean
  stop(): void
  update(): void
}

export class MoveController implements MoveControllerInterface {
  private scene: Scene
  private speed: number
  private sprite: Phaser.Physics.Arcade.Sprite
  private textures: {
    horizontal: string
    up: string
    down: string
  }

  // WASD movement
  private keyW!: Phaser.Input.Keyboard.Key
  private keyA!: Phaser.Input.Keyboard.Key
  private keyS!: Phaser.Input.Keyboard.Key
  private keyD!: Phaser.Input.Keyboard.Key

  private keyUp!: Phaser.Input.Keyboard.Key
  private keyDown!: Phaser.Input.Keyboard.Key
  private keyLeft!: Phaser.Input.Keyboard.Key
  private keyRight!: Phaser.Input.Keyboard.Key

  // Direction that the player is currently facing
  public currDirection: Direction = Direction.DOWN

  constructor(config: MoveControllerConfig) {
    const { scene, speed, sprite, textures } = config
    this.scene = scene
    this.speed = speed
    this.sprite = sprite
    this.textures = textures
    this.setupKeyboardKeys()
  }

  setupKeyboardKeys() {
    this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }

  detectMovement() {
    const leftDown = this.keyA.isDown || this.keyLeft.isDown
    const rightDown = this.keyD.isDown || this.keyRight.isDown
    const upDown = this.keyW.isDown || this.keyUp.isDown
    const downDown = this.keyS.isDown || this.keyDown.isDown
    return leftDown || rightDown || upDown || downDown
  }

  stop() {
    this.sprite.setVelocity(0)
  }

  update() {
    if (
      !this.keyA ||
      !this.keyD ||
      !this.keyW ||
      !this.keyS ||
      !this.keyUp ||
      !this.keyDown ||
      !this.keyLeft ||
      !this.keyRight
    ) {
      return
    }
    const leftDown = this.keyA.isDown || this.keyLeft.isDown
    const rightDown = this.keyD.isDown || this.keyRight.isDown
    const upDown = this.keyW.isDown || this.keyUp.isDown
    const downDown = this.keyS.isDown || this.keyDown.isDown

    if (leftDown || rightDown) {
      this.sprite.setTexture(this.textures.horizontal)
      let velocityX = leftDown ? -this.speed : this.speed
      this.currDirection = leftDown ? Direction.LEFT : Direction.RIGHT
      if (leftDown && rightDown) {
        velocityX = 0
      }
      this.sprite.setVelocityY(0)
      this.sprite.setVelocityX(velocityX)
      this.sprite.setFlipX(leftDown)
    } else {
      this.sprite.setVelocityX(0)
    }
    if (upDown || downDown) {
      let velocityY = upDown ? -this.speed : this.speed
      this.currDirection = upDown ? Direction.UP : Direction.DOWN
      if (upDown && downDown) {
        velocityY = 0
      }
      this.sprite.setFlipX(false)
      this.sprite.setVelocityX(0)
      this.sprite.setVelocityY(velocityY)
      this.sprite.setTexture(upDown ? this.textures.up : this.textures.down)
    } else {
      this.sprite.setVelocityY(0)
    }
    this.sprite.setBodySize(
      this.sprite.displayWidth / DeliveryGame.SCALE,
      this.sprite.displayHeight / DeliveryGame.SCALE
    )
  }
}
