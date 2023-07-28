import Phaser from 'phaser'
import { App } from '~/apps/App'
import { Bank } from '~/apps/Bank'
import { AppIconBox } from '~/core/AppIconBox'
import { TopBar } from '~/core/TopBar'
import { APP_CONFIGS, AppRoute } from '~/utils/AppConfigs'
import { Constants } from '~/utils/Constants'

export class Home extends Phaser.Scene {
  private topBar!: TopBar
  private apps: AppIconBox[] = []
  private appRouteMapping!: {
    [key in AppRoute]?: App
  }
  private currApp: AppRoute | null = null

  private static APPS_PER_ROW = 4
  private static PADDING_BETWEEN_APPS = 40

  constructor() {
    super('home')
  }
  create() {
    this.cameras.main.setBackgroundColor(0x444444)
    this.appRouteMapping = {
      [AppRoute.BANK]: new Bank(this),
    }
    this.setupTopBar()
    this.setupAppGrid()
    this.setupHomeButton()
  }

  setupHomeButton() {}

  renderApp(appRoute: AppRoute) {
    const appToRender = this.appRouteMapping[appRoute]
    if (this.currApp) {
      const prevApp = this.appRouteMapping[this.currApp]
      if (prevApp) {
        prevApp.onHide()
      }
    }
    if (appToRender) {
      appToRender.render()
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
}
