import { ScrollableListElement, ScrollablePanel } from '~/core/ScrollablePanel'
import { Constants } from '~/utils/Constants'

export class Test extends Phaser.Scene {
  constructor() {
    super('test')
  }

  create() {
    // const rectangles: Phaser.GameObjects.Rectangle[] = []
    // const textLines: Phaser.GameObjects.Text[] = []

    // const graphics = this.add.graphics()
    // graphics.fillStyle(0xffffff, 0)
    // graphics.fillRect(15, 15, Constants.WINDOW_WIDTH - 30, 400)
    // const mask = graphics.createGeometryMask()
    // const layer = this.add.layer()
    // layer.setMask(mask)
    // const panel = this.add
    //   .rectangle(15, 15, Constants.WINDOW_WIDTH - 30, 400, 0x666666, 0)
    //   .setOrigin(0)
    //   .setInteractive()

    // const group = this.add.group()
    // rectangles.forEach((rect) => {
    //   group.add(rect)
    //   layer.add(rect)
    // })
    // textLines.forEach((text) => {
    //   group.add(text)
    //   layer.add(text)
    // })
    // layer.add(panel)

    // const firstElem = rectangles[0]
    // const topYBounds = firstElem.y
    // const lastElem = rectangles[rectangles.length - 1]
    // const bottomYBounds = 400 - lastElem.displayHeight / 2
    // this.input.on('gameobjectwheel', (pointer, gameObject, deltaX, deltaY, deltaZ) => {
    //   let scrollAmount = 12 * (deltaY > 0 ? 1 : -1)

    //   // Set scrolling boundaries
    //   if (firstElem.y + scrollAmount > topYBounds) {
    //     scrollAmount = topYBounds - firstElem.y
    //   } else if (lastElem.y + scrollAmount < bottomYBounds) {
    //     scrollAmount = bottomYBounds - lastElem.y
    //   }

    //   group.incY(scrollAmount)
    // })
    const scrollableListElements = this.generateListElements()
    const scrollablePanel = new ScrollablePanel(this, {
      elements: scrollableListElements,
      width: Constants.WINDOW_WIDTH - 30,
      height: 400,
      position: {
        x: 15,
        y: 15,
      },
      scrollSpeed: 15,
      depth: Constants.SORT_LAYERS.APP_UI,
    })
  }

  generateListElements(): ScrollableListElement[] {
    let yPos = 15
    const rectHeight = 40
    const result: ScrollableListElement[] = []
    for (let i = 1; i <= 40; i++) {
      const newRect = this.add
        .rectangle(15, yPos, Constants.WINDOW_WIDTH - 30, rectHeight, 0xffffff)
        .setOrigin(0)
        .setInteractive()
        .on(Phaser.Input.Events.POINTER_UP, () => {
          console.log('clicked rectangle: ', newRect)
        })
      const newText = this.add.text(15, yPos, `Item ${i}`, {
        fontSize: '28px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      yPos += rectHeight + 15
      const newScrollableListElement: ScrollableListElement = {
        bgPanel: newRect,
        additionalElements: [newText],
      }
      result.push(newScrollableListElement)
    }
    return result
  }
}
