const bodyParser = require('body-parser')
const express = require('express')
const question = require('./readLineUtil')

const app = express()
const port = 8081

// Middleware
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  next()
})

app.get('/api/instructions', async (req, res) => {
  const width = await question('What is the plateau size (width)? ')
  const height = await question('What is the plateau size (height)? ')
  const x = await question("What is the rover's starting x position? ")
  const y = await question("What is the rover's starting y position? ")
  const direction = await question("What is the rover's cardinal direction? ")
  const roverMovementInstruction = await question(
    "Enter a string of letters for the rover's movement instructions "
  )

  res.json({
    plateauSize: { width: Number(width), height: Number(height) },
    roverPosition: {
      x: Number(x),
      y: Number(y),
      direction: direction.toUpperCase(),
    },
    roverMovementInstruction: roverMovementInstruction.toUpperCase(),
  })
})

const server = app.listen({ port }, () => {
  console.log(`Course server running at http://localhost:${port}`)
})

module.exports = server
