import { MenuItemType } from '~/apps/DashEats/DashEatsConstants'

export const DASH_EATS_MENU_ITEMS: MenuItemType[] = [
  {
    name: 'Hamburger',
    description: 'Or "Steamed Hams" for all the upstate New-Yorkers out there.',
    price: 3,
    fullnessBonus: 20,
    fitnessBonus: -20,
    imgSrc: 'burger',
  },
  {
    name: 'Pizza',
    description: 'Pizza Time! Perfect for when the moon hits your eye',
    price: 4,
    fullnessBonus: 15,
    fitnessBonus: -15,
    imgSrc: 'pizza',
  },
  {
    name: 'Bean Burrito',
    description: 'An extremely bean-ous burrito, packed with protein',
    price: 5,
    fullnessBonus: 10,
    fitnessBonus: -10,
    imgSrc: 'burrito',
  },
]
