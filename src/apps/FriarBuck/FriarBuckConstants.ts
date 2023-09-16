import { StockSymbols } from '~/content/FriarBuckStocks'
import { Grade } from '~/core/TopBar'

export enum RecommendedAction {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface TipContent {
  [StockTipLevel.LEVEL_1]: RecommendedAction
  [StockTipLevel.LEVEL_2]: number
  dateKey: string
}

export interface TipUpdate {
  tipContent: TipContent
  requirements: {
    [key in StockTipLevel]: Grade
  }
}

export type StockTips = {
  [key in StockSymbols]?: TipContent
}

export enum StockTipLevel {
  LEVEL_1,
  LEVEL_2,
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
  [key in StockSymbols]?: PortfolioStock
}

export interface PortfolioStock {
  costBasis: number
  numShares: number
}

export interface StockPrices {
  [day: string]: {
    [stockSymbol: string]: number
  }
}

export const FB_FONT_REGULAR = 'Arial'
export const FB_FONT_BOLD = 'CaviarDreams_Bold'
