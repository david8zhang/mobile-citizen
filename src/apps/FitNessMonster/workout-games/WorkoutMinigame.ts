import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'
import { TapTimingGameConfig } from './TapTimingGame'
import { HoldAndReleaseGameConfig } from './HoldAndReleaseGame'
import { Workout } from '../FitNessMonsterConstants'

type MinigameConfig = TapTimingGameConfig | HoldAndReleaseGameConfig

export abstract class WorkoutMinigame {
  protected scene: Home
  protected parent: FitNessMonster
  constructor(scene: Home, parent: FitNessMonster) {
    this.scene = scene
    this.parent = parent
  }

  public abstract initialize(data: MinigameConfig, workout: Workout): void
  public abstract setVisible(isVisible: boolean): void
}
