import { Direction } from '~/utils/Constants'

export interface MenuItemType {
  name: string
  description: string
  fullnessBonus: number
  fitnessBonus: number
  price: number
}

export class DashEatsConstants {
  public static SPEEDY_DELIVERY_EXTRA_COST = 3
  public static STANDARD_DELIVERY_TIME = 30000
  public static SPEEDY_DELIVERY_TIME = 15000
}

export interface DeliveryJob {
  restaurantName: string
  energyCost: number
  distance: DeliveryJobDistance
  earningsPotential: DeliveryJobEarnings
}

export enum DeliveryJobDistance {
  SHORT = 'SHORT',
  MEDIUM = 'MED',
  LONG = 'LONG',
}

export enum DeliveryJobEarnings {
  LOW = '$',
  MEDIUM = '$$',
  HIGH = '$$$',
}

export interface StartPosition {
  x: number
  y: number
  facing: Direction
}

export const START_POSITIONS: StartPosition[] = [
  { x: 0, y: 12, facing: Direction.RIGHT },
  { x: 0, y: 28, facing: Direction.RIGHT },
  { x: 10, y: 39, facing: Direction.UP },
  { x: 10, y: 0, facing: Direction.DOWN },
  { x: 22, y: 0, facing: Direction.DOWN },
  { x: 32, y: 0, facing: Direction.DOWN },
  { x: 39, y: 19, facing: Direction.LEFT },
  { x: 39, y: 38, facing: Direction.LEFT },
]
