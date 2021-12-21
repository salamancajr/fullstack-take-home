import React from 'react'
import styled from 'styled-components'
import WallEImg from '../images/wall-e.png'

const Container = styled.div`
  height: ${({ gridElementSize }) => gridElementSize + 'vw'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  background-color: orange;
`

export const GridElement = ({ gridElementSize, x, y, roverPosition }) => {
  const isCurrentPosition = x === roverPosition.x && y === roverPosition.y
  return (
    <Container {...{ gridElementSize }}>
      {isCurrentPosition && <img src={WallEImg} height={gridElementSize * 5} />}
    </Container>
  )
}
