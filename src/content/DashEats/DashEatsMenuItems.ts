import { MenuItemType } from '~/apps/DashEats/DashEatsConstants'

export const DASH_EATS_MENU_ITEMS: MenuItemType[] = [
  {
    name: 'Hamburger',
    description: 'Time for hamburger',
    price: 3,
    fullnessBonus: 20,
    fitnessBonus: -20,
    imgSrc: '/dasheats/menu-items/burger.png',
  },
  {
    name: 'Pizza',
    description: 'Krusty Krab Pizza for you and me',
    price: 4,
    fullnessBonus: 15,
    fitnessBonus: -15,
    imgSrc: '/dasheats/menu-items/pizza.png',
  },
  {
    name: 'Bean Burrito',
    description: 'An extremely bean-ous burrito, packed with protein',
    price: 5,
    fullnessBonus: 10,
    fitnessBonus: -10,
    imgSrc: '/dasheats/menu-items/burrito.png',
  },
]
