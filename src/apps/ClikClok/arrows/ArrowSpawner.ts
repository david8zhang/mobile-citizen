import { Home } from '~/scenes/Home'
import { Arrow } from './Arrow'
import { ClikClokConstants } from '../ClikClokConstants'
import { SongConfig } from '../screens/SelectSound'

export class ArrowSpawner {
  private scene: Home
  public arrows: Arrow[] = []
  public arrowSpawnEvent!: Phaser.Time.TimerEvent
  public currNoteIndex: number = 0
  public songConfig: SongConfig | null = null
  public totalNumBeats: number = 0
  public numBeats: number = 0
  public sprite!: Phaser.GameObjects.Sprite

  constructor(scene: Home) {
    this.scene = scene
    this.setupCheckForLastArrow()

    this.scene.input.keyboard.on('keydown', (event) => {
      if (event.code === 'Space') {
        this.scene.scene.restart()
      }
    })
  }

  setupCheckForLastArrow() {
    this.scene.time.addEvent({
      repeat: -1,
      delay: 1000,
      callback: () => {
        const activeArrow = this.arrows.find((a) => a.sprite.active)
        if (activeArrow === undefined) {
          // this.scene.time.delayedCall(3000, () => {
          //   this.scene.score.didFinish = true
          //   this.scene.scene.start('gameover', {
          //     rank: this.scene.score.getRank(),
          //     didFinish: this.scene.score.didFinish,
          //   })
          // })
        }
      },
    })
  }

  setSongConfig(songConfig: SongConfig) {
    this.songConfig = songConfig
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
  }

  handleSpawnEvent() {
    const isDoubleNote = Phaser.Math.Between(1, 100) <= ClikClokConstants.DOUBLE_NOTE_CHANCE
    if (isDoubleNote) {
      this.spawnDoubleArrow()
    } else {
      this.spawnArrow()
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
      // this.scene.score.totalNotes += 2
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
      // this.scene.score.totalNotes += 1
    }
  }

  getArrows() {
    return this.arrows
  }
}
