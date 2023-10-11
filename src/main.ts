import Phaser from 'phaser'

import { Home } from './scenes/Home'
import { Preload } from './scenes/Preload'
import { Constants } from './utils/Constants'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'
import { GameOver } from './scenes/GameOver'
import { GameUI } from './scenes/GameUI'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: Constants.WINDOW_WIDTH,
  height: Constants.WINDOW_HEIGHT,
  parent: 'phaser',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: UIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
  scene: [Preload, Home, GameOver, GameUI],
}

export default new Phaser.Game(config)
