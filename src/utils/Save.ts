export enum SaveKeys {
  FULLNESS_LEVEL = 'FULLNESS_LEVEL',
  ENERGY_LEVEL = 'ENERGY_LEVEL',
  FITNESS_GRADE = 'FITNESS_GRADE',
  BANK_BALANCE = 'BANK_BALANCE',
  RECENT_TRANSACTIONS = 'RECENT_TRANSACTIONS',
  CLIK_CLOK_VIDEOS = 'CLIK_CLOK_VIDEOS',
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

  public static getData(key: SaveKeys) {
    return this.saveObj[key]
  }

  public static setData(key: SaveKeys, data: any) {
    this.saveObj[key] = data
    localStorage.setItem(Save.LOCAL_STORAGE_KEY, JSON.stringify(this.saveObj))
  }
}
