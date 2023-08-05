import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'
import { WorkoutMinigame } from './WorkoutMinigame'
import { HoldAndReleaseGameConfig } from './HoldAndReleaseGame'

export interface TapTimingGameConfig {}

export class TapTimingGame extends WorkoutMinigame {
  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
  }

  public setVisible(isVisible: boolean): void {}
  public initialize(data?: (TapTimingGameConfig | HoldAndReleaseGameConfig) | undefined): void {}
}
