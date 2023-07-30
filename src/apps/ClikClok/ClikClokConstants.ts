import { Constants } from '~/utils/Constants'

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum Superlative {
  Good = 'Good',
  Great = 'Great',
  Perfect = 'Perfect',
}

export class ClikClokConstants {
  public static INITIAL_DELAY = 5680
  public static DOUBLE_NOTE_CHANCE = 10
  public static ARROW_SPAWN_POSITIONS = {
    left: { x: 50, y: Constants.WINDOW_HEIGHT },
    up: { x: 110, y: Constants.WINDOW_HEIGHT },
    down: { x: 170, y: Constants.WINDOW_HEIGHT },
    right: { x: 230, y: Constants.WINDOW_HEIGHT },
  }
  public static ARROW_DIFF_DIST = 25
  public static SUPERLATIVE_SCORE = {
    [Superlative.Good]: 10,
    [Superlative.Great]: 15,
    [Superlative.Perfect]: 20,
  }
  public static SOUNDS_LIST = [
    {
      name: 'Funny Dance',
      difficulty: 3,
      earningPotential: 3,
      bpm: 100,
      duration: 30000,
    },
    {
      name: 'Hard Dance',
      difficulty: 5,
      earningPotential: 4,
      bpm: 150,
      duration: 30000,
    },
    {
      name: 'Meme Dance',
      difficulty: 2,
      earningPotential: 1,
      bpm: 120,
      duration: 30000,
    },
  ]

  public static getRandomDoubleDirection() {
    const directionPairings = [
      [Direction.LEFT, Direction.RIGHT],
      [Direction.UP, Direction.RIGHT],
      [Direction.UP, Direction.LEFT],
      [Direction.DOWN, Direction.LEFT],
      [Direction.DOWN, Direction.RIGHT],
    ]
    return directionPairings[Math.floor(Math.random() * directionPairings.length)]
  }

  public static getRandomDirection() {
    const randomNum = Math.floor(Math.random() * 4)
    const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]
    return directions[randomNum]
  }

  public static getSuperlative(yDiff: number) {
    if (yDiff <= 10) {
      return Superlative.Perfect
    }
    if (yDiff <= 15) {
      return Superlative.Great
    }
    if (yDiff <= 25) {
      return Superlative.Good
    }
  }
}
