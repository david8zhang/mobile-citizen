import Phaser from 'phaser'

import { Home } from './scenes/Home'
import { Preload } from './scenes/Preload'
import { Constants } from './utils/Constants'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: Constants.WINDOW_WIDTH,
  height: Constants.WINDOW_HEIGHT,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preload, Home],
}

export default new Phaser.Game(config)