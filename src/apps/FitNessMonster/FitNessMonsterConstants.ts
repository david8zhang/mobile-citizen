import { Constants } from '~/utils/Constants'
import { WorkoutGameTypes } from './WorkoutGameTypes'
import { HoldAndReleaseGameConfig } from './workout-games/HoldAndReleaseGame'
import { TapTimingGameConfig } from './workout-games/TapTimingGame'
import { FitnessGrade } from '~/core/TopBar'
import { FullnessLevel } from '~/utils/Utils'

export interface Workout {
  name: string
  fullnessCost: number
  fitnessLevelToGainMappings: {
    [key in FitnessGrade]: {
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
        [FitnessGrade.F]: {
          energyCost: 40,
          fitnessGain: 10,
          requiredCompletionValue: 5,
        },
        [FitnessGrade.D]: {
          energyCost: 35,
          fitnessGain: 15,
          requiredCompletionValue: 10,
        },
        [FitnessGrade.C]: {
          energyCost: 30,
          fitnessGain: 20,
          requiredCompletionValue: 15,
        },
        [FitnessGrade.B]: {
          energyCost: 25,
          fitnessGain: 25,
          requiredCompletionValue: 20,
        },
        [FitnessGrade.A]: {
          energyCost: 20,
          fitnessGain: 30,
          requiredCompletionValue: 25,
        },
        [FitnessGrade.S]: {
          energyCost: 15,
          fitnessGain: 35,
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
        },
        barPosY: Constants.WINDOW_HEIGHT / 2 + 100,
      },
    },
    {
      name: 'Jogging',
      fullnessCost: 20,
      fitnessLevelToGainMappings: {
        [FitnessGrade.F]: {
          energyCost: 40,
          fitnessGain: 30,
          requiredCompletionValue: 60, // seconds,
        },
        [FitnessGrade.D]: {
          energyCost: 35,
          fitnessGain: 25,
          requiredCompletionValue: 90,
        },
        [FitnessGrade.C]: {
          energyCost: 30,
          fitnessGain: 20,
          requiredCompletionValue: 120,
        },
        [FitnessGrade.B]: {
          energyCost: 25,
          fitnessGain: 15,
          requiredCompletionValue: 150,
        },
        [FitnessGrade.A]: {
          energyCost: 20,
          fitnessGain: 12,
          requiredCompletionValue: 180,
        },
        [FitnessGrade.S]: {
          energyCost: 15,
          fitnessGain: 10,
          requiredCompletionValue: 210,
        },
      },
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
