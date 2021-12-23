## Instructions for running the rover app

- yarn client
- yarn server
- click the button `Request Instructions` on the client to make the call to the backend for instructions.
- on the server terminal, answer the questions and press enter to submit the answer to each question.
  - i.e. `What is the plateau size (width)? `: 5
  - `What is the plateau size (height)? `: 5
  - `What is the rover's starting x position? `: 1
  - `What is the rover's starting y position? `: 2
  - `What is the rover's cardinal direction? `: N
  - `Enter a string of letters for the rover's movement instructions `: RMLMMLM
- Watch the rover execute the inputted commands.
- The final position will print on the screen once the rover has finished its instructions.
- For client testing run `yarn test:client`
- For server testing run `yarn test:server`
- Click `Request Instructions` to repeat program.
