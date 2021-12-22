const request = require('supertest')
const app = require('./server')
import 'regenerator-runtime/runtime.js'

jest.mock('./readLineUtil', () =>
  jest.fn().mockImplementation(ques => {
    return {
      'What is the plateau size (width)? ': '5',
      'What is the plateau size (height)? ': '5',
      "What is the rover's starting x position? ": '1',
      "What is the rover's starting y position? ": '3',
      "What is the rover's cardinal direction? ": 'N',
      "Enter a string of letters for the rover's movement instructions ":
        'LMMRM',
    }[ques]
  })
)

describe('[GET] /api/instructions', () => {
  it('should return instructions object', async () => {
    const res = await request(app).get('/api/instructions')
    expect(res.statusCode).toEqual(200)

    expect(res.body).toMatchObject({
      plateauSize: { width: 5, height: 5 },
      roverPosition: {
        x: 1,
        y: 3,
        direction: 'N',
      },
      roverMovementInstruction: 'LMMRM',
    })
    return
  })
})

afterAll(() => app.close())
