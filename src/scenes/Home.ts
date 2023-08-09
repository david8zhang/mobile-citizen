import Phaser from 'phaser'
import { App } from '~/apps/App'
import { Bank } from '~/apps/Bank/Bank'
import { ClikClok } from '~/apps/ClikClok/ClikClok'
import { FitNessMonster } from '~/apps/FitNessMonster/FitNessMonster'
import { AppIconBox } from '~/core/AppIconBox'
import { FitnessGrade, TopBar } from '~/core/TopBar'
import { APP_CONFIGS, AppRoute } from '~/utils/AppConfigs'
import { Constants } from '~/utils/Constants'
import { Save, SaveKeys } from '~/utils/Save'
import { Utils } from '~/utils/Utils'

export class Home extends Phaser.Scene {
  public rexUI: any
  public topBar!: TopBar
  private apps: AppIconBox[] = []
  private appRouteMapping!: {
    [key in AppRoute]?: App
  }
  private currApp: AppRoute | null = null
  public homeButton!: Phaser.GameObjects.Text
  public updateCallbacks: Function[] = []

  private static APPS_PER_ROW = 4
  private static PADDING_BETWEEN_APPS = 40

  constructor() {
    super('home')
  }
  create() {
    this.initializeSaveData()
    this.cameras.main.setBackgroundColor(0x444444)
    this.appRouteMapping = {
      [AppRoute.BANK]: new Bank(this),
      [AppRoute.CLIK_CLOK]: new ClikClok(this),
      [AppRoute.FIT_NESS_MONSTER]: new FitNessMonster(this),
    }
    this.setupTopBar()
    this.setupAppGrid()
    this.setupHomeButton()
  }

  initializeSaveData() {
    if (Save.getData(SaveKeys.BANK_BALANCE) == undefined) {
      Save.setData(SaveKeys.BANK_BALANCE, 0)
      Save.setData(SaveKeys.FITNESS_LEVEL, 1000)
      Save.setData(SaveKeys.FULLNESS_LEVEL, 100)
      Save.setData(SaveKeys.RECENT_TRANSACTIONS, [])
      Save.setData(SaveKeys.CLIK_CLOK_VIDEOS, [])
      Save.setData(SaveKeys.CURR_DATE, 1)
      Save.setData(SaveKeys.ENERGY_LEVEL, 100)
    }
  }

  goBackHome() {
    if (this.currApp) {
      const appToHide = this.appRouteMapping[this.currApp]
      if (appToHide) {
        appToHide.onHide()
        this.homeButton.setStyle({ color: 'white' })
        this.currApp = null
      }
    }
  }

  updateTopBarStats() {
    this.topBar.updateStats()
  }

  setupHomeButton() {
    this.homeButton = this.add
      .text(0, 0, 'Home', {
        fontSize: '15px',
        color: 'white',
      })
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.homeButton.setAlpha(0.5)
      })
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.homeButton.setAlpha(1)
        this.goBackHome()
      })
      .on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
        this.homeButton.setAlpha(1)
        this.goBackHome()
      })
      .setDepth(150)
    this.homeButton.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.homeButton.displayWidth / 2,
      Constants.WINDOW_HEIGHT - 30
    )
  }

  renderApp(appRoute: AppRoute) {
    const appToRender = this.appRouteMapping[appRoute]
    if (appToRender) {
      appToRender.render(() => {
        this.homeButton
          .setStyle({
            color: 'black',
          })
          .setDepth(Constants.SORT_LAYERS.APP_UI)
      })
      this.currApp = appRoute
    }
  }

  setupTopBar() {
    this.topBar = new TopBar(this)
  }

  setupAppGrid() {
    const startX = Home.PADDING_BETWEEN_APPS
    const startY =
      this.topBar.bgRect.y + this.topBar.bgRect.displayHeight + Home.PADDING_BETWEEN_APPS
    let currX = startX
    let currY = startY
    const appBoxWidth =
      Constants.WINDOW_WIDTH / Home.APPS_PER_ROW -
      Home.PADDING_BETWEEN_APPS * ((Home.APPS_PER_ROW + 1) / Home.APPS_PER_ROW)
    APP_CONFIGS.forEach((config, index) => {
      if (index !== 0 && index % 4 == 0) {
        currX = startX
        currY += appBoxWidth + Home.PADDING_BETWEEN_APPS
      }
      this.apps.push(
        new AppIconBox(this, {
          position: {
            x: currX,
            y: currY,
          },
          width: appBoxWidth,
          height: appBoxWidth,
          name: config.name,
          onClick: () => {
            this.renderApp(config.route)
          },
        })
      )
      currX += Home.PADDING_BETWEEN_APPS + appBoxWidth
    })
  }

  update(): void {
    this.updateCallbacks.forEach((updateFn) => {
      updateFn()
    })
  }
}
