
import React from 'react'
import { render } from 'react-dom'
import { Stage, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

import { frame, el } from '../_common/setup'
import { Map } from '../../src'

const view = [window.innerWidth, window.innerHeight]
const appOpts = {
  backgroundColor: 0x404040,
  resolution: window.devicePixelRatio
}
const frameSize = [16, 16]
const data = [
  '0010'.split('').map(s => parseInt(s, 10)),
  '0100'.split('').map(s => parseInt(s, 10)),
  '0011'.split('').map(s => parseInt(s, 10)),
  '0000'.split('').map(s => parseInt(s, 10)),
]
const dimensions = [data[0].length, data.length]

const renderFunc = (tile, x, y) => {
  if (!tile) {
    return null
  }

  return (
    <Sprite
      key={`[${x}:${y}]`}
      x={x * frameSize[0]}
      y={y * frameSize[1]}
      scale={1}
      texture={frame}
    />
  )
}

const App = () => (
  <Stage width={view[0]} height={view[1]} options={appOpts}>
    <Map data={data} dims={dimensions}>
      {renderFunc}
    </Map>
  </Stage>
)

render(<App />, el)
