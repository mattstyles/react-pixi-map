
import { Texture, settings, SCALE_MODES } from 'pixi.js'

import skeleton from './skeleton.png'

settings.SCALE_MODE = SCALE_MODES.NEAREST

const style = document.createElement('style')
style.innerHTML = `
  body {
    margin: 0;
  }
  canvas {
    display: block;
  }
`
document.body.appendChild(style)

export const el = document.createElement('div')
document.body.appendChild(el)

export const frame = Texture.from(skeleton)
