import { Home } from '~/scenes/Home'
import { InputArrow } from './InputArrow'
import { RecordVideo } from '../screens/RecordVideo'
import { Constants } from '~/utils/Constants'
import { Direction } from '../ClikClokConstants'

export class InputArrowZone {
  private scene: Home
  private parent: RecordVideo
  public arrows!: {
    [key in Direction]?: InputArrow
  }

  constructor(scene: Home, parent: RecordVideo) {
    this.scene = scene
    this.parent = parent
    this.createArrows()
    this.setupKeyboardListeners()
  }

  public createArrows() {
    let xPos = 50
    this.arrows = {}
    const directions = [Direction.LEFT, Direction.UP, Direction.DOWN, Direction.RIGHT]
    directions.forEach((dir) => {
      const config = {
        position: {
          x: xPos,
          y: Constants.TOP_BAR_HEIGHT + 75,
        },
        direction: dir,
      }
      xPos += 60
      this.arrows[dir] = new InputArrow(this.scene, this.parent, config)
    })
  }

  setupKeyboardListeners() {
    let direction: Direction
    this.scene.input.keyboard.on('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp': {
          direction = Direction.UP
          break
        }
        case 'ArrowDown': {
          direction = Direction.DOWN
          break
        }
        case 'ArrowLeft': {
          direction = Direction.LEFT
          break
        }
        case 'ArrowRight': {
          direction = Direction.RIGHT
          break
        }
      }
      const inputArrow = this.arrows[direction]
      if (inputArrow) {
        inputArrow.highlight()
        inputArrow.removeOverlappingArrow()
      }
    })

    this.scene.input.keyboard.on('keyup', (event) => {
      switch (event.code) {
        case 'ArrowUp': {
          direction = Direction.UP
          break
        }
        case 'ArrowDown': {
          direction = Direction.DOWN
          break
        }
        case 'ArrowLeft': {
          direction = Direction.LEFT
          break
        }
        case 'ArrowRight': {
          direction = Direction.RIGHT
          break
        }
      }
      const inputArrow = this.arrows[direction]
      if (inputArrow) {
        inputArrow.dehighlight()
      }
    })
  }

  setVisible(isVisible: boolean) {
    Object.keys(this.arrows).forEach((key) => {
      this.arrows[key].setVisible(isVisible)
    })
  }
}
