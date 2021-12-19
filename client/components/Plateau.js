import React from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import styled from 'styled-components'
import { GridElement } from './GridElement.js'

const PlateauArea = styled.div`
  width: 50vw;
  display: flex;
`

const HorizontalContainer = styled.div``

export class Plateau extends React.Component {
  state = {
    direction: this.props.roverPosition.direction,
    roverX: this.props.roverPosition.x,
    roverY: this.props.roverPosition.y,
    instructionIndex: 0,
    isDone: false,
  }

  componentDidMount() {
    this.handleInstructionChange()
  }

  componentDidUpdate(prevProps, prevState) {
    const { instructionIndex } = this.state
    if (prevState.instructionIndex !== instructionIndex) {
      this.handleInstructionChange()
    }
  }

  handleInstructionChange = () => {
    setTimeout(() => {
      const currentLetter =
        this.props.roverMovementInstruction[this.state.instructionIndex]
      switch (currentLetter) {
        case 'L':
        case 'R':
          this.updateDirection(currentLetter)
          break
        case 'M':
          this.updateLocation()
      }
    }, 1000)
  }

  updateLocation() {
    const { direction, roverX, roverY, instructionIndex } = this.state

    let newX = roverX,
      newY = roverY

    switch (direction) {
      case 'N':
        newY = roverY + 1
        break
      case 'W':
        newX = roverX - 1
        break
      case 'S':
        newY = roverY - 1
        break
      case 'E':
        newX = roverX + 1
    }

    this.setState({
      ...this.state,
      roverX: newX,
      roverY: newY,
      instructionIndex: instructionIndex + 1,
      isDone:
        instructionIndex === this.props.roverMovementInstruction.length - 1,
    })
  }

  updateDirection = letter => {
    const { direction, instructionIndex } = this.state
    let newDirection

    if (letter === 'L') {
      switch (direction) {
        case 'N':
          newDirection = 'W'
          break
        case 'W':
          newDirection = 'S'
          break
        case 'S':
          newDirection = 'E'
          break
        case 'E':
          newDirection = 'N'
      }
    } else {
      switch (direction) {
        case 'N':
          newDirection = 'E'
          break
        case 'W':
          newDirection = 'N'
          break
        case 'S':
          newDirection = 'W'
          break
        case 'E':
          newDirection = 'S'
      }
    }

    this.setState({
      ...this.state,
      direction: newDirection,
      instructionIndex: instructionIndex + 1,
      isDone:
        instructionIndex === this.props.roverMovementInstruction.length - 1,
    })
  }

  render() {
    const {
      plateauSize: { width, height },
    } = this.props
    const { roverX, roverY, isDone } = this.state
    const gridElementSize = 50 / height

    console.log({ isDone })

    return (
      <Fragment>
        <PlateauArea>
          {new Array(height).fill().map((_, x) => (
            <HorizontalContainer
              key={x}
              style={{ width: gridElementSize + 'vw' }}
            >
              {new Array(width).fill().map((_, y) => (
                <GridElement
                  key={y}
                  {...{ gridElementSize, y: width - (y + 1), x }}
                  roverPosition={{ x: roverX, y: roverY }}
                />
              ))}
            </HorizontalContainer>
          ))}
        </PlateauArea>
        {isDone && (
          <h2>{`Final coordinates of the rover are X: ${roverX} and Y: ${roverY}`}</h2>
        )}
      </Fragment>
    )
  }
}
