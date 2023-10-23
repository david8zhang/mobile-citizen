export enum AppRoute {
  BANK = 'BANK',
  CLIK_CLOK = 'CLIK_CLOK',
  DASH_EATS = 'DASH_EATS',
  FIT_NESS_MONSTER = 'FIT_NESS_MONSTER',
  MY_HEALTH = 'MY_HEALTH',
  NILE = 'NILE',
  FRIAR_BUCK = 'FRIAR_BUCK',
  SPORTI_CASH = 'SPORTI_CASH',
  EMAIL = 'EMAIL',
}

export const APP_CONFIGS = [
  {
    name: 'Email',
    route: AppRoute.EMAIL,
    spriteTexture: 'email',
  },
  {
    name: 'Bank',
    route: AppRoute.BANK,
    spriteTexture: 'bank',
  },
  {
    name: 'ClikClok',
    route: AppRoute.CLIK_CLOK,
    spriteTexture: 'clikclok',
  },
  {
    name: 'DashEats',
    route: AppRoute.DASH_EATS,
    spriteTexture: 'dasheats',
  },
  {
    name: 'Fitness Monster',
    route: AppRoute.FIT_NESS_MONSTER,
    spriteTexture: 'fitness-monster',
  },
  {
    name: 'My Health',
    route: AppRoute.MY_HEALTH,
    spriteTexture: 'myhealth',
  },
  {
    name: 'Nile',
    route: AppRoute.NILE,
    spriteTexture: 'nile',
  },
  {
    name: 'Friar Buck',
    route: AppRoute.FRIAR_BUCK,
    spriteTexture: 'friar-buck',
  },
]
