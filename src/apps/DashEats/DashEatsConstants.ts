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
