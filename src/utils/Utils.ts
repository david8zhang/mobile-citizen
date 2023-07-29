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
    if (level > 90) {
      return FitnessGrade.A
    }
  }
}
