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

export class FitNessMonsterConstants {
  public static WORKOUT_LIST: Workout[] = [
    {
      name: 'Pushups',
      energyCost: 10,
      fitnessGain: 10,
      workoutGameType: WorkoutGameTypes.HOLD_AND_RELEASE,
      minigameConfig: {
        headerText: 'Pushups',
        totalReps: 30,
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
}
