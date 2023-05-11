import { type CommandLine } from './types'
const readline = require('readline')

const handleKey = require('./handleKey')
const { showMenu } = require('./calcMenu')

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

module.exports = async function menu (items: CommandLine[]) {
  process.stdout.write(showMenu(items))
  process.stdout.write('\n')
  process.stdout.write('\n')
  // readline.cursorTo(process.stdout, 0, 0)
  return await new Promise(function (resolve, reject) {
    const handleKeyPress = function (chunk, key) {
      if (chunk === 'q' || (key && key.ctrl && key.name === 'c')) {
        process.stdin.removeListener('keypress', handleKeyPress)
        process.stdin.setRawMode(false)
        process.exit()
      }
      let command = ''
      if (chunk) {
        command = handleKey(chunk, items)
      }
      if (command !== '') {
        readline.clearScreenDown(process.stdout)
        resolve(command)
      } else {
        process.stdout.write(showMenu(items))
      }
    }
    process.stdin.addListener('keypress', handleKeyPress)
  })
}
