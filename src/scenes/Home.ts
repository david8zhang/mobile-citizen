import Phaser from 'phaser'
import { App } from '~/apps/App'
import { Bank, BankTransactions } from '~/apps/Bank/Bank'
import { ClikClok } from '~/apps/ClikClok/ClikClok'
import { DashEats } from '~/apps/DashEats/DashEats'
import { FitNessMonster } from '~/apps/FitNessMonster/FitNessMonster'
import { AppIconBox } from '~/core/AppIconBox'
import { Notification, NotificationListScreen } from '~/core/NotificationListScreen'
import { OnScreenNotification } from '~/core/OnScreenNotification'
import { ProgressDayConfirmModal } from '~/core/ProgressDayConfirmModal'
import { ProgressDayOverlayScreen } from '~/core/ProgressDayOverlayScreen'
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
  private progressDayConfirmModal!: ProgressDayConfirmModal
  private progressDayOverlayScreen!: ProgressDayOverlayScreen
  public onProgressDayCallbacks: Function[] = []
  private notificationListScreen!: NotificationListScreen
  private onScreenNotification!: OnScreenNotification

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
      [AppRoute.DASH_EATS]: new DashEats(this),
    }
    this.setupTopBar()
    this.setupAppGrid()
    this.setupNotifications()
    this.setupHomeButton()
    this.setupProgressDayUI()
  }

  showOnScreenNotification(notification: Notification) {
    this.onScreenNotification.setVisible(true)
    this.onScreenNotification.showNotification(notification)
  }

  setupNotifications() {
    this.notificationListScreen = new NotificationListScreen(this)
    this.onScreenNotification = new OnScreenNotification(this)
  }

  setupProgressDayUI() {
    this.progressDayConfirmModal = new ProgressDayConfirmModal(this)
    this.progressDayOverlayScreen = new ProgressDayOverlayScreen(this)
  }

  initializeSaveData() {
    if (Save.getData(SaveKeys.BANK_BALANCE) == undefined) {
      Save.setData(SaveKeys.BANK_BALANCE, 100)
      Save.setData(SaveKeys.FITNESS_LEVEL, Constants.DEFAULT_FITNESS_LEVEL)
      Save.setData(SaveKeys.FULLNESS_LEVEL, Constants.DEFAULT_FULLNESS_LEVEL)
      Save.setData(SaveKeys.RECENT_TRANSACTIONS, [])
      Save.setData(SaveKeys.CLIK_CLOK_VIDEOS, [])
      Save.setData(SaveKeys.CURR_DATE, 1)
      Save.setData(SaveKeys.ENERGY_LEVEL, Utils.getTotalEnergyForFitness(FitnessGrade.C))
      Save.setData(SaveKeys.NOTIFICATIONS, [])
    }
  }

  showConfirmProgressModal() {
    this.goBackHome()
    this.progressDayConfirmModal.setVisible(true)
  }

  progressToNextDay() {
    this.progressDayConfirmModal.setVisible(false)
    const nextDay = Save.getData(SaveKeys.CURR_DATE) + 1
    this.progressDayOverlayScreen.show(nextDay)
  }

  resetLevels() {
    const fitnessGrade = Utils.getFitnessGrade()
    const totalEnergyForFitnessGrade = Utils.getTotalEnergyForFitness(fitnessGrade)
    Save.setData(SaveKeys.ENERGY_LEVEL, totalEnergyForFitnessGrade)
  }

  handleFullnessDecrease() {
    // If fullness is 0, subtract fitness level points
    const fullness = Save.getData(SaveKeys.FULLNESS_LEVEL)
    if (fullness === 0) {
      const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL) as number
      const newFitnessLevel = Math.max(0, fitnessLevel - Constants.EMPTY_FULLNESS_FITNESS_PENALTY)
      Save.setData(SaveKeys.FITNESS_LEVEL, newFitnessLevel)
      const currDate = Save.getData(SaveKeys.CURR_DATE) as number
      const emptyFullnessFitnessPenaltyNotification: Notification = {
        message: 'Your fitness level has gone down! Remember to eat to keep up fullness!',
        appName: 'MyHealth',
        route: AppRoute.FIT_NESS_MONSTER,
        id: `fullness-penalty-day-${currDate}`,
      }
      Utils.addNotification(emptyFullnessFitnessPenaltyNotification)
    }
    const newFullness = Math.max(fullness - 20, 0)
    Save.setData(SaveKeys.FULLNESS_LEVEL, newFullness)
  }

  executeOnProgressDayCallbacks(nextDay: number) {
    Save.setData(SaveKeys.CURR_DATE, nextDay)
    this.handleFullnessDecrease()
    this.resetLevels()
    this.handleBillPay(nextDay)
    this.onProgressDayCallbacks.forEach((fn) => {
      fn()
    })
    this.topBar.updateStats()
  }

  handleBillPay(nextDay: number) {
    const diffBetweenNextDayAndBilling =
      nextDay < Constants.DAYS_BETWEEN_BILLING
        ? Math.abs(nextDay - Constants.DAYS_BETWEEN_BILLING)
        : Constants.DAYS_BETWEEN_BILLING - (nextDay % Constants.DAYS_BETWEEN_BILLING)
    if (diffBetweenNextDayAndBilling < 5 && diffBetweenNextDayAndBilling > 0) {
      const billReminderNotification: Notification = {
        id: `bill-reminder-${nextDay}`,
        appName: 'Bank',
        route: AppRoute.BANK,
        message: `Your monthly utilities and internet bill amounting to $${Constants.BASE_BILL_AMOUNT.toFixed(
          2
        )} will be due in ${diffBetweenNextDayAndBilling} day${
          diffBetweenNextDayAndBilling == 1 ? '' : 's'
        }!`,
      }
      Utils.addNotification(billReminderNotification)
    } else {
      if (nextDay > 0 && nextDay % Constants.DAYS_BETWEEN_BILLING == 0) {
        const currBankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
        if (currBankBalance < Constants.BASE_BILL_AMOUNT) {
          // Show game over
        } else {
          const billPayNotification: Notification = {
            id: `day-${nextDay}`,
            appName: 'Bank',
            route: AppRoute.BANK,
            message: `Monthly bills have been charged to your account: $${Constants.BASE_BILL_AMOUNT.toFixed(
              2
            )}`,
          }
          const billPayTransaction: BankTransactions = {
            amount: -Constants.BASE_BILL_AMOUNT,
            vendor: 'Bills',
          }
          const transactions = Save.getData(SaveKeys.RECENT_TRANSACTIONS) as BankTransactions[]
          Save.setData(SaveKeys.RECENT_TRANSACTIONS, transactions.concat(billPayTransaction))
          Save.setData(SaveKeys.BANK_BALANCE, currBankBalance - Constants.BASE_BILL_AMOUNT)
          Utils.addNotification(billPayNotification)
        }
      }
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
    this.notificationListScreen.setVisible(false)
    this.notificationListScreen.onHide()
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

  renderApp(appRoute: AppRoute, data?: any) {
    const appToRender = this.appRouteMapping[appRoute]
    if (appToRender) {
      appToRender.render(() => {
        this.homeButton
          .setStyle({
            color: 'black',
          })
          .setDepth(Constants.SORT_LAYERS.APP_UI)
      }, data)
      this.currApp = appRoute
    }
  }

  openNotificationsList() {
    if (this.currApp) {
      const appToHide = this.appRouteMapping[this.currApp]
      if (appToHide) {
        appToHide.onHide()
        this.homeButton.setStyle({ color: 'white' })
        this.currApp = null
      }
    }
    this.notificationListScreen.setVisible(true)
    this.notificationListScreen.onRender()
    this.homeButton.setDepth(Constants.SORT_LAYERS.APP_UI)
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
