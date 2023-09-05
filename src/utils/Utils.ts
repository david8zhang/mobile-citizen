import { Grade } from '~/core/TopBar'
import { Save, SaveKeys } from './Save'
import { Notification } from '~/core/NotificationListScreen'
import { Constants } from './Constants'
import { BankTransactions } from '~/apps/Bank/Bank'

export enum FullnessLevel {
  FULL = 'FULL',
  SATISFIED = 'SATISFIED',
  HUNGRY = 'HUNGRY',
  STARVING = 'STARVING',
}

export class Utils {
  public static getMinKnowledgePointsForGrade(grade: Grade) {
    switch (grade) {
      case Grade.S: {
        return 6400
      }
      case Grade.A: {
        return 3200
      }
      case Grade.B: {
        return 1600
      }
      case Grade.C: {
        return 800
      }
      case Grade.D: {
        return 400
      }
      default: {
        return 0
      }
    }
  }

  public static getNextKnowledgeGrade(currRank: Grade) {
    const grades = [Grade.F, Grade.D, Grade.C, Grade.B, Grade.A, Grade.S]
    const currGradeIndex = grades.indexOf(currRank)
    const nextGradeIndex = Math.min(grades.length - 1, currGradeIndex + 1)
    return grades[nextGradeIndex]
  }

  public static getMinFitnessPointsForGrade(grade: Grade) {
    switch (grade) {
      case Grade.S: {
        return 6400
      }
      case Grade.A: {
        return 3200
      }
      case Grade.B: {
        return 1600
      }
      case Grade.C: {
        return 800
      }
      case Grade.D: {
        return 400
      }
      default: {
        return 0
      }
    }
  }

  public static getNextGrade(currRank: Grade) {
    const grades = [Grade.F, Grade.D, Grade.C, Grade.B, Grade.A, Grade.S]
    const currGradeIndex = grades.indexOf(currRank)
    const nextGradeIndex = Math.min(grades.length - 1, currGradeIndex + 1)
    return grades[nextGradeIndex]
  }

  public static convertFitnessLevelToGrade(level: number) {
    if (level < 400) {
      return Grade.F
    }
    if (level >= 400 && level < 800) {
      return Grade.D
    }
    if (level >= 800 && level < 1600) {
      return Grade.C
    }
    if (level >= 1600 && level < 3200) {
      return Grade.B
    }
    if (level >= 3200 && level < 6400) {
      return Grade.A
    }
    return Grade.S
  }

  public static convertKnowledgeLevelToGrade(level: number) {
    if (level < 400) {
      return Grade.F
    }
    if (level >= 400 && level < 800) {
      return Grade.D
    }
    if (level >= 800 && level < 1600) {
      return Grade.C
    }
    if (level >= 1600 && level < 3200) {
      return Grade.B
    }
    if (level >= 3200 && level < 6400) {
      return Grade.A
    }
    return Grade.S
  }

  public static getFullnessLevel() {
    const fullnessLevel = Save.getData(SaveKeys.FULLNESS_LEVEL)
    if (fullnessLevel >= 75) {
      return FullnessLevel.FULL
    }
    if (fullnessLevel >= 50 && fullnessLevel < 75) {
      return FullnessLevel.SATISFIED
    }
    if (fullnessLevel >= 25 && fullnessLevel < 50) {
      return FullnessLevel.HUNGRY
    }
    if (fullnessLevel < 25) {
      return FullnessLevel.STARVING
    }
  }

  public static getFullnessLevelHexString(fullnessLevel: FullnessLevel) {
    switch (fullnessLevel) {
      case FullnessLevel.FULL: {
        return '#27ae60'
      }
      case FullnessLevel.SATISFIED: {
        return 'black'
      }
      case FullnessLevel.HUNGRY: {
        return '#e67e22'
      }
      case FullnessLevel.STARVING: {
        return '#e74c3c'
      }
    }
  }

  public static addKnowledgePoints(points: number) {
    const knowledgePoints = Save.getData(SaveKeys.KNOWLEDGE_LEVEL) as number
    Save.setData(SaveKeys.KNOWLEDGE_LEVEL, knowledgePoints + points)
  }

  public static addFitnessPoints(points: number) {
    const fitnessPoints = Save.getData(SaveKeys.FITNESS_LEVEL) as number
    Save.setData(SaveKeys.FITNESS_LEVEL, fitnessPoints + points)
  }

  public static addTransaction(amount: number, vendor: string, isCredit: boolean) {
    const bankBalance = Save.getData(SaveKeys.BANK_BALANCE) as number
    if (isCredit || bankBalance > amount) {
      const newTransaction: BankTransactions = {
        amount: isCredit ? amount : -amount,
        vendor,
      }
      const transactions = Save.getData(SaveKeys.RECENT_TRANSACTIONS) as BankTransactions[]
      const newTransactions = transactions.concat(newTransaction)
      const newBankBalance = isCredit ? bankBalance + amount : bankBalance - amount
      Save.setData(SaveKeys.RECENT_TRANSACTIONS, newTransactions)
      Save.setData(SaveKeys.BANK_BALANCE, newBankBalance)
    } else {
      console.error('Insufficient funds: ', bankBalance)
    }
  }

  public static getCurrDayKey() {
    return `Day${Save.getData(SaveKeys.CURR_DATE)}`
  }

  public static initializeSaveData(isRestart: boolean = false) {
    if (Save.getData(SaveKeys.BANK_BALANCE) == undefined || isRestart) {
      Save.setData(SaveKeys.BANK_BALANCE, Constants.STARTING_BANK_BALANCE)
      Save.setData(SaveKeys.KNOWLEDGE_LEVEL, Constants.DEFAULT_KNOWLEDGE_LEVEL)
      Save.setData(SaveKeys.FITNESS_LEVEL, Constants.DEFAULT_FITNESS_LEVEL)
      Save.setData(SaveKeys.FULLNESS_LEVEL, Constants.DEFAULT_FULLNESS_LEVEL)
      Save.setData(SaveKeys.RECENT_TRANSACTIONS, [])
      Save.setData(SaveKeys.CLIK_CLOK_VIDEOS, [])
      Save.setData(SaveKeys.CURR_DATE, 1)
      Save.setData(SaveKeys.ENERGY_LEVEL, Utils.getMaxEnergyForFitness(Grade.C))
      Save.setData(SaveKeys.NOTIFICATIONS, [])
      Save.setData(SaveKeys.NILE_CART, [])
      Save.setData(SaveKeys.PENDING_NILE_ORDERS, [])
      Save.setData(SaveKeys.FRIAR_BUCK_BUYING_POWER, 0)
    }
  }

  public static getFitnessGrade() {
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL)
    return Utils.convertFitnessLevelToGrade(fitnessLevel)
  }

  public static getKnowledgeGrade() {
    const knowledgeLevel = Save.getData(SaveKeys.KNOWLEDGE_LEVEL)
    return Utils.convertKnowledgeLevelToGrade(knowledgeLevel)
  }

  public static getGradeIndex(grade: Grade) {
    const gradesInOrder = [Grade.F, Grade.D, Grade.C, Grade.B, Grade.A, Grade.S]
    return gradesInOrder.indexOf(grade)
  }

  public static getMaxEnergyForFitness(grade: Grade) {
    switch (grade) {
      case Grade.S: {
        return 250
      }
      case Grade.A: {
        return 200
      }
      case Grade.B: {
        return 150
      }
      case Grade.C: {
        return 100
      }
      case Grade.D: {
        return 75
      }
      case Grade.F: {
        return 50
      }
    }
  }

  public static getEnergyCostForFitness(grade: Grade) {
    switch (grade) {
      case Grade.S: {
        return -0.6
      }
      case Grade.A: {
        return -0.5
      }
      case Grade.B: {
        return -0.25
      }
      case Grade.C: {
        return 0
      }
      case Grade.D: {
        return 0.25
      }
      case Grade.F: {
        return 0.5
      }
    }
  }

  public static setupDragToScroll(divId: string) {
    const ele = document.getElementById(divId)!
    ele.style.cursor = 'grab'
    let pos = { top: 0, left: 0, x: 0, y: 0 }

    const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing'
      ele.style.userSelect = 'none'
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      }
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
    }

    const mouseMoveHandler = function (e) {
      const dx = e.clientX - pos.x
      const dy = e.clientY - pos.y
      ele.scrollTop = pos.top - dy
      ele.scrollLeft = pos.left - dx
    }

    const mouseUpHandler = function () {
      ele.style.cursor = 'grab'
      ele.style.removeProperty('user-select')

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }
    ele.addEventListener('mousedown', mouseDownHandler)
  }

  public static addNotification(notification: Notification) {
    const notifications = Save.getData(SaveKeys.NOTIFICATIONS) as Notification[]
    notifications.push(notification)
    Save.setData(SaveKeys.NOTIFICATIONS, notifications)
  }
}
