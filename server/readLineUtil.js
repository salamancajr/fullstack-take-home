const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

module.exports = query => {
  return new Promise(resolve => {
    readline.question(query, resolve)
  })
}
