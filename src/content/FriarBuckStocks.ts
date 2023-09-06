import { Stock, StockTipLevel } from '~/apps/FriarBuck/FriarBuckConstants'
import { Grade } from '~/core/TopBar'

export enum StockSymbols {
  CC = 'CC',
  NILE = 'NILE',
  DASH = 'DASH',
  SPORT = 'SPORT',
  BANK = 'BANK',
  BOOG = 'BOOG',
  FISH = 'FISH',
  MRHD = 'MRHD',
  NDFX = 'NDFX',
  DIDN = 'DIDN',
  VVDA = 'VVDA',
  GG = 'GG',
  BRB = 'BRB',
  ANC = 'ANC',
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

export const STOCKS: Stock[] = [
  // Starter Stocks
  {
    symbol: StockSymbols.CC,
    name: 'Clik Clok, Inc.',
    knowledgeReqForUnlock: Grade.F,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.D,
      [StockTipLevel.LEVEL_2]: Grade.C,
      [StockTipLevel.LEVEL_3]: Grade.B,
    },
  },
  {
    symbol: StockSymbols.NILE,
    name: 'Nile, Inc.',
    knowledgeReqForUnlock: Grade.F,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.D,
      [StockTipLevel.LEVEL_2]: Grade.C,
      [StockTipLevel.LEVEL_3]: Grade.B,
    },
  },
  {
    symbol: StockSymbols.DASH,
    name: 'DashEats, Inc.',
    knowledgeReqForUnlock: Grade.F,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.D,
      [StockTipLevel.LEVEL_2]: Grade.C,
      [StockTipLevel.LEVEL_3]: Grade.B,
    },
  },
  {
    symbol: StockSymbols.SPORT,
    name: 'SportiCash, Inc.',
    knowledgeReqForUnlock: Grade.F,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.D,
      [StockTipLevel.LEVEL_2]: Grade.C,
      [StockTipLevel.LEVEL_3]: Grade.B,
    },
  },
  {
    symbol: StockSymbols.BANK,
    name: 'Bank Corp, Inc.',
    knowledgeReqForUnlock: Grade.F,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.D,
      [StockTipLevel.LEVEL_2]: Grade.C,
      [StockTipLevel.LEVEL_3]: Grade.B,
    },
  },
  // Level 2 Stocks
  {
    symbol: StockSymbols.BOOG,
    name: 'Boogle, Inc.',
    knowledgeReqForUnlock: Grade.C,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.C,
      [StockTipLevel.LEVEL_2]: Grade.B,
      [StockTipLevel.LEVEL_3]: Grade.A,
    },
  },
  {
    symbol: StockSymbols.FISH,
    name: 'Fishbook, Inc.',
    knowledgeReqForUnlock: Grade.C,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.C,
      [StockTipLevel.LEVEL_2]: Grade.B,
      [StockTipLevel.LEVEL_3]: Grade.A,
    },
  },
  {
    symbol: StockSymbols.MRHD,
    name: 'Macrohard, Inc.',
    knowledgeReqForUnlock: Grade.C,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.C,
      [StockTipLevel.LEVEL_2]: Grade.B,
      [StockTipLevel.LEVEL_3]: Grade.A,
    },
  },
  {
    symbol: StockSymbols.NDFX,
    name: 'NedFlix, Inc.',
    knowledgeReqForUnlock: Grade.C,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.C,
      [StockTipLevel.LEVEL_2]: Grade.B,
      [StockTipLevel.LEVEL_3]: Grade.A,
    },
  },
  // Level 3 Stocks
  {
    symbol: StockSymbols.DIDN,
    name: 'Didney, Inc.',
    knowledgeReqForUnlock: Grade.B,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.B,
      [StockTipLevel.LEVEL_2]: Grade.A,
      [StockTipLevel.LEVEL_3]: Grade.S,
    },
  },
  {
    symbol: StockSymbols.VVDA,
    name: 'Viva La NVidya, Inc.',
    knowledgeReqForUnlock: Grade.B,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.B,
      [StockTipLevel.LEVEL_2]: Grade.A,
      [StockTipLevel.LEVEL_3]: Grade.S,
    },
  },
  // Level 4 Stocks
  {
    symbol: StockSymbols.GG,
    name: 'GameGo, Inc.',
    knowledgeReqForUnlock: Grade.A,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.S,
      [StockTipLevel.LEVEL_2]: Grade.S,
      [StockTipLevel.LEVEL_3]: Grade.S,
    },
  },
  {
    symbol: StockSymbols.BRB,
    name: 'BrickBerry, Inc.',
    knowledgeReqForUnlock: Grade.A,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.S,
      [StockTipLevel.LEVEL_2]: Grade.S,
      [StockTipLevel.LEVEL_3]: Grade.S,
    },
  },
  {
    symbol: StockSymbols.ANC,
    name: 'America Needs Crap, Inc.',
    knowledgeReqForUnlock: Grade.A,
    knowledgeReqsForTip: {
      [StockTipLevel.LEVEL_1]: Grade.S,
      [StockTipLevel.LEVEL_2]: Grade.S,
      [StockTipLevel.LEVEL_3]: Grade.S,
    },
  },
]