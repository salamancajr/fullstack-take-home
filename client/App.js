import React, { useEffect, useState } from 'react'
import WallEImg from './images/wall-e.png'
import { Plateau } from './components'
import axiosClient from './axiosClient'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

function App() {
  const [data, updateData] = useState({
    plateauSize: { width: 0, height: 0 },
    roverPosition: { x: 0, y: 0, direction: 'N' },
    roverMovementInstruction: '',
  })

  const [isLoading, updateIsLoading] = useState(true)

  useEffect(() => {
    axiosClient
      .get('/instructions')
      .then(({ data }) => {
        updateData(data)
        updateIsLoading(false)
      })
      .catch(console.log)
  }, [])

  return (
    <Container className="App">
      <img src={WallEImg} height="200" alt="wall-e robot" />
      <h1>MARS ROVER</h1>
      {!isLoading ? (
        <Plateau {...data} />
      ) : (
        <div>Waiting for instructions from NASA...</div>
      )}
    </Container>
  )
}

export default App
