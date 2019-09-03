
import React from 'react'
import { render } from 'react-dom'
import { Stage } from '@inlet/react-pixi/dist/react-pixi.module'

import { frame, el } from './setup'
import { Map } from '../src'

const view = [ window.innerWidth, window.innerHeight ]
const appOpts = {
  backgroundColor: 0x404040
}

const App = () => (
  <Stage width={view[0]} height={view[1]} options={appOpts}>
    <Map frame={frame} />
  </Stage>
)

render(<App />, el)
