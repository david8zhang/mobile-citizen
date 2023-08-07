import { Home } from '~/scenes/Home'
import { App } from '../App'
import { FNM_BottomNav } from './FNMBottomNav'
import { FNM_ScreenTypes } from './FNMScreenTypes'
import { SubScreen } from '~/core/SubScreen'
import { FitnessStats } from './screens/FitnessStats'
import { WorkoutSelect } from './screens/WorkoutSelect'
import { WorkoutScreen } from './screens/WorkoutScreen'
import { CompletedWorkout } from './screens/CompletedWorkout'

export class FitNessMonster extends App {
  private bottomNav: FNM_BottomNav
  private screenMappings: {
    [key in FNM_ScreenTypes]?: SubScreen
  }
  private currSubscreen: FNM_ScreenTypes = FNM_ScreenTypes.FITNESS_STATS

  constructor(scene: Home) {
    super(scene)
    this.bottomNav = new FNM_BottomNav(this.scene, {
      onRoute: (route: FNM_ScreenTypes) => {
        this.renderSubscreen(route)
      },
    })
    this.screenMappings = {
      [FNM_ScreenTypes.FITNESS_STATS]: new FitnessStats(this.scene, this),
      [FNM_ScreenTypes.CHOOSE_WORKOUT]: new WorkoutSelect(this.scene, this),
      [FNM_ScreenTypes.WORKOUT_GAME]: new WorkoutScreen(this.scene, this),
      [FNM_ScreenTypes.COMPLETED_WORKOUT]: new CompletedWorkout(this.scene, this),
    }
    this.bgRect.setFillStyle(0xeeeeee)
    this.setVisible(false)
  }

  renderSubscreen(newSubscreen: FNM_ScreenTypes, data?: any) {
    if (this.currSubscreen !== newSubscreen) {
      const prevSubscreen = this.screenMappings[this.currSubscreen]
      if (prevSubscreen) {
        prevSubscreen.onHide()
        prevSubscreen.setVisible(false)
      }
    }
    this.currSubscreen = newSubscreen
    const subscreen = this.screenMappings[newSubscreen]
    if (subscreen) {
      subscreen.onRender(data)
      subscreen.setVisible(true)
    }
  }

  hideSubscreen() {
    const subscreen = this.screenMappings[this.currSubscreen]
    if (subscreen) {
      subscreen.setVisible(false)
    }
  }

  public setVisible(isVisible: boolean): void {
    this.bgRect.setVisible(isVisible)
    this.bottomNav.setVisible(isVisible)
  }

  public onHide(onComplete?: Function | undefined): void {
    this.hideSubscreen()
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public render(onComplete?: Function | undefined): void {
    super.render(() => {
      this.renderSubscreen(FNM_ScreenTypes.FITNESS_STATS)
      if (onComplete) {
        onComplete()
      }
    })
  }
}
