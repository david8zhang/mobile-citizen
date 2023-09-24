export enum SaveKeys {
  // General
  CURR_DATE = 'CURR_DATE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  KNOWLEDGE_LEVEL = 'KNOWLEDGE_LEVEL',
  FULLNESS_LEVEL = 'FULLNESS_LEVEL',
  ENERGY_LEVEL = 'ENERGY_LEVEL',
  FITNESS_LEVEL = 'FITNESS_LEVEL',
  BANK_BALANCE = 'BANK_BALANCE',
  RECENT_TRANSACTIONS = 'RECENT_TRANSACTIONS',

  // Clik Clok
  CLIK_CLOK_VIDEOS = 'CLIK_CLOK_VIDEOS',
  CLIK_CLOK_FOLLOWERS = 'CLIK_CLOK_FOLLOWERS',

  // DashEats
  PENDING_DASHEATS_ORDER = 'PENDING_DASHEATS_ORDER',

  // Nile
  NILE_CART = 'NILE_CART',
  PENDING_NILE_ORDERS = 'NILE_PENDING_ORDERS',
  INVENTORY = 'INVENTORY',

  // Friar Buck
  PORTFOLIO = 'PORTFOLIO',
  STOCK_PRICES = 'STOCK_PRICES',
  FRIAR_BUCK_BUYING_POWER = 'FRIAR_BUCK_BUYING_POWER',
  FRIAR_BUCK_STOCK_TIPS = 'FRIAR_BUCK_STOCK_TIPS',
  FRIAR_BUCK_NEWS_STORIES = 'FRIAR_BUCK_NEWS_STORIES',
  FRIAR_BUCK_NEWS_COOLDOWN = 'FRIAR_BUCK_NEWS_COOLDOWN',
}

export class Save {
  private static LOCAL_STORAGE_KEY = 'mobile-citizen-save'
  private static saveObj: {
    [key in SaveKeys]?: any
  }
  private static _instance: Save

  constructor() {
    const rawSaveObj = localStorage.getItem(Save.LOCAL_STORAGE_KEY)
    if (!rawSaveObj) {
      Save.saveObj = {}
      localStorage.setItem(Save.LOCAL_STORAGE_KEY, JSON.stringify(Save.saveObj))
    } else {
      Save.saveObj = JSON.parse(rawSaveObj)
    }
    Save._instance = this
  }

  public static get instance() {
    return Save._instance
  }

  public static clearSave() {
    localStorage.clear()
  }

  public static getData(key: SaveKeys, defaultIfNotFound?: any) {
    if (this.saveObj[key] == undefined) {
      return defaultIfNotFound
    }
    return this.saveObj[key]
  }

  public static setData(key: SaveKeys, data: any) {
    this.saveObj[key] = data
    localStorage.setItem(Save.LOCAL_STORAGE_KEY, JSON.stringify(this.saveObj))
  }
}
