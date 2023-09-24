import { Constants } from '~/utils/Constants'

import { Video } from './screens/CompletedVideo'
import { Save, SaveKeys } from '~/utils/Save'
import { Grade } from '~/core/TopBar'

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
      [SongRank.S]: 1.5,
      [SongRank.A]: 1.25,
      [SongRank.B]: 1,
      [SongRank.D]: 0.75,
      [SongRank.C]: 0.5,
      [SongRank.F]: 0.25,
    },
    [EarningPotential.MEDIUM]: {
      [SongRank.S]: 0.75,
      [SongRank.A]: 0.5,
      [SongRank.B]: 0.25,
      [SongRank.C]: 0.2,
      [SongRank.D]: 0.15,
      [SongRank.F]: 0.1,
    },
    [EarningPotential.LOW]: {
      [SongRank.S]: 0.2,
      [SongRank.A]: 0.15,
      [SongRank.B]: 0.1,
      [SongRank.C]: 0.05,
      [SongRank.D]: 0.02,
      [SongRank.F]: 0.01,
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

  public static getRecencyBonus(creationDate: number, currDate: number) {
    const dateDiff = currDate - creationDate
    return Math.max(0, 2 - (2 * dateDiff) / 3)
  }

  public static getBaseRevenueFromVideoRank(video: Video) {
    return this.EARNING_POTENTIAL_TO_BASE_REVENUE[video.earningPotential][video.songRank]
  }

  public static getTotalRevenueForVideo(video: Video, recencyBonus: number) {
    return (
      Math.ceil(video.totalViews / 100) * this.getBaseRevenueFromVideoRank(video) * recencyBonus
    )
  }

  /**
   * Views are calculated based on
   *
   * (followerCount * viralityCoefficient) * recencyBonus
   *
   * Virality coefficient is a random number which serves as a multiplier on top of existing follower count
   *
   * @param video
   */
  public static getNewViewsForVideo(recencyBonus: number) {
    const followerCount = Math.max(1, Save.getData(SaveKeys.CLIK_CLOK_FOLLOWERS, 1) as number)
    const viralityCoefficient = this.getViralityCoefficient()
    const totalViews = Math.max(1, Math.round(followerCount * (viralityCoefficient / 100)))
    return Math.round(totalViews * recencyBonus)
  }

  public static getViralityCoefficient() {
    const basePct = Phaser.Math.Between(1, 1000)
    if (basePct > 985) {
      // 1.5% Chance to go very viral
      return Phaser.Math.Between(400, 1000)
    }
    if (basePct > 950) {
      // 5% Chance to go viral
      return Phaser.Math.Between(200, 400)
    }
    return Phaser.Math.Between(10, 100)
  }

  public static getNewFollowers(totalViews: number) {
    const maxFollowers = Math.round(totalViews / 10)
    return Phaser.Math.Between(0, maxFollowers)
  }
}
