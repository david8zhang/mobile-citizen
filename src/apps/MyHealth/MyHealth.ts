import { Constants } from '~/utils/Constants'
import { App } from '../App'
import { Home } from '~/scenes/Home'
import { Utils } from '~/utils/Utils'
import { HealthStatList } from '~/apps/MyHealth/web-ui/HealthStatList'
import { Save, SaveKeys } from '~/utils/Save'

export interface HealthStat {
  header: {
    label: string
    value: string
  }
  subSections: {
    label: string
    value: string
  }[]
}

export class MyHealth extends App {
  private headerText!: Phaser.GameObjects.Text
  private statListDom!: Phaser.GameObjects.DOMElement

  constructor(scene: Home) {
    super(scene)
    this.setupHeaderText()
    this.renderHealthStatsList()
    this.setVisible(false)
  }

  setupHeaderText() {
    this.headerText = this.scene.add
      .text(Constants.WINDOW_WIDTH / 2, Constants.TOP_BAR_HEIGHT + 40, 'MyHealth', {
        fontSize: '40px',
        color: 'black',
        fontFamily: Constants.FONT_REGULAR,
      })
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    this.headerText.setPosition(
      Constants.WINDOW_WIDTH / 2 - this.headerText.displayWidth / 2,
      this.headerText.y
    )
  }

  getFitnessStatsSection() {
    const fitnessPoints = Save.getData(SaveKeys.FITNESS_LEVEL)
    const fitnessGrade = Utils.getFitnessGrade()
    const pointsUntilNextFitnessGrade =
      Utils.getMinFitnessPointsForGrade(Utils.getNextGrade(fitnessGrade)) - fitnessPoints
    return {
      header: {
        label: 'Fitness Grade',
        value: fitnessGrade,
      },
      subLines: [
        {
          label: 'Fitness Points',
          value: fitnessPoints,
        },
        {
          label: 'Points until next Rank',
          value: pointsUntilNextFitnessGrade,
        },
      ],
    }
  }

  getKnowledgeStatsSection() {
    const knowledgePoints = Save.getData(SaveKeys.KNOWLEDGE_LEVEL) as number
    const knowledgeGrade = Utils.getKnowledgeGrade()
    const pointsUntilNextKnowledgeGrade =
      Utils.getMinFitnessPointsForGrade(Utils.getNextGrade(knowledgeGrade)) - knowledgePoints
    return {
      header: {
        label: 'Knowledge Grade',
        value: knowledgeGrade,
      },
      subLines: [
        {
          label: 'Knowledge Points',
          value: knowledgePoints,
        },
        {
          label: 'Points until next rank',
          value: pointsUntilNextKnowledgeGrade,
        },
      ],
    }
  }

  getEnergyStatsSection() {
    const fitnessGrade = Utils.getFitnessGrade()
    const currEnergy = Save.getData(SaveKeys.ENERGY_LEVEL) as number
    const maxEnergy = Utils.getMaxEnergyForFitness(fitnessGrade)
    const maxEnergyForNextGrade = Utils.getMaxEnergyForFitness(Utils.getNextGrade(fitnessGrade))
    return {
      header: {
        label: 'Energy Level',
        value: `${currEnergy}/${maxEnergy}`,
      },
      subLines: [
        {
          label: 'Max Energy for Next Grade',
          value: maxEnergyForNextGrade,
        },
      ],
    }
  }

  getFullnessStatsSection() {
    const fullnessLevel = Save.getData(SaveKeys.FULLNESS_LEVEL) as number
    const maxFullnessLevel = Constants.MAX_FULLNESS_LEVEL
    return {
      header: {
        label: 'Fullness Level',
        value: `${fullnessLevel}/${maxFullnessLevel}`,
      },
      subLines: [
        {
          label: 'Decrease on new day',
          value: `-${Constants.FULLNESS_DECREASE_PER_DAY}`,
        },
        {
          label: 'Empty Fullness fitness penalty',
          value: `-${Constants.EMPTY_FULLNESS_FITNESS_PENALTY}`,
        },
      ],
    }
  }

  getHealthStats() {
    return [
      this.getFitnessStatsSection(),
      this.getKnowledgeStatsSection(),
      this.getEnergyStatsSection(),
      this.getFullnessStatsSection(),
    ]
  }

  renderHealthStatsList() {
    if (this.statListDom) {
      this.statListDom.destroy()
    }
    const yPos = this.headerText.y + this.headerText.displayHeight + 30
    const healthStats = this.getHealthStats()
    const healthStatList = HealthStatList(healthStats, Constants.WINDOW_WIDTH, 600)
    this.statListDom = this.scene.add
      .dom(0, yPos, healthStatList)
      .setOrigin(0)
      .setDepth(Constants.SORT_LAYERS.APP_UI)
    Utils.setupDragToScroll('health-stat-list')
  }

  public setVisible(isVisible: boolean): void {
    this.headerText.setVisible(isVisible)
    this.statListDom.setVisible(isVisible)
    this.bgRect.setVisible(isVisible)
  }

  public onHide(onComplete?: Function | undefined): void {
    super.onHide(() => {
      if (onComplete) {
        onComplete()
      }
    })
  }

  public render(onComplete?: Function | undefined): void {
    super.render(() => {
      this.renderHealthStatsList()
      if (onComplete) {
        onComplete()
      }
    })
  }
}
