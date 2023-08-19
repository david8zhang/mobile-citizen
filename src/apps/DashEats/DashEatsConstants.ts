export interface MenuItem {
  name: string
  description: string
  fullnessBonus: number
  fitnessBonus: number
  price: number
}

export class DashEatsConstants {
  public static DASH_EATS_VIDEOS: MenuItem[] = [
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
  ]
}
