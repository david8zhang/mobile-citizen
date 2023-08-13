import { Home } from '~/scenes/Home'
import { Arrow } from './Arrow'
import { ClikClokConstants } from '../ClikClokConstants'
import { SongConfig } from '../screens/SelectSound'
import { RecordVideo } from '../screens/RecordVideo'

export class ArrowSpawner {
  private scene: Home
  public arrows: Arrow[] = []
  public arrowSpawnEvent!: Phaser.Time.TimerEvent
  public currNoteIndex: number = 0
  public songConfig: SongConfig | null = null
  public totalNumBeats: number = 0
  public numBeats: number = 0
  public sprite!: Phaser.GameObjects.Sprite
  private onCompletedSong: Function
  private lastArrowCheckEvent: Phaser.Time.TimerEvent | null = null
  private parent: RecordVideo
  public isCompleted: boolean = true

  constructor(scene: Home, parent: RecordVideo, onCompletedSong: Function) {
    this.scene = scene
    this.parent = parent
    this.onCompletedSong = onCompletedSong
  }

  setupSong(songConfig: SongConfig) {
    this.songConfig = songConfig
    this.totalNumBeats = Math.floor((songConfig.bpm * songConfig.duration) / 60)
    const arrowDelay = 60000 / songConfig.bpm
    this.arrowSpawnEvent = this.scene.time.addEvent({
      delay: arrowDelay,
      callback: () => {
        this.handleSpawnEvent()
      },
      repeat: -1,
    })
    this.scene.time.addEvent({
      delay: songConfig.duration - 1000,
      callback: () => {
        this.arrowSpawnEvent.destroy()
      },
    })

    this.lastArrowCheckEvent = this.scene.time.addEvent({
      repeat: -1,
      delay: 1000,
      callback: () => {
        const activeArrow = this.arrows.find((a) => a.sprite.active)
        if (activeArrow === undefined) {
          this.scene.time.delayedCall(3000, () => {
            this.isCompleted = true
            this.onCompletedSong()
          })
          if (this.lastArrowCheckEvent) {
            this.lastArrowCheckEvent.destroy()
            this.lastArrowCheckEvent = null
          }
        }
      },
    })
  }

  handleSpawnEvent() {
    if (this.isCompleted) {
      this.isCompleted = false
    }
    const isDoubleNote = Phaser.Math.Between(1, 100) <= ClikClokConstants.DOUBLE_NOTE_CHANCE
    if (isDoubleNote) {
      this.spawnDoubleArrow()
      this.parent.addNotes(2)
    } else {
      this.spawnArrow()
      this.parent.addNotes(1)
    }
  }

  spawnDoubleArrow() {
    if (this.numBeats < this.totalNumBeats) {
      const randDirections = ClikClokConstants.getRandomDoubleDirection()
      randDirections.forEach((dir) => {
        const arrow = new Arrow(this.scene, {
          direction: dir,
          position: ClikClokConstants.ARROW_SPAWN_POSITIONS[dir],
        })
        arrow.setVelocity(0, -100)
        this.arrows.push(arrow)
      })
      this.numBeats++
    }
  }

  spawnArrow() {
    if (this.numBeats < this.totalNumBeats) {
      const randDirection = ClikClokConstants.getRandomDirection()
      const arrow = new Arrow(this.scene, {
        direction: randDirection,
        position: ClikClokConstants.ARROW_SPAWN_POSITIONS[randDirection],
      })
      arrow.setVelocity(0, -100)
      this.numBeats++
      this.arrows.push(arrow)
    }
  }

  getArrows() {
    return this.arrows
  }
}
