import { Home } from '~/scenes/Home'
import { Constants } from '~/utils/Constants'

export interface ChartConfig {
  data: {
    x: number
    y: number
  }[]
  position: {
    x: number
    y: number
  }
  width: number
  height: number
}

export class Chart {
  private scene: Home
  private config: ChartConfig
  private yScale!: number
  private lines!: Phaser.GameObjects.Group
  private placeholderText: Phaser.GameObjects.Text | null = null

  constructor(scene: Home, config: ChartConfig) {
    this.scene = scene
    this.config = config
    this.setupYScale()
    this.setupChart(config)
  }

  setupYScale() {
    let maxY = -1
    this.config.data.forEach((point) => {
      maxY = Math.max(point.y, maxY)
    })
    this.yScale = maxY / this.config.height
  }

  get x() {
    return this.config.position.x
  }

  get y() {
    return this.config.position.y
  }

  get displayHeight() {
    return this.config.height
  }

  get displayWidth() {
    return this.config.width
  }

  setupChart(config: ChartConfig) {
    this.lines = this.scene.add.group()
    if (config.data.length == 0) {
      this.placeholderText = this.scene.add
        .text(Constants.WINDOW_WIDTH / 2, (config.position.y + config.height) / 2, 'No data', {
          fontSize: '30px',
          color: '#777777',
          fontFamily: 'Arial',
        })
        .setDepth(Constants.SORT_LAYERS.APP_UI)
      this.placeholderText.setPosition(
        Constants.WINDOW_WIDTH / 2 - this.placeholderText.displayWidth / 2,
        (config.position.y + config.height) / 2 + this.placeholderText.displayHeight / 2
      )
    } else {
      const widthPerInterval = config.width / config.data.length
      let prevX = config.position.x
      let prevY = this.getYPosForPoint(config.data[0].y)
      config.data.slice(1).forEach((point) => {
        const xPos = prevX + widthPerInterval
        const yPos = this.getYPosForPoint(point.y)
        const line = this.scene.add
          .line(0, 0, prevX, prevY, xPos, yPos, 0x000000)
          .setDepth(Constants.SORT_LAYERS.APP_UI)
          .setLineWidth(1)
          .setOrigin(0)
        this.lines.add(line)
        prevX = xPos
        prevY = yPos
      })
    }
  }

  getYPosForPoint(y: number) {
    const scaledY = y / this.yScale
    return this.config.position.y + this.config.height - scaledY
  }

  setVisible(isVisible: boolean) {
    if (this.placeholderText) {
      this.placeholderText.setVisible(isVisible)
    }
    this.lines.setVisible(isVisible)
  }

  destroy() {
    this.lines.destroy(true)
  }
}
