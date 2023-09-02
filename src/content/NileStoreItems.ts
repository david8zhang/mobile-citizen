export interface StoreItem {
  imageSrc: '/icons/book-solid.svg'
  name: string
  description: string
  price: number
  tags: Tag[]
  effect: Effect
  id: string
}

export interface PendingOrder {
  id: string
  storeItem: StoreItem
  daysUntilDelivery: number
}

export interface Effect {
  description: string
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
    id: 'item-1',
    imageSrc: '/icons/book-solid.svg',
    name: 'Equity, Equity, Equity',
    price: 15,
    description:
      "Equity's too high? You gotta smash it down. Equity's too low? Build it right back up",
    tags: [Tag.KNOWLEDGE],
    effect: {
      description: '+15 Knowledge',
      pointGain: {
        [Tag.KNOWLEDGE]: 15,
      },
    },
  },
  {
    id: 'item-2',
    imageSrc: '/icons/book-solid.svg',
    name: 'Stocks vs. Finances',
    price: 20,
    description:
      "This stock market is the best thing ever. I've made over a million dollars just from selling this book",
    tags: [Tag.KNOWLEDGE],
    effect: {
      description: '+15 Knowledge',
      pointGain: {
        [Tag.KNOWLEDGE]: 15,
      },
    },
  },
  {
    id: 'item-3',
    imageSrc: '/icons/book-solid.svg',
    name: 'Brain Time',
    description: 'Time for brain',
    price: 12,
    tags: [Tag.KNOWLEDGE],
    effect: {
      description: '+15 Knowledge',
      pointGain: {
        [Tag.KNOWLEDGE]: 15,
      },
    },
  },
  {
    id: 'item-4',
    imageSrc: '/icons/book-solid.svg',
    name: 'Stocks for Dummies vol. 1',
    price: 15,
    description: 'Buy high sell low',
    tags: [Tag.FITNESS],
    effect: {
      description: '+15 Knowledge',
      pointGain: {
        [Tag.KNOWLEDGE]: 15,
      },
    },
  },
  {
    id: 'item-5',
    imageSrc: '/icons/book-solid.svg',
    name: 'Tai Lopez Guide to Lamborghinis',
    price: 20,
    description: 'Open an interest free Lamborghini account',
    tags: [Tag.FITNESS],
    effect: {
      description: '+15 Knowledge',
      pointGain: {
        [Tag.KNOWLEDGE]: 15,
      },
    },
  },
  {
    id: 'item-6',
    imageSrc: '/icons/book-solid.svg',
    name: 'Muscle time',
    description: 'Time for muscle',
    price: 12,
    tags: [Tag.FITNESS],
    effect: {
      description: '+15 Fitness',
      pointGain: {
        [Tag.FITNESS]: 15,
      },
    },
  },
  {
    id: 'item-7',
    imageSrc: '/icons/book-solid.svg',
    name: 'How to Exercise',
    description: "This is not a guide. I actually don't know and I'm asking for help",
    price: 12,
    tags: [Tag.FITNESS],
    effect: {
      description: '+15 Fitness',
      pointGain: {
        [Tag.FITNESS]: 15,
      },
    },
  },
  {
    id: 'item-8',
    imageSrc: '/icons/book-solid.svg',
    name: 'Do Drugs',
    description: 'Yes. Drugssss.',
    price: 12,
    tags: [Tag.FITNESS],
    effect: {
      description: '+15 Health',
      pointGain: {
        [Tag.FITNESS]: 15,
      },
    },
  },
]
