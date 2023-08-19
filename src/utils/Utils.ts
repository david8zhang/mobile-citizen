import { FitnessGrade } from '~/core/TopBar'
import { Save, SaveKeys } from './Save'
import { Notification } from '~/core/NotificationListScreen'

export enum FullnessLevel {
  FULL = 'FULL',
  SATISFIED = 'SATISFIED',
  HUNGRY = 'HUNGRY',
  STARVING = 'STARVING',
}

export class Utils {
  public static convertFitnessLevelToGrade(level: number) {
    if (level < 400) {
      return FitnessGrade.F
    }
    if (level >= 400 && level < 800) {
      return FitnessGrade.D
    }
    if (level >= 800 && level < 1600) {
      return FitnessGrade.C
    }
    if (level >= 1600 && level < 3200) {
      return FitnessGrade.B
    }
    if (level >= 3200 && level < 6400) {
      return FitnessGrade.A
    }
    return FitnessGrade.S
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

  public static getFitnessGrade() {
    const fitnessLevel = Save.getData(SaveKeys.FITNESS_LEVEL)
    return Utils.convertFitnessLevelToGrade(fitnessLevel)
  }

  public static getTotalEnergyForFitness(grade: FitnessGrade) {
    switch (grade) {
      case FitnessGrade.S: {
        return 250
      }
      case FitnessGrade.A: {
        return 200
      }
      case FitnessGrade.B: {
        return 150
      }
      case FitnessGrade.C: {
        return 100
      }
      case FitnessGrade.D: {
        return 75
      }
      case FitnessGrade.F: {
        return 50
      }
    }
  }

  public static getEnergyCostForFitness(grade: FitnessGrade) {
    switch (grade) {
      case FitnessGrade.S: {
        return -0.6
      }
      case FitnessGrade.A: {
        return -0.5
      }
      case FitnessGrade.B: {
        return -0.25
      }
      case FitnessGrade.C: {
        return 0
      }
      case FitnessGrade.D: {
        return 0.25
      }
      case FitnessGrade.F: {
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
