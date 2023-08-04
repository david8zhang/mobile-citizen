import { SubScreen } from '~/core/SubScreen'
import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'
import { Workout } from '../FitNessMonsterConstants'
import { WorkoutGameTypes } from '../WorkoutGameTypes'
import { HoldAndReleaseGame } from '../workout-games/HoldAndReleaseGame'
import { WorkoutMinigame } from '../workout-games/WorkoutMinigame'

export class WorkoutScreen extends SubScreen {
  private workoutGame!: Workout
  private workoutGameMapping: {
    [key in WorkoutGameTypes]?: WorkoutMinigame
  }
  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.workoutGameMapping = {
      [WorkoutGameTypes.HOLD_AND_RELEASE]: new HoldAndReleaseGame(this.scene, parent),
    }
  }

  public onRender(data?: any): void {
    this.workoutGame = data
  }
  public setVisible(isVisible: boolean): void {}
}
