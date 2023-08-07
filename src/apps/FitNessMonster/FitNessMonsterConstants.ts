import { Constants } from '~/utils/Constants'
import { WorkoutGameTypes } from './WorkoutGameTypes'
import { HoldAndReleaseGameConfig } from './workout-games/HoldAndReleaseGame'
import { TapTimingGameConfig } from './workout-games/TapTimingGame'

export interface Workout {
  name: string
  energyCost: number
  fitnessGain: number
  workoutGameType: WorkoutGameTypes
  minigameConfig: HoldAndReleaseGameConfig | TapTimingGameConfig
}

export enum RepQuality {
  GOOD = 'GOOD',
  AVERAGE = 'AVERAGE',
  BAD = 'BAD',
}

export enum WorkoutGrade {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  F = 'F',
}

export class FitNessMonsterConstants {
  public static REP_QUALITY_TO_SCORE_AMT = {
    [RepQuality.GOOD]: 100,
    [RepQuality.AVERAGE]: 70,
    [RepQuality.BAD]: 50,
  }

  public static WORKOUT_GRADE_BONUS_PCT = {
    [WorkoutGrade.S]: 1,
    [WorkoutGrade.A]: 0.75,
    [WorkoutGrade.B]: 0.5,
    [WorkoutGrade.C]: 0.25,
    [WorkoutGrade.D]: 0,
    [WorkoutGrade.F]: 0,
  }

  public static WORKOUT_LIST: Workout[] = [
    {
      name: 'Pushups',
      energyCost: 10,
      fitnessGain: 10,
      workoutGameType: WorkoutGameTypes.HOLD_AND_RELEASE,
      minigameConfig: {
        headerText: 'Pushups',
        totalReps: 2,
        increasePerFrame: 2,
        perfectRepWidthPct: 0.75,
        repRanges: {
          [RepQuality.GOOD]: 4,
          [RepQuality.AVERAGE]: 20,
        },
        barPosY: Constants.WINDOW_HEIGHT / 2 + 100,
      },
    },
    {
      name: 'Running',
      energyCost: 10,
      fitnessGain: 10,
      workoutGameType: WorkoutGameTypes.TAP_TIMING,
      minigameConfig: {},
    },
  ]

  public static getWorkoutGradeForScore(scoreAvg: number) {
    if (scoreAvg < 60) {
      return WorkoutGrade.F
    }
    if (scoreAvg >= 60 && scoreAvg < 70) {
      return WorkoutGrade.D
    }
    if (scoreAvg >= 70 && scoreAvg < 80) {
      return WorkoutGrade.C
    }
    if (scoreAvg >= 80 && scoreAvg < 90) {
      return WorkoutGrade.B
    }
    if (scoreAvg >= 90 && scoreAvg < 100) {
      return WorkoutGrade.A
    }
    return WorkoutGrade.S
  }
}
