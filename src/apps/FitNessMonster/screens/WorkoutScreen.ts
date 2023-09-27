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
  private selectedWorkoutType: WorkoutGameTypes | null = null

  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
    this.workoutGameMapping = {
      [WorkoutGameTypes.HOLD_AND_RELEASE]: new HoldAndReleaseGame(scene, parent),
    }
  }

  public onRender(data?: any): void {
    this.workoutGame = data as Workout
    const workoutType = this.workoutGame.workoutGameType
    this.selectedWorkoutType = workoutType
    const workoutMinigame = this.workoutGameMapping[workoutType]
    if (workoutMinigame) {
      const parent = this.parent as FitNessMonster
      parent.bottomNav.setVisible(false)
      this.scene.setPreventAction(true)
      workoutMinigame.initialize(this.workoutGame.minigameConfig, this.workoutGame)
    }
  }

  public onHide(): void {
    if (this.selectedWorkoutType) {
      const workoutMinigame = this.workoutGameMapping[this.selectedWorkoutType]
      if (workoutMinigame) {
        workoutMinigame.setVisible(false)
      }
    }
  }

  public setVisible(isVisible: boolean): void {}
}
