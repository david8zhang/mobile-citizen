import { Constants } from '~/utils/Constants'

import { Video } from './screens/CompletedVideo'

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

export enum EarningPotential {
  HIGH = 'High',
  MEDIUM = 'Med',
  LOW = 'Low',
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

  public static EARNING_POTENTIAL_TO_BASE_REVENUE = {
    [EarningPotential.HIGH]: {
      [SongRank.S]: 10,
      [SongRank.A]: 7.5,
      [SongRank.B]: 6.25,
      [SongRank.D]: 5,
      [SongRank.C]: 4,
      [SongRank.F]: 2.5,
    },
    [EarningPotential.MEDIUM]: {
      [SongRank.S]: 5,
      [SongRank.A]: 4.5,
      [SongRank.B]: 3.75,
      [SongRank.C]: 3,
      [SongRank.D]: 2,
      [SongRank.F]: 1.5,
    },
    [EarningPotential.LOW]: {
      [SongRank.S]: 3,
      [SongRank.A]: 2.75,
      [SongRank.B]: 2,
      [SongRank.C]: 1.75,
      [SongRank.D]: 1,
      [SongRank.F]: 0.5,
    },
  }

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

  public static getRecencyRevenueBonus(creationDate: number, currDate: number) {
    const dateDiff = currDate - creationDate
    return 2 - (2 * dateDiff) / 3
  }

  public static getBaseRevenueFromVideoRank(video: Video) {
    return this.EARNING_POTENTIAL_TO_BASE_REVENUE[video.earningPotential][video.songRank]
  }
}
