import { Constants } from '~/utils/Constants'
import { WorkoutGameTypes } from './WorkoutGameTypes'
import { HoldAndReleaseGameConfig } from './workout-games/HoldAndReleaseGame'
import { TapTimingGameConfig } from './workout-games/TapTimingGame'
import { Grade } from '~/core/TopBar'
import { FullnessLevel } from '~/utils/Utils'

export interface Workout {
  name: string
  fullnessCost: number
  fitnessLevelToGainMappings: {
    [key in Grade]: {
      energyCost: number
      fitnessGain: number
      requiredCompletionValue: number
    }
  }
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
  public static REP_QUALITY_COLOR = {
    [RepQuality.GOOD]: 0x2ecc71,
    [RepQuality.AVERAGE]: 0xf1c40f,
    [RepQuality.BAD]: 0xc0392b,
  }

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
      fullnessCost: 20,
      fitnessLevelToGainMappings: {
        [Grade.F]: {
          energyCost: 25,
          fitnessGain: 50,
          requiredCompletionValue: 5,
        },
        [Grade.D]: {
          energyCost: 20,
          fitnessGain: 65,
          requiredCompletionValue: 10,
        },
        [Grade.C]: {
          energyCost: 15,
          fitnessGain: 75,
          requiredCompletionValue: 15,
        },
        [Grade.B]: {
          energyCost: 10,
          fitnessGain: 100,
          requiredCompletionValue: 20,
        },
        [Grade.A]: {
          energyCost: 5,
          fitnessGain: 150,
          requiredCompletionValue: 25,
        },
        [Grade.S]: {
          energyCost: 2,
          fitnessGain: 200,
          requiredCompletionValue: 30,
        },
      },
      workoutGameType: WorkoutGameTypes.HOLD_AND_RELEASE,
      minigameConfig: {
        headerText: 'Pushups',
        increasePerFrame: 2,
        perfectRepWidthPct: 0.75,
        repRanges: {
          [RepQuality.GOOD]: 4, // Rectangle width in pixels
          [RepQuality.AVERAGE]: 20,
          [RepQuality.BAD]: 50,
        },
        barPosY: Constants.WINDOW_HEIGHT / 2,
      },
    },
    {
      name: 'Jogging',
      fullnessCost: 20,
      fitnessLevelToGainMappings: {
        [Grade.F]: {
          energyCost: 40,
          fitnessGain: 75,
          requiredCompletionValue: 15, // seconds,
        },
        [Grade.D]: {
          energyCost: 30,
          fitnessGain: 100,
          requiredCompletionValue: 20,
        },
        [Grade.C]: {
          energyCost: 25,
          fitnessGain: 125,
          requiredCompletionValue: 25,
        },
        [Grade.B]: {
          energyCost: 15,
          fitnessGain: 150,
          requiredCompletionValue: 30,
        },
        [Grade.A]: {
          energyCost: 10,
          fitnessGain: 200,
          requiredCompletionValue: 35,
        },
        [Grade.S]: {
          energyCost: 5,
          fitnessGain: 300,
          requiredCompletionValue: 40,
        },
      },
      workoutGameType: WorkoutGameTypes.TAP_TIMING,
      minigameConfig: {
        headerText: 'Jogging',
      },
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

  public static fullnessLevelToEnergyCostPct(fullnessLevel: FullnessLevel) {
    switch (fullnessLevel) {
      case FullnessLevel.FULL: {
        return 0.75
      }
      case FullnessLevel.SATISFIED: {
        return 1
      }
      case FullnessLevel.HUNGRY: {
        return 1.25
      }
      case FullnessLevel.STARVING: {
        return 1.5
      }
    }
  }
}
