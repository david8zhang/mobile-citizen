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
  public static SPEEDY_DELIVERY_TIME = 5000

  public static DASH_EATS_MENU_ITEMS: MenuItemType[] = [
    {
      name: 'Hamburger',
      description: 'Time for hamburger',
      price: 3,
      fullnessBonus: 20,
      fitnessBonus: -20,
    },
    {
      name: 'Cheese Pizza',
      description: 'Cheesy Cheese Pizza for you and me',
      price: 15,
      fullnessBonus: 50,
      fitnessBonus: -20,
    },
    {
      name: 'Bean Burrito',
      description: 'An extremely bean-ous burrito, packed with protein',
      price: 5,
      fullnessBonus: 10,
      fitnessBonus: -10,
    },
    {
      name: 'Bean Burrito',
      description: 'An extremely bean-ous burrito, packed with protein',
      price: 5,
      fullnessBonus: 10,
      fitnessBonus: -10,
    },
    {
      name: 'Bean Burrito',
      description: 'An extremely bean-ous burrito, packed with protein',
      price: 5,
      fullnessBonus: 10,
      fitnessBonus: -10,
    },
  ]
}
