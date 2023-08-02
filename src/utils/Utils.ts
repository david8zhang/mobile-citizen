import { FitnessGrade } from '~/core/TopBar'

export class Utils {
  public static convertFitnessLevelToGrade(level: number) {
    if (level < 60) {
      return FitnessGrade.F
    }
    if (level >= 60 && level < 70) {
      return FitnessGrade.D
    }
    if (level >= 70 && level < 80) {
      return FitnessGrade.C
    }
    if (level >= 80 && level < 90) {
      return FitnessGrade.B
    }
    if (level >= 90 && level < 100) {
      return FitnessGrade.A
    }
    if (level >= 100 && level < 120) {
      return FitnessGrade.S
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
