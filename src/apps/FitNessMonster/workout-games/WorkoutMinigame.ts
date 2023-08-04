import { Home } from '~/scenes/Home'
import { FitNessMonster } from '../FitNessMonster'

export abstract class WorkoutMinigame {
  private scene: Home
  private parent: FitNessMonster
  constructor(scene: Home, parent: FitNessMonster) {
    this.scene = scene
    this.parent = parent
  }

  public abstract setVisible(isVisible: boolean): void
  public abstract initialize(data: any): void
}
