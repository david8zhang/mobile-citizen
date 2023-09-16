import { EarningPotential } from '~/apps/ClikClok/ClikClokConstants'
import { SongConfig } from '~/apps/ClikClok/screens/SelectSound'

export const SOUNDS_LIST: SongConfig[] = [
  {
    name: 'Funny Dance',
    hashtags: '#funny #dance',
    difficulty: 3,
    earningPotential: EarningPotential.LOW,
    energyCost: 15,
    bpm: 100,
    duration: 5000,
  },
  {
    name: 'Hard Dance',
    hashtags: '#hard #dance',
    difficulty: 5,
    earningPotential: EarningPotential.HIGH,
    energyCost: 40,
    bpm: 150,
    duration: 5000,
  },
  {
    name: 'Meme Dance',
    hashtags: '#meme #dance',
    difficulty: 2,
    earningPotential: EarningPotential.MEDIUM,
    energyCost: 25,
    bpm: 120,
    duration: 5000,
  },
]
