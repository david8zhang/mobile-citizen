export enum AppRoute {
  BANK = 'BANK',
  CLIK_CLOK = 'CLIK_CLOK',
  DASH_EATS = 'DASH_EATS',
  FIT_NESS_MONSTER = 'FIT_NESS_MONSTER',
  MY_HEALTH = 'MY_HEALTH',
  NILE = 'NILE',
  FRIAR_BUCK = 'FRIAR_BUCK',
  SPORTI_CASH = 'SPORTI_CASH',
}

export const APP_CONFIGS = [
  {
    name: 'Bank',
    route: AppRoute.BANK,
    spriteTexture: 'building-columns-solid',
  },
  {
    name: 'ClikClok',
    route: AppRoute.CLIK_CLOK,
    spriteTexture: 'video-solid',
  },
  {
    name: 'DashEats',
    route: AppRoute.DASH_EATS,
    spriteTexture: 'pizza-slice-solid',
  },
  {
    name: 'Fitness Monster',
    route: AppRoute.FIT_NESS_MONSTER,
    spriteTexture: 'dumbbell-solid',
  },
  {
    name: 'My Health',
    route: AppRoute.MY_HEALTH,
    spriteTexture: 'heart-pulse-solid',
  },
  {
    name: 'Nile',
    route: AppRoute.NILE,
    spriteTexture: 'cart-shopping-solid',
  },
  {
    name: 'Friar Buck',
    route: AppRoute.FRIAR_BUCK,
    spriteTexture: 'chart-line-solid',
  },
  {
    name: 'SportiCash',
    route: AppRoute.SPORTI_CASH,
    spriteTexture: 'football-solid',
  },
]
