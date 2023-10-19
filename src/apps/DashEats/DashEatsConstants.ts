import { Location } from '~/content/DashEats/DeliveryRestaurants'
import { Direction } from '~/utils/Constants'

export interface MenuItemType {
  name: string
  description: string
  fullnessBonus: number
  fitnessBonus: number
  price: number
  imgSrc: string
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

export class DashEatsConstants {
  public static SPEEDY_DELIVERY_EXTRA_COST = 3
  public static STANDARD_DELIVERY_TIME = 30000
  public static SPEEDY_DELIVERY_TIME = 15000

  public static DISTANCE_TO_TIME_LIMIT = {
    [DeliveryJobDistance.SHORT]: 15,
    [DeliveryJobDistance.MEDIUM]: 30,
    [DeliveryJobDistance.LONG]: 45,
  }
}

export interface DeliveryJob {
  restaurantName: string
  destination: Location
  energyCost: number
  distance: DeliveryJobDistance
  earningsPotential: DeliveryJobEarnings
  startPosition: {
    x: number
    y: number
  }
}

export interface StartPosition {
  x: number
  y: number
  facing: Direction
}
