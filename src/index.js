
import React from 'react'
import { Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

const iterate2d = (fn, dims, data) => {
  // @TODO avoid reallocation by creating only on initial render
  const elems = []
  const [w, h] = dims

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tile = data[y][x]
      if (typeof tile !== 'undefined') {
        elems.push(fn(tile, x, y))
      }
    }
  }

  return elems
}

export const Map = ({
  data,
  dims,
  children,
  frame
}) => {
  if (!data || !dims) {
    return null
  }

  const items = iterate2d(children, dims, data)

  return (
    <Container>
      {items}
    </Container>
  )
}
Map.defaultProps = {
  data: null,
  dims: null,
  children: () => null
}
