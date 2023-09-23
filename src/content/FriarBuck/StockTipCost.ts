import { Grade } from '~/core/TopBar'
import { StockTipLevel } from './StockTipLevel'

export const STOCK_KNOWLEDGE_GRADE_TO_TIP_COST = {
  [Grade.F]: {
    [StockTipLevel.LEVEL_1]: 5,
    [StockTipLevel.LEVEL_2]: 10,
  },
  [Grade.D]: {
    [StockTipLevel.LEVEL_1]: 15,
    [StockTipLevel.LEVEL_2]: 20,
  },
  [Grade.C]: {
    [StockTipLevel.LEVEL_1]: 25,
    [StockTipLevel.LEVEL_2]: 50,
  },
  [Grade.B]: {
    [StockTipLevel.LEVEL_1]: 100,
    [StockTipLevel.LEVEL_2]: 200,
  },
  [Grade.A]: {
    [StockTipLevel.LEVEL_1]: 250,
    [StockTipLevel.LEVEL_2]: 500,
  },
}
