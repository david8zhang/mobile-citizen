import { Home } from '~/scenes/Home'
import { WorkoutMinigame } from './WorkoutMinigame'
import { FitNessMonster } from '../FitNessMonster'

export class HoldAndReleaseGame extends WorkoutMinigame {
  constructor(scene: Home, parent: FitNessMonster) {
    super(scene, parent)
  }

  public setVisible(isVisible: boolean) {}
  public initialize(data: any): void {}
}
