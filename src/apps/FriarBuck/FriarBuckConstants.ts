import { StockSymbols } from '~/content/FriarBuckStocks'
import { Grade } from '~/core/TopBar'

export enum StockTipLevel {
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
}

export interface Stock {
  symbol: string
  name: string
  knowledgeReqForUnlock: Grade
  knowledgeReqsForTip: {
    [key in StockTipLevel]: Grade
  }
}

export type PortfolioType = {
  [key in StockSymbols]?: {
    costBasis: number
    numShares: number
  }
}

export interface StockPrices {
  [day: string]: {
    [stockSymbol: string]: number
  }
}
