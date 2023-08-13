import { Constants } from '~/utils/Constants'
import { SongConfig } from './screens/SelectSound'

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

export enum SongRank {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
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
  public static SOUNDS_LIST: SongConfig[] = [
    {
      name: 'Funny Dance',
      hashtags: '#funny #dance',
      difficulty: 3,
      earningPotential: 3,
      energyCost: 15,
      bpm: 100,
      duration: 5000,
    },
    {
      name: 'Hard Dance',
      hashtags: '#hard #dance',
      difficulty: 5,
      earningPotential: 4,
      energyCost: 40,
      bpm: 150,
      duration: 5000,
    },
    {
      name: 'Meme Dance',
      hashtags: '#meme #dance',
      difficulty: 2,
      earningPotential: 1,
      energyCost: 25,
      bpm: 120,
      duration: 5000,
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

  public static getFinalSongScore(avgScorePerNote: number) {
    if (avgScorePerNote <= 5) {
      return SongRank.F
    }
    if (avgScorePerNote > 5 && avgScorePerNote <= 8) {
      return SongRank.D
    }
    if (avgScorePerNote > 8 && avgScorePerNote <= 12) {
      return SongRank.C
    }
    if (avgScorePerNote >= 12 && avgScorePerNote < 15) {
      return SongRank.B
    }
    if (avgScorePerNote >= 15 && avgScorePerNote < 20) {
      return SongRank.A
    }
    return SongRank.S
  }
}
