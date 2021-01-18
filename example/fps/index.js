
import React, { useState } from 'react'
import { render } from 'react-dom'
import { Stage, Sprite, useTick, Text } from '@inlet/react-pixi/dist/react-pixi.module'
// import { Application } from 'pixi.js'
import { random } from 'lodash'
// import uuid from 'uuid/v4'

import { skelly, game, el, stats } from '../common/setup'
// import { Map } from '../../src'

const dpr = window.devicePixelRatio
const gravity = 0.5
const bounce = 0.75

const viewport = [window.innerWidth / dpr, window.innerHeight / dpr]
const appOpts = {
  backgroundColor: 0x404040,
  resolution: dpr
  // width: viewport[0],
  // height: viewport[1],
  // view: game
}

// Very slow. Lots of setState
// const Bunny = () => {
//   const [x, setX] = useState(0)
//   const [y, setY] = useState(0)
//   const [[velX, velY], setVelocity] = useState([random(0.6, 1.8), random(1, 1.8)])
//
//   useTick(delta => {
//     setX(x + velX)
//     setY(y + velY)
//
//     setVelocity([velX, velY + gravity])
//
//     if (x > viewport[0] || x < 0) {
//       setVelocity([-velX, velY])
//     }
//
//     if (y > viewport[1]) {
//       setVelocity([velX, -velY * bounce])
//
//       if (velY < 10) {
//         setVelocity([velX, random(-10, -24)])
//       }
//     }
//
//     if (y < 0) {
//       setVelocity([velX, -velY])
//     }
//
//     if (x > viewport[0]) {
//       setX(viewport[0])
//     }
//
//     if (x < 0) {
//       setX(0)
//     }
//
//     if (y > viewport[1]) {
//       setY(viewport[1])
//     }
//
//     if (y < 0) {
//       setY(0)
//     }
//   })
//
//   return (
//     <Sprite
//       texture={skelly}
//       x={x}
//       y={y}
//       scale={2}
//       anchor={0.5}
//     />
//   )
// }

// Does not work, does not trigger an update
// const Bunny = ({ id }) => {
//   const {
//     x, y
//   } = bunnies[id]
//   return (
//     <Sprite
//       texture={skelly}
//       x={x}
//       y={y}
//       scale={2}
//       anchor={0.5}
//     />
//   )
// }

const createBunny = () => ({
  x: random(0, 20),
  y: random(0, 20),
  velX: random(0.6, 1.8),
  velY: random(1, 1.8)
})

const bunnies = []

const addBunnies = (num) => {
  let it = 0
  while (++it <= num) {
    bunnies.push(createBunny())
  }
}

const update = (bunny) => {
  bunny.x += bunny.velX
  bunny.y += bunny.velY

  bunny.velY += gravity

  if (bunny.x < 0) {
    bunny.x = 0
    bunny.velX = -bunny.velX
  }

  if (bunny.x > viewport[0]) {
    bunny.x = viewport[0]
    bunny.velX = -bunny.velX
  }

  if (bunny.y < 0) {
    bunny.y = 0
    bunny.velY = -bunny.velY
  }

  if (bunny.y > viewport[1]) {
    bunny.y = viewport[1]
    bunny.velY = -bunny.velX * bounce

    if (bunny.velY < 10) {
      bunny.velY = random(-10, -24)
    }
  }
}

window.add = addBunnies
window.bunnies = bunnies

const frame = t => {
  window.requestAnimationFrame(frame)

  for (const bunny of bunnies) {
    update(bunny)
  }

  stats.begin()
  render(
    <Stage width={viewport[0]} height={viewport[1]} options={appOpts}>
      {
        bunnies.map((b, i) => (
          <Sprite
            key={`${i}bunny`}
            texture={skelly}
            x={b.x}
            y={b.y}
            scale={2}
            anchor={0.5}
          />
        ))
      }
      <Text text={`${bunnies.length} entities`} style={{ fill: 0xffff00, fontSize: 10 }} x={5} y={5} />
    </Stage>,
    game
  )
  // render(
  //   <div>
  //     <h3>{bunnies.length} bunnies</h3>
  //     <button onClick={() => addBunnies(100)}>Click Me</button>
  //   </div>,
  //   el
  // )
  stats.end()
}

addBunnies(2)
frame()
