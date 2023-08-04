import { WorkoutGameTypes } from './WorkoutGameTypes'

export interface Workout {
  name: string
  energyCost: number
  fitnessGain: number
  workoutGameType: WorkoutGameTypes
}

export class FitNessMonsterConstants {
  public static WORKOUT_LIST: Workout[] = [
    {
      name: 'Pushups',
      energyCost: 10,
      fitnessGain: 10,
      workoutGameType: WorkoutGameTypes.HOLD_AND_RELEASE,
    },
    {
      name: 'Running',
      energyCost: 10,
      fitnessGain: 10,
      workoutGameType: WorkoutGameTypes.TAP_TIMING,
    },
  ]
}
