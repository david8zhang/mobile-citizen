import { NewsType } from '~/content/FriarBuck/FriarBuckNewsTemplates'
import { StockSymbols } from '~/content/FriarBuck/FriarBuckStocks'
import { Grade } from '~/core/TopBar'
import { StockTipLevel } from '../../content/FriarBuck/StockTipLevel'

export enum RecommendedAction {
  BUY = 'BUY',
  SELL = 'SELL',
}

export interface TipContent {
  [StockTipLevel.LEVEL_1]: {
    value: RecommendedAction
    purchased: boolean
  }
  [StockTipLevel.LEVEL_2]: {
    value: number
    purchased: boolean
  }
  dateKey: string
}

export interface TipUpdate {
  tipContent: TipContent
  knowledgeReqForUnlock: Grade
  symbol: StockSymbols
}

export type StockTips = {
  [key in StockSymbols]?: TipContent
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

export interface NewsStoryMappings {
  [day: string]: {
    [key in StockSymbols]: {
      headline: string
      text: string
    }
  }
}

export interface NewsCooldowns {
  [stockSymbol: string]: number
}

export type NewsTemplate = {
  [key in StockSymbols]: {
    [key in NewsType]: {
      headline: string
      text: string
    }[]
  }
}

export const INITIAL_STOCK_PRICES = {
  Day1: {
    [StockSymbols.CC]: 10,
    [StockSymbols.NILE]: 10,
    [StockSymbols.DASH]: 10,
    [StockSymbols.SPORT]: 10,
    [StockSymbols.BANK]: 10,
    [StockSymbols.BOOG]: 50,
    [StockSymbols.FISH]: 50,
    [StockSymbols.MRHD]: 50,
    [StockSymbols.NDFX]: 50,
    [StockSymbols.DIDN]: 100,
    [StockSymbols.VVDA]: 100,
    [StockSymbols.GG]: 250,
    [StockSymbols.BRB]: 250,
    [StockSymbols.ANC]: 250,
  },
}

// Cooldown until the symbol can be used to generate new stories
export const INITIAL_NEWS_COOLDOWNS = {
  [StockSymbols.CC]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.NILE]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.DASH]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.SPORT]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.BANK]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.BOOG]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.FISH]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.MRHD]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.NDFX]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.DIDN]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.VVDA]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.GG]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.BRB]: Number.MAX_SAFE_INTEGER,
  [StockSymbols.ANC]: Number.MAX_SAFE_INTEGER,
}

export const NEWS_COOLDOWN = 5
