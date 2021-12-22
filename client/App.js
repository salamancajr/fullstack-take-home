import React, { useState } from 'react'
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
  const [data, updateData] = useState()

  const [isLoading, updateIsLoading] = useState(false)
  const [isError, updateIsError] = useState(false)
  const requestInstructions = () => {
    updateIsLoading(true)
    updateIsError(false)
    axiosClient
      .get('/instructions')
      .then(({ data }) => {
        updateData(data)
        updateIsLoading(false)
      })
      .catch(e => {
        console.log({ e })
        updateData(false)
        updateIsLoading(false)
        updateIsError(true)
      })
  }

  return (
    <Container className="App">
      <img src={WallEImg} height="200" alt="wall-e robot" />
      <h1>MARS ROVER</h1>
      <button style={{ marginBottom: 15 }} onClick={requestInstructions}>
        Request Instructions
      </button>
      {!isLoading && data && <Plateau {...data} />}
      {isLoading && <div>Waiting for instructions from NASA...</div>}
      {isError && (
        <div data-testid="Error message">
          Could not connect with NASA. Try again.
        </div>
      )}
    </Container>
  )
}

export default App
