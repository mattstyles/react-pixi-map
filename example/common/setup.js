
import {
  Rectangle, Texture,
  settings, SCALE_MODES
} from 'pixi.js'

import skeleton from '../assets/skeleton.png'
import charbImage from '../assets/charb.png'

import Stats from 'stats.js'

export const stats = new Stats()
stats.showPanel(0)
stats.dom.style.right = '0px'
stats.dom.style.left = 'auto'
document.body.appendChild(stats.dom)

settings.SCALE_MODE = SCALE_MODES.NEAREST

const style = document.createElement('style')
style.innerHTML = `
  body {
    margin: 0;
    min-height: 100vh;
    min-width: 100vw;
  }
  canvas {
    display: block;
  }
  .full {
    position: absolute;
    top: 0;
    left: 0;
  }
`
document.body.appendChild(style)

export const createRoot = (type = 'div') => {
  const el = document.createElement(type)
  el.classList.add('full')
  document.body.appendChild(el)
  return el
}

export const createSheet = (asset, uv, baseSize) => {
  const base = Texture.from(asset)
  const [u1, v1] = uv
  const [width, height] = baseSize

  const frames = []

  for (let v = 0; v < v1; v++) {
    for (let u = 0; u < u1; u++) {
      frames.push(new Texture(
        base,
        new Rectangle(
          u * width,
          v * height,
          width,
          height
        )
      ))
    }
  }

  return frames.length > 1 ? frames : frames[0]
}

export const game = createRoot()
export const el = createRoot()

export const skelly = createSheet(skeleton, [1, 1], [16, 16])
export const charb = createSheet(charbImage, [2, 2], [8, 8])
