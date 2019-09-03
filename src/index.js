
import React from 'react'
import { Container, Sprite } from '@inlet/react-pixi/dist/react-pixi.module'

export const Map = ({
  data,
  size,
  frame
}) => {
  return (
    <Container>
      <Sprite x={32} y={32} scale={8} texture={frame} />
    </Container>
  )
}
