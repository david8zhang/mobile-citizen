import { Scene } from 'phaser'

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

export interface ScrollableListElement {
  bgPanel: Phaser.GameObjects.Rectangle
  additionalElements: Phaser.GameObjects.GameObject[]
}

export interface ScrollablePanelConfig {
  position: {
    x: number
    y: number
  }
  width: number
  height: number
  depth: number
  elements: ScrollableListElement[]
  scrollSpeed: number
}

export class ScrollablePanel {
  private graphics!: Phaser.GameObjects.Graphics
  private scene: Scene
  private group!: Phaser.GameObjects.Group
  private elements: ScrollableListElement[] = []
  private layer: Phaser.GameObjects.Layer
  private listBounds: Phaser.Geom.Rectangle
  private isDragging: boolean = false

  constructor(scene: Scene, config: ScrollablePanelConfig) {
    this.scene = scene
    this.graphics = this.scene.add.graphics()
    this.graphics.setDepth(config.depth)
    this.graphics.fillStyle(0xffffff, 0)
    this.graphics.fillRect(config.position.x, config.position.y, config.width, config.height)
    this.listBounds = new Phaser.Geom.Rectangle(
      config.position.x,
      config.position.y,
      config.width,
      config.height
    )

    const mask = this.graphics.createGeometryMask()
    this.layer = this.scene.add.layer()
    this.layer.setMask(mask)
    this.layer.setDepth(config.depth)

    this.group = this.scene.add.group()
    this.group.setDepth(config.depth)
    this.elements = config.elements

    config.elements.forEach((elem) => {
      this.group.add(elem.bgPanel)
      this.layer.add(elem.bgPanel)
      elem.additionalElements.forEach((elem) => {
        this.group.add(elem)
        this.layer.add(elem)
      })
    })
    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.isDragging = true
    })

    let prevWorldY = -1
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, () => {
      if (this.isDragging) {
        const pointer = this.scene.input.mousePointer
        if (!this.listBounds.contains(pointer.worldX, pointer.worldY)) {
          this.isDragging = false
        }
        if (prevWorldY == -1) {
          prevWorldY = pointer.worldY
        } else {
          const newConfig = { ...config, scrollSpeed: config.scrollSpeed * 0.1 }
          if (pointer.worldY > prevWorldY) {
            this.handleScroll(newConfig, ScrollDirection.DOWN)
          } else if (pointer.worldY < prevWorldY) {
            this.handleScroll(newConfig, ScrollDirection.UP)
          }
          prevWorldY = pointer.worldY
        }
      }
    })

    this.scene.input.on(Phaser.Input.Events.POINTER_UP, () => {
      this.isDragging = false
    })

    this.scene.input.on(
      Phaser.Input.Events.POINTER_WHEEL,
      (pointer, gameObject, deltaX, deltaY, deltaZ) => {
        if (this.listBounds.contains(pointer.worldX, pointer.worldY)) {
          this.handleScroll(config, deltaY >= 0 ? ScrollDirection.DOWN : ScrollDirection.UP)
        }
      }
    )
  }

  handleScroll(config: ScrollablePanelConfig, scrollDirection: ScrollDirection) {
    const firstElemPanel = config.elements[0].bgPanel
    const lastElemPanel = config.elements[config.elements.length - 1].bgPanel
    const topYBounds = config.position.y
    const bottomYBounds = config.position.y + config.height - lastElemPanel.displayHeight
    let scrollAmount = config.scrollSpeed
    // Set scrolling boundaries
    if (scrollDirection === ScrollDirection.UP) {
      if (lastElemPanel.y - scrollAmount < bottomYBounds) {
        scrollAmount = Math.max(0, lastElemPanel.y - bottomYBounds)
      }
      this.group.incY(-scrollAmount)
    } else {
      if (firstElemPanel.y + scrollAmount > topYBounds) {
        scrollAmount = topYBounds - firstElemPanel.y
      }
      this.group.incY(scrollAmount)
    }
  }

  setVisible(isVisible: boolean) {
    this.group.setVisible(isVisible)
    this.graphics.setVisible(isVisible)
    this.elements.forEach((element) => {
      element.bgPanel.setVisible(isVisible)
      element.additionalElements.forEach((e: any) => {
        e.setVisible(isVisible)
      })
    })
    this.layer.setVisible(isVisible)
  }

  destroy() {
    this.group.clear()
    this.graphics.destroy()
    this.layer.destroy()
  }
}
