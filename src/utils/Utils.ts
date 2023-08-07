import { FitnessGrade } from '~/core/TopBar'

export class Utils {
  public static convertFitnessLevelToGrade(level: number) {
    if (level < 600) {
      return FitnessGrade.F
    }
    if (level >= 600 && level < 700) {
      return FitnessGrade.D
    }
    if (level >= 700 && level < 800) {
      return FitnessGrade.C
    }
    if (level >= 800 && level < 900) {
      return FitnessGrade.B
    }
    if (level >= 900 && level < 1000) {
      return FitnessGrade.A
    }
    return FitnessGrade.S
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
}
