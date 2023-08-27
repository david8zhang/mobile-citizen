export interface StoreItem {
  imageSrc: '/icons/book-solid.svg'
  name: string
  description: string
  price: number
  tags: Tag[]
  pointGain?: {
    [key in Tag]?: number
  }
}

export enum Tag {
  KNOWLEDGE = 'KNOWLEDGE',
  FITNESS = 'FITNESS',
  CLIK_CLOK = 'CLIK_CLOK',
}

export const NILE_STORE_ITEMS: StoreItem[] = [
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Equity, Equity, Equity',
    price: 15,
    description:
      "Equity's too high? You gotta smash it down. Equity's too low? Build it right back up",
    tags: [Tag.KNOWLEDGE],
    pointGain: {
      [Tag.KNOWLEDGE]: 15,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Stocks vs. Finances',
    price: 20,
    description:
      "This stock market is the best thing ever. I've made over a million dollars just from selling this book",
    tags: [Tag.KNOWLEDGE],
    pointGain: {
      [Tag.KNOWLEDGE]: 25,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Brain Time',
    description: 'Time for brain',
    price: 12,
    tags: [Tag.KNOWLEDGE],
    pointGain: {
      [Tag.KNOWLEDGE]: 10,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Equity, Equity, Equity',
    price: 15,
    description:
      "Equity's too high? You gotta smash it down. Equity's too low? Build it right back up",
    tags: [Tag.FITNESS],
    pointGain: {
      [Tag.FITNESS]: 15,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Stocks vs. Finances',
    price: 20,
    description:
      "This stock market is the best thing ever. I've made over a million dollars just from selling this book",
    tags: [Tag.FITNESS],
    pointGain: {
      [Tag.FITNESS]: 25,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Brain Time',
    description: 'Time for brain',
    price: 12,
    tags: [Tag.FITNESS],
    pointGain: {
      [Tag.FITNESS]: 10,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Brain Time',
    description: 'Time for brain',
    price: 12,
    tags: [Tag.FITNESS],
    pointGain: {
      [Tag.FITNESS]: 10,
    },
  },
  {
    imageSrc: '/icons/book-solid.svg',
    name: 'Brain Time',
    description: 'Time for brain',
    price: 12,
    tags: [Tag.FITNESS],
    pointGain: {
      [Tag.FITNESS]: 10,
    },
  },
]
