import App from './App'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'regenerator-runtime/runtime.js'

const server = setupServer(
  rest.get('http://localhost:8081/api/instructions', (req, res, ctx) => {
    return res(
      ctx.json({
        plateauSize: { width: 5, height: 5 },
        roverPosition: {
          x: 1,
          y: 2,
          direction: 'N',
        },
        roverMovementInstruction: 'MMRM',
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const marsRoverHeader = getByText(/MARS ROVER/i)
  expect(marsRoverHeader).toBeInTheDocument()
})

test('renders correct number of grid elements', async () => {
  const { findAllByTestId } = render(<App />)

  const button = await screen.findByRole('button')
  expect(button).toHaveTextContent('Request Instructions')

  fireEvent.click(button)

  await waitFor(async () => {
    const gridList = await findAllByTestId('grid-element')
    expect(gridList.length).toBe(25)
  })
})

test('handles server error', async () => {
  server.use(
    rest.get('http://localhost:8081/api/instructions', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )
  render(<App />)
  const button = await screen.findByRole('button')
  fireEvent.click(button)

  await waitFor(async () => {
    expect(screen.getByTestId('Error message')).toHaveTextContent(
      'Could not connect with NASA. Try again.'
    )
  })
})
