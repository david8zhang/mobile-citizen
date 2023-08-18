import { Constants } from '~/utils/Constants'

interface UIValueBarConfig {
  x: number
  y: number
  maxValue: number
  height: number
  width: number
  borderWidth: number
  bgColor?: number
  showBorder?: boolean
  isVertical?: boolean
  depth?: number
  hideBg: boolean
  changeColorBasedOnPct: boolean
}

export class UIValueBar {
  bar: Phaser.GameObjects.Graphics
  x: number
  y: number
  maxValue: number
  currValue: number

  height: number
  width: number
  showBorder: boolean
  borderWidth: number
  isVertical: boolean = false
  bgColor: number = 0x000000
  hideBg: boolean = false
  changeColorBasedOnPct: boolean = false

  constructor(scene: Phaser.Scene, config: UIValueBarConfig) {
    this.bar = new Phaser.GameObjects.Graphics(scene)
    const {
      x,
      y,
      maxValue,
      width,
      height,
      showBorder,
      borderWidth,
      bgColor,
      changeColorBasedOnPct,
    } = config
    this.x = x
    this.y = y
    this.maxValue = maxValue
    this.currValue = maxValue
    this.width = width
    this.height = height
    this.borderWidth = borderWidth
    this.changeColorBasedOnPct = changeColorBasedOnPct

    if (bgColor) {
      this.bgColor = bgColor
    }

    if (config.hideBg) {
      this.hideBg = config.hideBg
    }

    if (config.isVertical) {
      this.isVertical = config.isVertical
    }

    this.showBorder = showBorder || false
    scene.add.existing(this.bar)
    this.draw()
    this.bar.setDepth(config.depth ? config.depth : 100)
  }

  setVisible(visible: boolean) {
    this.bar.setVisible(visible)
  }

  decrease(amount: number) {
    this.currValue = Math.max(0, this.currValue - amount)
    this.draw()
    return this.currValue === 0
  }

  increase(amount: number) {
    this.currValue = Math.min(this.maxValue, this.currValue + amount)
    this.draw()
    return this.currValue === this.maxValue
  }

  setMaxValue(maxValue: number) {
    this.maxValue = maxValue
    this.draw()
  }

  setCurrValue(currValue: number) {
    this.currValue = currValue
    this.draw()
  }

  draw() {
    this.bar.clear()

    // Border
    const borderWidth = this.showBorder ? this.borderWidth : 0
    this.bar.fillStyle(this.bgColor)

    if (!this.hideBg) {
      this.bar.fillRect(
        this.x - borderWidth / 2,
        this.y - borderWidth / 2,
        this.width + borderWidth,
        this.height + borderWidth
      )
    }

    const percentage = this.currValue / this.maxValue

    if (this.changeColorBasedOnPct) {
      if (percentage >= 0 && percentage <= 0.25) {
        this.bar.fillStyle(0xe74c3c)
      } else if (percentage > 0.25 && percentage <= 0.5) {
        this.bar.fillStyle(0xe67e22)
      } else if (percentage > 0.5 && percentage <= 0.75) {
        this.bar.fillStyle(0xf1c40f)
      } else {
        this.bar.fillStyle(0x2ecc71)
      }
    } else {
      this.bar.fillStyle(0x2ecc71)
    }

    if (this.isVertical) {
      const length = Math.round(percentage * this.height)
      const remainderLength = Math.round((1 - percentage) * this.height)
      this.bar.fillRect(this.x, this.y + remainderLength, this.width, length)
    } else {
      const length = Math.floor(percentage * this.width)
      this.bar.fillRect(this.x, this.y, length, this.height)
    }
  }

  destroy() {
    this.bar.destroy()
  }
}
